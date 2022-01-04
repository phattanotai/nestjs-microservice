import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../user/models/role.enum';
import { CreateUser } from '../../user/models/class/CreateUser.class';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user }: { user: CreateUser } = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
