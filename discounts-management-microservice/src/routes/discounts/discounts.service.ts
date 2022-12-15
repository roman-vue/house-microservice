import { Injectable, NotFoundException } from '@nestjs/common';

import { IRegisterDiscount, IValidateDiscount } from './interfaces/input';
import {
  IDeleteDiscountRegisterResponse,
  IValidateDiscountResponse,
} from './interfaces/output';
import { v4 as uuidv4 } from 'uuid';
import { IDiscount } from 'src/database/interfaces/discounts';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  public async getAllDiscounts(): Promise<IDiscount[]> {
    return await this.discountRepository.find();
  }

  public async getUserDiscounts(userId: string): Promise<IDiscount[]> {
    return await this.discountRepository.find({ where: { userId } });
  }

  public async getDiscountByCode(discountCode: string): Promise<IDiscount> {
    const discountFound = await this.discountRepository.findOne({
      where: { code: discountCode },
    });
    if (!discountFound)
      throw new NotFoundException(
        "Couldn't find discount with the code: " + discountCode,
      );
    return discountFound;
  }

  public async registerDiscount(
    discountData: IRegisterDiscount,
  ): Promise<IDiscount> {
    const discountCode = this.generateDiscountCode();
    const newDiscountInstance = this.discountRepository.create({
      ...discountData,
      code: discountCode,
    });
    return await this.discountRepository.save(newDiscountInstance);
  }

  public async validateDiscount(
    discountData: IValidateDiscount,
  ): Promise<IValidateDiscountResponse> {
    const { discountCode, houseId, userId } = discountData;
    const discountFound = await this.discountRepository.findOne({
      where: { houseId, userId, code: discountCode },
    });
    if (!discountFound) return { isValidDiscount: false };
    return { isValidDiscount: true };
  }

  public async deleteDiscountRegister(
    discountRegisterId: string,
  ): Promise<IDeleteDiscountRegisterResponse> {
    const discountFound = await this.discountRepository.findOne({
      where: { id: discountRegisterId },
    });
    if (!discountFound)
      throw new NotFoundException(
        'No discount register found with the id: ' + discountFound,
      );
    await this.discountRepository.softDelete(discountRegisterId);
    return { wasDeleted: true };
  }

  private generateDiscountCode(): string {
    const uuidCode: string = uuidv4();
    const uuidCodeUpperCased = uuidCode.toUpperCase();
    const discountCode = uuidCodeUpperCased.split('-')[0];
    return discountCode;
  }
}
