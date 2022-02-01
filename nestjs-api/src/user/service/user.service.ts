import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUser } from '../models/class/CreateUser.class';
import { LoginUser } from '../models/class/LoginUser.class';
import { User } from '../models/user.entity';
import { UserI } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  create(createdUserDto: CreateUser): Observable<UserI> {
    return this.mailExists(createdUserDto.email, createdUserDto.username).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(createdUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              createdUserDto.password = passwordHash;
              return from(this.userRepository.save(createdUserDto)).pipe(
                map((savedUser: UserI) => {
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException(
            'Email or Username already in use',
            HttpStatus.CONFLICT,
          );
        }
      }),
    );
  }

  update(id: number, createdUserDto: CreateUser): Observable<any> {
    console.log(createdUserDto, id);
    return from(this.userRepository.update(id, createdUserDto)).pipe(
      map((savedUser: any) => {
        return savedUser;
      }),
    );
  }

  login(loginUserDto: LoginUser): Observable<any> {
    return this.findUserByEmail(loginUserDto.username).pipe(
      switchMap((user: UserI) => {
        if (user) {
          return this.validatePassword(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserI) => {
                    return this.authService.generateJwt(user).pipe(
                      map((jwt: any) => {
                        return {
                          jwt,
                          user,
                        };
                      }),
                    );
                  }),
                );
              } else {
                throw new HttpException(
                  'Login was not Successfulll',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
      }),
    );
  }

  findAll(): Observable<UserI[]> {
    return from(this.userRepository.find());
  }

  findOne(id: number): Observable<UserI> {
    return from(this.userRepository.findOne({ id }));
  }

  private findUserByEmail(email: string): Observable<UserI> {
    return from(
      this.userRepository.findOne({
        where: [{ email }, { username: email }],
        select: ['id', 'email', 'username', 'password'],
      }),
    );
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  private mailExists(email: string, username: string): Observable<boolean> {
    return from(
      this.userRepository.findOne({ where: [{ email }, { username }] }),
    ).pipe(
      map((user: UserI) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
}
