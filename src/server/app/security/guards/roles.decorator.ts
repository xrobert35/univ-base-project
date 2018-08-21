import { ReflectMetadata } from '@nestjs/common';
import { Role } from '@shared/enum/role.enum';

export const Roles = (...roles: Array<Role>) => ReflectMetadata('roles', roles);
