import { Timestamps } from '../inheritance';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('discounts')
export class Discount extends Timestamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  code: string;

  @Column({length: 150})
  houseId: string;

  @Column({length: 150})
  userId: string;

}
