import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from 'src/database/src/entities';
import { IHouse } from 'src/database/src/interfaces/houses';
import { Repository } from 'typeorm';
import { ICreateHouse } from './interfaces/input';
import { IDeleteHouseResponse } from './interfaces/output/delete-house-response.interface';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  public async getHouses(): Promise<IHouse[]> {
    return await this.houseRepository.find();
  }

  public async getHouseById(houseId: string): Promise<IHouse> {
    const houseFound = await this.houseRepository.findOne({
      where: { id: houseId },
    });
    if (!houseFound)
      throw new NotFoundException(
        "Couldn't find house with the id: " + houseId,
      );
    return houseFound;
  }

  public async createHouse(createHouseData: ICreateHouse): Promise<IHouse> {
    const newHouseInstance = this.houseRepository.create({
      ...createHouseData,
    });
    return await this.houseRepository.save(newHouseInstance);
  }

  public async deleteHouse(houseId: string): Promise<IDeleteHouseResponse> {
    const houseFound = await this.houseRepository.findOne({
      where: { id: houseId },
    });
    if (!houseFound)
      throw new NotFoundException(
        "Couldn't find house with the id: " + houseId,
      );
    await this.houseRepository.softDelete(houseId);
    return { wasDeleted: true };
  }
}
