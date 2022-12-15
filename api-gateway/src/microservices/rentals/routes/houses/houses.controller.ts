import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom, Observable } from 'rxjs';
import { ProxyService } from 'src/configuration/proxy';
import { AccessGuard } from 'src/guards';
import { IUser } from 'src/microservices/auth/routes/users/interfaces/output';
import { MessageQueues, RoutesBasePaths } from 'src/utils/enums';
import { UsersMessages } from 'src/utils/enums/messages/auth';
import { HousesMessages } from 'src/utils/enums/messages/rentals';
import { CreateHouseDTO } from './dto/input';
import { CreateHouseResponseDTO, DeleteHouseResponseDTO, GetAllHousesResponseDTO, GetHouseByIdResponseDTO } from './dto/output';
import { IDeleteHouseResponse, IHouse, IHouseResponse } from './interfaces/output';

@Controller(RoutesBasePaths.houses)
@UseGuards(AccessGuard)
@ApiBearerAuth()
@ApiTags('Rentals Microservice - Houses')
export class HousesController {

    constructor(private readonly clientProxy: ProxyService){}

    private _clientProxyRentals = this.clientProxy.createClientProxy(MessageQueues.rentals);
    private _clientProxyAuth = this.clientProxy.createClientProxy(MessageQueues.auth);

    public async onApplicationBootstrap() { 
        await this._clientProxyRentals.connect();
        await this._clientProxyAuth.connect();
    }

    @Get('/')
    @ApiOperation({summary:"Get all houses"})
    @ApiResponse({type: GetAllHousesResponseDTO, status:200})
    public async getHouses() : Promise<IHouseResponse[]> {
        const houses : IHouse[] = await lastValueFrom(this._clientProxyRentals.send(HousesMessages.GET_HOUSES,''));
        const housesWithReferencesObjects : IHouseResponse[] = [];
        for(const house of houses){
            const userOwner : IUser = await lastValueFrom(this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID, house.userOwnerId));
            delete house.userOwnerId;
            const houseWithReferencesObjects : IHouseResponse = { ...house, userOwner }
            housesWithReferencesObjects.push(houseWithReferencesObjects);
        };
        return housesWithReferencesObjects;
    }

    @Get('/:id')
    @ApiOperation({summary:"Get house by id"})
    @ApiResponse({type: GetHouseByIdResponseDTO, status:200})
    public async getHouseById(@Param('id', ParseUUIDPipe) houseId: string) : Promise<IHouseResponse> {
        const house : IHouse = await lastValueFrom(this._clientProxyRentals.send(HousesMessages.GET_HOUSE_BY_ID,houseId));
        const userOwner : IUser = await lastValueFrom(this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID, house.userOwnerId));
        delete house.userOwnerId;
        return { ...house, userOwner };

    }

    @Post('/')
    @ApiOperation({summary:"Create new house"})
    @ApiResponse({type: CreateHouseResponseDTO, status:201})
    public async createHouse(@Body() createHouseDTO : CreateHouseDTO ) : Promise<IHouseResponse> {
        const { userOwnerId } = createHouseDTO;
        const userOwner : IUser = await lastValueFrom(this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID, userOwnerId));
        const createdHouse : IHouse = await lastValueFrom(this._clientProxyRentals.send(HousesMessages.CREATE_HOUSE,createHouseDTO));
        delete createdHouse.userOwnerId;
        return { userOwner, ...createdHouse };
    }

    @Delete('/:id')
    @ApiOperation({summary:"Delete house"})
    @ApiResponse({type: DeleteHouseResponseDTO, status:200})
    public deleteHouse(@Param('id',ParseUUIDPipe) houseId: string) : Observable<IDeleteHouseResponse> {
        return this._clientProxyRentals.send(HousesMessages.DELETE_HOUSE,houseId);
    }
}
