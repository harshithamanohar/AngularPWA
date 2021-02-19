import { Component} from "@angular/core";
import { SpaceAPIDataService } from "./spaceData/space-apidata.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent{
  index = 0;
  detailLaunchLength = 0;
  launchYear = [];
  allLaunchYear = [];
  launchStatus: string = "";
  landstatus: string = "";
  year: string = "";
  detailLaunch: any;

  constructor(private router: Router,private spacesApiService: SpaceAPIDataService) {
      this.getMethod();
  }

  getMethod() {
    this.spacesApiService.getAllLaunches().subscribe((data) => {
      this.detailLaunch = data;
      this.detailLaunchLength = data.length;

      for (let i = 0; i < this.detailLaunch.length; i++) {
        this.launchYear[i] = this.detailLaunch[i].launch_year;
      }
      this.launchYear.sort((x, y) => {
        return x - y;
      });

      for (let i = 0, j = 1; i < this.launchYear.length; i++, j++) {
        if (this.launchYear[i] != this.launchYear[j]) {
          this.allLaunchYear[this.index] = this.launchYear[i];
          this.index++;
        }
      }
    });
  }

  filterYear(year:any) {
    this.year = year;
    this.router.navigate([""], {
      queryParams: { limit: 100, year: this.year },
    });
    this.spacesApiService.getYear(this.year).subscribe((data) => {
      this.detailLaunch = data;
    });
  }

  filterLaunch(event:any) {
    this.launchStatus = event.target.textContent.toLowerCase();
    this.router.navigate([""], {
      queryParams: { limit: 100, launch_status: this.launchStatus },
    });
    this.spacesApiService.getLaunches(this.launchStatus).subscribe((data) => {
      this.detailLaunch = data;
      this.detailLaunchLength = data.length;
    });
  }

  filterLand(event:any) {
    this.landstatus = event.target.textContent.toLowerCase();

    if (this.launchStatus != "" && this.landstatus != "" && this.year == "") {
      this.spacesApiService
        .getLaunchLand(this.launchStatus, this.landstatus)
        .subscribe((data) => {
          this.detailLaunch = data;
          this.detailLaunchLength = data.length;
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landstatus,
            },
          });
        });
    } 
    else if (
      this.launchStatus != "" &&
      this.landstatus != "" &&
      this.year != ""
    ) {
      this.spacesApiService
        .getAll(this.year, this.launchStatus, this.landstatus)
        .subscribe((data) => {
          this.detailLaunch = data;
          this.detailLaunchLength = data.length;
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landstatus,
              launch_year: this.year,
            },
          });
          return;
        });
    } 
    else {
      this.spacesApiService
        .getLand(this.landstatus)
        .subscribe((data) => {
          this.detailLaunch = data;
          this.detailLaunchLength = data.length;
          return;
        });
    }
  }
}
