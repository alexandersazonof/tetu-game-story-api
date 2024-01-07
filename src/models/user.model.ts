import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Permission } from './permissions.model';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({type: 'text'})
  username: string | undefined;

  @Column({type: 'text'})
  password: string | undefined;

  @Column("simple-array")
  permissions: Permission[] = [];

  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): Promise<boolean> {
    if (this.password) {
      return await bcrypt.compare(unencryptedPassword, this.password);
    }
    return false;
  }

  constructor() {
    super();
    this.permissions = [Permission.READ_ADMIN];
  }
}