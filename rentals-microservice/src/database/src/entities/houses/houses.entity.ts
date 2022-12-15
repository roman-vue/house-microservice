
import { Timestamps } from '../inheritance';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Reservation } from '../reservations/reservations.entity';

@Entity('houses')
export class House extends Timestamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  name: string;

  @Column({length: 150})
  address: string;

  @Column({length: 150})
  userOwnerId: string;

  @OneToMany(_type=>Reservation, reservations=>reservations.house)
  reservations: Reservation[];

}
