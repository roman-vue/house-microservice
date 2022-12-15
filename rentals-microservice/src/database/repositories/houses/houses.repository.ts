import { EntityRepository, Repository } from 'typeorm';
import { House } from '../../entities';

@EntityRepository(House)
export class HouseRepository extends Repository<House> {

}
