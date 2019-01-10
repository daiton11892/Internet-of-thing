import { Component, OnInit } from '@angular/core';
import { SensorService } from 'app/service/sensor.service';
import { Sensor } from 'app/models/sensor.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  sensorTemp:Sensor[] = [];
  sensorHumi:Sensor[] = [];
  sensorGas:Sensor[] = [];
  constructor(private _listsensor: SensorService) { }

  ngOnInit() {
    this._listsensor.getListTopicSensor('Temp').subscribe(
      res => {
        this.sensorTemp = res;
      },
      err => {
        console.log(err);
      }
    )
    this._listsensor.getListTopicSensor('Humi').subscribe(
      res => {
        this.sensorHumi = res;
      },
      err => {
        console.log(err);
      }
    )
    this._listsensor.getListTopicSensor('Gas').subscribe(
      res => {
        this.sensorGas = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
