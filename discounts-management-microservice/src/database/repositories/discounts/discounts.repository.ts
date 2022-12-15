import { Discount } from 'src/database/entities/discounts';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {}
