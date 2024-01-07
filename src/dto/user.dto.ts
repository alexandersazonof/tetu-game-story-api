import { Permission } from '../models/permissions.model';

export interface UserDto {
  username: string;
  permissions: Permission[];
}