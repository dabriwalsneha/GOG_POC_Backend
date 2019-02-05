import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pipe, Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Router , ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
samplearray: any;
  
private messageSource = new BehaviorSubject<any>("Hello");
currentMessage = this.messageSource.asObservable();
private data: any = undefined;
  
constructor() { }

setData(data:any){
this.data = data;
}

getData():any{
return this.data;
} 


changemessage(samplearray){
console.log("In SERVICE");
let mydata = JSON.stringify(samplearray);
this.messageSource.next(mydata);
console.log("DATA FROM SOURCE-->"+mydata);

}



}
