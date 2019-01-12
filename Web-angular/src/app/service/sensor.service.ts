import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private _http: Http) { }
  // Kết nối Api lấy toàn bộ danh sách
  getAllSensor(){
    let url = `http://10.10.0.1:5000/sensor`;
    let obServe = this._http.get(url).pipe(map((res: Response) => res.json().result));
    return obServe;
  }
  // Kết nối Api lấy toàn bộ danh sách theo tiêu đề 
  getListTopicSensor(topic: string) {
    let url = `http://10.10.0.1:5000/sensor/${topic}`;
    let obServe = this._http.get(url).pipe(map((res: Response) => res.json().result));
    return obServe;
  }
  // Kết nối Api lấy số liệu mới nhất
  getOneTopicSensor(topic: string) {
    let url = `http://10.10.0.1:5000/sensor/${topic}_one`;
    let obServe = this._http.get(url).pipe(map((res: Response) => res.json().result));
    return obServe;
  }
}
