import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpaceAPIDataService {
  apiUrl = "https://api.spacexdata.com/v3/launches?";

  constructor(private Http: HttpClient) {};

  getAll(launchYear:any, launchSuccess:any, landSuccess:any): Observable<any> {
    return this.Http.get(
      this.apiUrl +
        "launch_year=" +
        launchYear +
        "&launch_success=" +
        launchSuccess +
        "&land_success=" +
        landSuccess
    );
  }

  getLaunchLand(launchSuccess:any, landSuccess:any): Observable<any> {
    return this.Http.get(
      this.apiUrl +
        "&launch_success=" +
        launchSuccess +
        "&land_success=" +
        landSuccess
    );
  }

  getAllLaunches(): Observable<any> {
    return this.Http.get(this.apiUrl);
  }

  getYear(param:any): Observable<any> {
    return this.Http.get(this.apiUrl + "launch_year=" + param);
  }

  getLaunches(param:any): Observable<any> {
    return this.Http.get(this.apiUrl + "launch_success=" + param);
  }

  getLand(param:any): Observable<any> {
    return this.Http.get(this.apiUrl + "land_success=" + param);
  
  }
}
