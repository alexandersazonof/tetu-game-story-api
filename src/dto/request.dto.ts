import { Request } from 'express';
import { UserDto } from './user.dto';

export type RequestWithUser = Request & { user: UserDto | undefined };
