import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom, Observable } from 'rxjs';
import { ProxyService } from 'src/configuration/proxy';
import { AccessGuard } from 'src/guards';
import { IUser } from 'src/microservices/auth/routes/users/interfaces/output';
import { MessageQueues, RoutesBasePaths } from 'src/utils/enums';
import { UsersMessages } from 'src/utils/enums/messages/auth';
import { DiscountMessages } from 'src/utils/enums/messages/discounts-management';
import { HousesMessages } from 'src/utils/enums/messages/rentals';
import { RegisterDiscountDTO, ValidateDiscountDTO } from './dto/input';
import { DeleteDiscountResponseDTO, GetAllDiscountsResponseDTO, GetDiscountByCodeResponseDTO, GetDiscountsByUserResponseDTO, RegisterDiscountResponseDTO, ValidateDiscountResponseDTO } from './dto/output';
import { IDeleteDiscountRegisterResponse, IDiscount, IValidateDiscountResponse } from './interfaces/output';
import { IDiscountResponse } from './interfaces/output/discounts-response.interface';

@Controller(RoutesBasePaths.discounts)
@UseGuards(AccessGuard)
@ApiBearerAuth()
@ApiTags('Discounts Management Microservice - Discounts')
export class DiscountsController {

    constructor(private readonly clientProxy: ProxyService){}

    private _clientProxyDiscounts = this.clientProxy.createClientProxy(MessageQueues.discounts);
    private _clientProxyAuth = this.clientProxy.createClientProxy(MessageQueues.auth);
    private _clientProxyRentals = this.clientProxy.createClientProxy(MessageQueues.rentals);

    public async onApplicationBootstrap() { 
        await this._clientProxyDiscounts.connect();
        await this._clientProxyAuth.connect();
        await this._clientProxyRentals.connect();
    }

    @Get('/')
    @ApiOperation({summary:"Get all registered discounts"})
    @ApiResponse({type: GetAllDiscountsResponseDTO, status :200})
    public async getAllDiscounts() : Promise<IDiscountResponse[]> {
        const discounts : IDiscount[] = await lastValueFrom(this._clientProxyDiscounts.send(DiscountMessages.GET_ALL_DISCOUNTS,''));
        const discountsWithReferencesObjects : IDiscountResponse[] = [];
        for(const discount of discounts){
            const house = await lastValueFrom(this._clientProxyRentals.send(HousesMessages.GET_HOUSE_BY_ID, discount.houseId));
            const user : IUser = await lastValueFrom(this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID, discount.userId));
            delete discount.userId; delete discount.houseId;
            const discountWithReferencesObjects : IDiscountResponse = { user, house, ...discount };
            discountsWithReferencesObjects.push(discountWithReferencesObjects);
        }
        return discountsWithReferencesObjects;
    }

    @Get('/by-user/:userId')
    @ApiOperation({summary: "Get discounts by user"})
    @ApiResponse({type: GetDiscountsByUserResponseDTO, status:200})
    public async getUserDiscounts(@Param('userId', ParseUUIDPipe) userId: string ) : Promise<IDiscountResponse[]> {
        const user : IUser = await lastValueFrom(this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID, userId));
        const discounts : IDiscount[] =  await lastValueFrom(this._clientProxyDiscounts.send(DiscountMessages.GET_USER_DISCOUNTS,userId));
        const discountsWithReferencesObjects : IDiscountResponse[] = [];
        for(const discount of discounts){
            const house = await lastValueFrom(this._clientProxyRentals.send(HousesMessages.GET_HOUSE_BY_ID, discount.houseId));
            delete discount.userId; delete discount.houseId;
            const discountWithReferencesObjects : IDiscountResponse = { user, house, ...discount };
            discountsWithReferencesObjects.push(discountWithReferencesObjects);
        };
        return discountsWithReferencesObjects;
    }

    @Get('by-discount-code/:code')
    @ApiOperation({summary: "Get discount by its code"})
    @ApiResponse({type: GetDiscountByCodeResponseDTO, status: 200})
    public async getDiscountByCode(@Param('code') code: string ) : Promise<IDiscountResponse> {
        const discount = await lastValueFrom(this._clientProxyDiscounts.send(DiscountMessages.GET_DISCOUNT_BY_CODE,code));
        const house = await lastValueFrom(this._clientProxyRentals.send(HousesMessages.GET_HOUSE_BY_ID, discount.houseId));
        const user : IUser = await lastValueFrom(this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID, discount.userId));
        delete discount.userId; delete discount.houseId;
        return { house, user, ...discount }
    }

    @Get('/validate-discount/:discountCode/house/:houseId/user/:userId')
    @ApiOperation({summary: "Endpoint to know if a discount code is valid or not"})
    @ApiResponse({type: ValidateDiscountResponseDTO, status: 200})
    public validateDiscount(@Param() validateDiscountDTO : ValidateDiscountDTO ) : Observable<IValidateDiscountResponse> {
        return this._clientProxyDiscounts.send(DiscountMessages.VALIDATE_DISCOUNT,validateDiscountDTO);
    }

    @Post('/')
    @ApiOperation({summary: "Register new discount (code is generated automatically)"})
    @ApiResponse({type: RegisterDiscountResponseDTO, status:200})
    public registerDiscount(@Body() registerDiscountDTO : RegisterDiscountDTO ) : Observable<IDiscount> {
        return this._clientProxyDiscounts.send(DiscountMessages.REGISTER_DISCOUNT,registerDiscountDTO);
    }

    @Delete('/:id')
    @ApiOperation({summary:"Delete discount"})
    @ApiResponse({type: DeleteDiscountResponseDTO, status: 200})
    public deleteDiscount(@Param('id',ParseUUIDPipe) id : string) : Observable<IDeleteDiscountRegisterResponse> {
        return this._clientProxyDiscounts.send(DiscountMessages.DELETE_DISCOUNT,id);
    }


}
