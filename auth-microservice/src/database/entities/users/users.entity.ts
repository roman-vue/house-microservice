import { Timestamps } from '../inheritance';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('users')
export class User extends Timestamps {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({length: 100})
  name: string;

  @Column({length: 100})
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column({ length: 32 })
  phoneNumber: string;

  @Column({ length: 256 })
  password: string;

}
