import { IsString } from 'class-validator';
import { Role } from '../role.enum';
import { LoginUser } from './LoginUser.class';

export class CreateUser extends LoginUser {
  id?: number;
  @IsString()
  name: string;
  imagePath?: string;
  role?: Role;
}
