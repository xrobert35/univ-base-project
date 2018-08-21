import { Role } from '@shared/enum/role.enum';

export class User {
  _id?: any;
  name: string;
  email: string;
  roles: Array<Role>;
  createdOn?: Date;
  updatedOn?: Date;
}
