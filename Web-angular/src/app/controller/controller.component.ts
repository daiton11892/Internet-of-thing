import { Component, OnInit } from '@angular/core';
import { ControlLedService } from '../service/control-led.service'

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {
  isShowIcon_1 = false;
  isShowIcon_2 = false;
  isShowIcon_All = false;
  constructor(private _control:ControlLedService) { }

  ngOnInit() {
    this._control.data.subscribe(msg => {
      console.log(msg);
    })
  }

  led1_On(){
    this._control.led_On('on_1')
  }

  led1_Off(){
    this._control.led_Off('off_1')
  }

  led2_On(){
    this._control.led_On('on_2')
  }

  led2_Off(){
    this._control.led_Off('off_2')
  }

  ledAll_On(){
    this._control.led_On('on_all')
  }

  ledAll_Off(){
    this._control.led_Off('off_all')
  }
  
}
