
import { Timestamps } from '../inheritance';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { House } from '../houses';

@Entity('reservations')
export class Reservation extends Timestamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({length: 100})
  userWhoReservatedId: string;

  @ManyToOne(_type=>House, house=>house.reservations)
  house: House;

  @Column({length: 100, nullable:true})
  discountCode:string;

}
