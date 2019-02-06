import { AddressJson } from './address.model';

export class User {

  id: number;
  firstname: string;
  lastname: string;
  email: string;
  contact: number;
  age: number;
  gender: string;
  status: boolean;
  designation: string;
  dob: Date;
  address:AddressJson;
  selector:boolean;
  count:number;
  constructor() {
    this.address=new AddressJson();
  }
}

export class PageUser{
  content : User[];
}