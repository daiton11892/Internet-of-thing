import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable,Subject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ControlLedService {

  data: Subject<any>;

  constructor(private _wsService: WebsocketService) { 
    this.data = <Subject<any>>_wsService.connect().map((response: any):any => {
      return response;
    })
  }

  led_On(msg){
    this.data.next(msg);
  }

  led_Off(msg){
    this.data.next(msg);
  }
}
