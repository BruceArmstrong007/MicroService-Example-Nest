import { Injectable } from '@nestjs/common';
import { createOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository){

  } 

  async createOrder(request: createOrderRequest){
    return this.ordersRepository.create(request);
  }

  async getOrders(){
    return this.ordersRepository.find({});
  }

}
