import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderRequest } from './dto/create-order.request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: createOrderRequest){
    return this.ordersService.createOrder(request);
  }

  @Get()
  async getOrders(){
    return this.ordersService.getOrders();
  }

}
