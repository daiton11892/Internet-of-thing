import { Component, OnInit } from '@angular/core';
import { SensorService } from 'app/service/sensor.service';
import { Sensor } from 'app/models/sensor.model';

//Chart
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Arr
  valueArrTemp = [];
  valueArrHumi = [];
  valueArrGas = [];
  valueTimeTemp = [];
  valueTimeHumi = [];
  valueTimeGas = [];

  // One value Topic
  oneTemp: Sensor[] = [];
  oneHumi: Sensor[] = [];
  oneGas: Sensor[] = [];

  // All value
  allSensor: Sensor[] = [];

  constructor(private _sensor: SensorService) {
    setTimeout(function () {
      window.location.reload();
    }, 15000);
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
    seq = 0;
  };

  ngOnInit() {
    // Service all item of sensor:
    this._sensor.getAllSensor().subscribe(
      res => {
        this.allSensor = res;
      },
      err => {
        console.log(err);
      }
    )

    // Service list one item of sensor
    this._sensor.getListTopicSensor('Temp').subscribe(
      res => {
        for (let i of res) {
          this.valueArrTemp.push(i.value);
          this.valueTimeTemp.push(i.time);
        }
      },
      err => {
        console.log(err);
      }
    )
    this._sensor.getListTopicSensor('Humi').subscribe(
      res => {
        for (let i of res) {
          this.valueArrHumi.push(i.value);
          this.valueTimeHumi.push(i.time);
        }
      },
      err => {
        console.log(err);
      }
    )
    this._sensor.getListTopicSensor('Gas').subscribe(
      res => {
        for (let i of res) {
          this.valueArrGas.push(i.value);
          this.valueTimeGas.push(i.time);
        }
      },
      err => {
        console.log(err);
      }
    )
    // Service one of one item of sensor:

    this._sensor.getOneTopicSensor('Temp').subscribe(
      res => {
        this.oneTemp = res;
      },
      err => {
        console.log(err);
      }
    )

    this._sensor.getOneTopicSensor('Humi').subscribe(
      res => {
        this.oneHumi = res;
      },
      err => {
        console.log(err);
      }
    )

    this._sensor.getOneTopicSensor('Gas').subscribe(
      res => {
        this.oneGas = res;
      },
      err => {
        console.log(err);
      }
    )

    /** Chart */
    /* ----------==========   Temp Chart  ==========---------- */

    const dataTempChart: any = {
      labels: this.valueTimeTemp,
      series: [
        this.valueArrTemp,
      ]
    };
    const optionsTempChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var TempChart = new Chartist.Line('#TempChart', dataTempChart, optionsTempChart);

    this.startAnimationForLineChart(TempChart);

    /* ----------==========   Humi Chart  ==========---------- */

    const dataHumiChart: any = {
      labels: this.valueTimeHumi,
      series: [
        this.valueArrHumi,
      ]
    };
    const optionsHumiChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var HumiChart = new Chartist.Line('#HumiChart', dataHumiChart, optionsHumiChart);

    this.startAnimationForLineChart(HumiChart);


    /* ----------==========   Gas Chart  ==========---------- */

    const dataGasChart: any = {
      labels: this.valueTimeHumi,
      series: [
        this.valueArrGas,
      ]
    };

    const optionsGasChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1024, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var GasChart = new Chartist.Line('#GasChart', dataGasChart, optionsGasChart);

    this.startAnimationForLineChart(GasChart);
  }
}
