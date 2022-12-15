import { Discount } from 'src/database/src/entities/discounts';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {

}
