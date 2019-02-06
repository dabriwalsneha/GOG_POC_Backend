import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() { }
  private data:any = undefined;
  private data1:any = undefined;
  private data2:any = undefined;
  private data3:any = undefined;
  private data4:any = undefined;

    setData(data:any){
        this.data = data;
    }

    getData():any{
        return this.data;
    }

    setLoginData(data:any){
        this.data1 = data;
    }

    getLoginData():any{
        return this.data1;
    }

    setStatus(data:any){
        this.data2 = data;
    }

    getStatus():any{
        return this.data2;
    }

    setWel(data:any){
        this.data3 = data;
    }

    getWel():any{
        return this.data3;
    }

    setUser(data:any){
        this.data4 = data;
    }

    getUser():any{
        return this.data4;
    }
}
