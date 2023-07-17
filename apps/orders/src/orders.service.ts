import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository,@Inject(BILLING_SERVICE) private blllingClient: ClientProxy){

  } 

  async createOrder(request: createOrderRequest, authentication: string){
    const session = await this.ordersRepository.startTransaction();
    try{
      const order = await this.ordersRepository.create(request, {session});
      await lastValueFrom(
        this.blllingClient.emit('order_created',{
          request,
          Authentication: authentication
        })
      )
      await session.commitTransaction();
      return order;
    } catch (err) {
      await (await session).abortTransaction();
      throw err;
    }
    return this.ordersRepository.create(request);
  }

  async getOrders(){
    return this.ordersRepository.find({});
  }

}
