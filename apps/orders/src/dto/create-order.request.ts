import { IsString,IsNotEmpty,IsPositive,IsPhoneNumber } from "class-validator";

export class createOrderRequest{
    @IsString()
    @IsNotEmpty()    
    name : string;

    @IsPositive()
    price : number;
 
    @IsPhoneNumber()
    phoneNumber : string;
}