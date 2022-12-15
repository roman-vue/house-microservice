import { ConflictException, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom, Observable } from 'rxjs';
import { ProxyService } from 'src/configuration/proxy';
import { AccessGuard } from 'src/guards';
import { IUser } from 'src/microservices/auth/routes/users/interfaces/output';
import { IValidateDiscountResponse } from 'src/microservices/discounts-management/routes/discounts/interfaces/output';
import { MessageQueues, RoutesBasePaths } from 'src/utils/enums';
import { UsersMessages } from 'src/utils/enums/messages/auth';
import { DiscountMessages } from 'src/utils/enums/messages/discounts-management';
import { ReservationsMessages } from 'src/utils/enums/messages/rentals';
import { CreateReservationDTO } from './dto/input';
import { CreateReservationResponseDTO, GetReservationsResponseDTO } from './dto/output';
import { ICreateReservationResponse, IReservation } from './interfaces/output';


@Controller(RoutesBasePaths.reservations)
@UseGuards(AccessGuard)
@ApiBearerAuth()
@ApiTags('Rentals Microservice - Reservations')
export class ReservationsController {

    constructor(private readonly clientProxy: ProxyService){}

    private _clientProxyRentals = this.clientProxy.createClientProxy(MessageQueues.rentals);
    private _clientProxyAuth = this.clientProxy.createClientProxy(MessageQueues.auth);
    private _clientProxyDiscounts = this.clientProxy.createClientProxy(MessageQueues.discounts);

    public async onApplicationBootstrap() { 
        await this._clientProxyAuth.connect();
        await this._clientProxyRentals.connect();
        await this._clientProxyDiscounts.connect();
    }

    @Get('/')
    @ApiOperation({summary: "Get Reservations"})
    @ApiResponse({type: GetReservationsResponseDTO, status:200})
    public getReservations() : Observable<IReservation[]> {
        return this._clientProxyRentals.send(ReservationsMessages.GET_RESERVATIONS,'');
    }

    @Post('/')
    @ApiOperation({summary: "Create Reservation"})
    @ApiResponse({type: CreateReservationResponseDTO, status:201})
    public async createReservation(@Payload() createReservationDTO : CreateReservationDTO ) : Promise<ICreateReservationResponse> {
        const { userWhoReservatedId, discountCode, houseId } = createReservationDTO;
        const userWhoReservated : IUser = await lastValueFrom(this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID, userWhoReservatedId));
        if(discountCode) {
            const isValidDiscountResponse : IValidateDiscountResponse = await lastValueFrom( this._clientProxyDiscounts.send(DiscountMessages.VALIDATE_DISCOUNT, {discountCode, houseId, userId: userWhoReservatedId}));
            if(!isValidDiscountResponse.isValidDiscount) throw new ConflictException(`The discount code ${discountCode} is not valid for this reservation`);
        }
        const reservationCreated : IReservation = await lastValueFrom(this._clientProxyRentals.send(ReservationsMessages.CREATE_RESERVATION, createReservationDTO));
        delete reservationCreated.userWhoReservatedId;
        return { ...reservationCreated, userWhoReservated };
    }


}
