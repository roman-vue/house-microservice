import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IHouse } from 'src/database/src/interfaces/houses';
import { HousesMessages } from 'src/utils/enums';
import { CreateHouseDTO } from './dto/input';
import { HousesService } from './houses.service';
import { IDeleteHouseResponse } from './interfaces/output/delete-house-response.interface';


@Controller()
export class HousesController {

    constructor( private readonly housesService: HousesService ){}

    @MessagePattern(HousesMessages.GET_HOUSES)
    public getHouses() : Promise<IHouse[]> {
        return this.housesService.getHouses();
    }

    @MessagePattern(HousesMessages.GET_HOUSE_BY_ID)
    public getHouseById(@Payload() houseId: string) : Promise<IHouse> {
        return this.housesService.getHouseById(houseId);
    }

    @MessagePattern(HousesMessages.CREATE_HOUSE)
    public createHouse(@Payload() createHouseDTO : CreateHouseDTO ) : Promise<IHouse> {
        return this.housesService.createHouse(createHouseDTO);
    }

    @MessagePattern(HousesMessages.DELETE_HOUSE)
    public deleteHouse(@Payload() houseId: string) : Promise<IDeleteHouseResponse> {
        return this.housesService.deleteHouse(houseId);
    }

}
