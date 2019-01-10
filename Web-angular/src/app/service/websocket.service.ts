import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {

    this.socket = io(`http://10.10.0.1:8000`);

    let observable = new Observable(observable => {
      this.socket.on('led-change', (data) => {
        observable.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('led-change', data);
      },
    };

    return Rx.Subject.create(observer, observable);
  }
}


