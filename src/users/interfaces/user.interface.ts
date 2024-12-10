import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly age: number;
}
