import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[] = [];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData: DateWiseData[] = [];
  dateWiseData: any = 0;
  loading = true;
  options: {
    height: number;
    animation: {
      duration: number;
      easing: string;
    };
  } = {
    height: 500,
    animation: {
      duration: 1000,
      easing: 'out',
    },
  };

  constructor(private service: DataServiceService) {}

  ngOnInit(): void {
    merge(
      this.service.getDateWiseData().pipe(
        map((result) => {
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(
        map((result) => {
          this.data = result;
          this.data.forEach((cs) => {
            if (cs.country !== undefined) {
              this.countries.push(cs.country);
            }
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues('India');
        this.loading = false;
      },
    });
  }

  updateChart() {
    let dataTable = [];
    dataTable.push(['Date', 'Cases']);
    this.selectedCountryData.forEach((cs) => {
      dataTable.push([cs.date, cs.cases]);
    });
  }

  updateValues(country: string) {
    console.log(country);
    this.data.forEach((cs) => {
      if (cs.country == country) {
        if (cs.active !== undefined) {
          this.totalActive = cs.active;
        }
        if (cs.deaths !== undefined) {
          this.totalDeaths = cs.deaths;
        }
        if (cs.recovered !== undefined) {
          this.totalRecovered = cs.recovered;
        }

        if (cs.confirmed !== undefined) {
          this.totalConfirmed = cs.confirmed;
        }
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
    // console.log(this.selectedCountryData);
    this.updateChart();
  }
}
