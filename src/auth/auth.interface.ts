import { UserInterface } from '@chat/resources/user/user.interface';
import { Request } from 'express';
export interface AuthRequest extends Request {
  user: UserInterface;
}
