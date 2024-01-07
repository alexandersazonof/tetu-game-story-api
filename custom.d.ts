import { UserDto } from './src/dto/user.dto';

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}