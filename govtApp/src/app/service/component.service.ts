import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() { }
  private data:any = undefined;

    setData(data:any){
        this.data = data;
    }

    getData():any{
        return this.data;
    }

    setLoginData(data:any){
        this.data = data;
    }

    getLoginData():any{
        return this.data;
    }

    setStatus(data:any){
        this.data = data;
    }

    getStatus():any{
        return this.data;
    }

    setWel(data:any){
        this.data = data;
    }

    getWel():any{
        return this.data;
    }

    setUser(data:any){
        this.data = data;
    }

    getUser():any{
        return this.data;
    }
}
