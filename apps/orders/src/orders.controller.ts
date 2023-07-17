import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderRequest } from './dto/create-order.request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: createOrderRequest, @Req() req : any){
    return this.ordersService.createOrder(request,request.cookies?.Authentication);
  }

  @Get()
  async getOrders(){
    return this.ordersService.getOrders();
  }

}
