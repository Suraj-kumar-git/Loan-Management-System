import { Customer } from "./Customer";

export class Notification{
  contactUsId!:number;
	customer!:Customer;
	firstName!:string;
	lastName!:string;
	email!:string;
	subject!:string;
	description!:string;
}