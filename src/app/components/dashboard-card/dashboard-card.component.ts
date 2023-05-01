import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit, OnChanges {
  @Input('totalConfirmed')
  totalConfirmed: number = 0;
  @Input('totalDeaths')
  totalDeaths: number = 0;
  @Input('totalActive')
  totalActive: number = 0;
  @Input('totalRecovered')
  totalRecovered: number = 0;

  loading: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.totalConfirmed = changes['totalConfirmed']?.currentValue || 0;
    this.totalDeaths = changes['totalDeaths']?.currentValue || 0;
    this.totalActive = changes['totalActive']?.currentValue || 0;
    this.totalRecovered = changes['totalRecovered']?.currentValue || 0;

    // update the loading status
    this.loading = false;
  }
}
