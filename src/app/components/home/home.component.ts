import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[] = [];
  datatable: (string | number)[][] = [];
  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    LineChart: 'LineChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true,
    },
  };

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.globalData.forEach((cs) => {
              if (cs.active !== undefined) {
                this.totalActive += cs.active;
              }
            });
            this.globalData.forEach((cs) => {
              if (cs.confirmed !== undefined) {
                this.totalConfirmed += cs.confirmed;
              }
            });

            this.globalData.forEach((cs) => {
              if (cs.deaths !== undefined) {
                this.totalDeaths += cs.deaths;
              }
            });
            this.globalData.forEach((cs) => {
              if (cs.recovered !== undefined) {
                this.totalRecovered += cs.recovered;
              }
            });
          }
        });

        this.initChart('c');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }

  initChart(caseType: string) {
    this.datatable = [];
    this.datatable.push(['Country', 'Cases']);

    this.globalData.forEach((cs) => {
      let value: number | undefined;

      if (
        caseType == 'c' &&
        cs.confirmed !== undefined &&
        cs.confirmed > 2000
      ) {
        value = cs.confirmed;
      }

      if (caseType == 'a' && cs.active !== undefined && cs.active > 2000) {
        value = cs.active;
      }

      if (caseType == 'd' && cs.deaths !== undefined && cs.deaths > 1000) {
        value = cs.deaths;
      }

      if (
        caseType == 'r' &&
        cs.recovered !== undefined &&
        cs.recovered > 2000
      ) {
        value = cs.recovered;
      }

      this.datatable.push([cs.country, value ?? 0]);
    });
    console.log(this.datatable);
  }
}
