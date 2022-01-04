import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/models/role.enum';

export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
