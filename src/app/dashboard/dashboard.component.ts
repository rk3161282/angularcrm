import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { Router } from  '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from "ngx-spinner"; 
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts'; 
import { ChartComponent } from 'smart-webcomponents-angular/chart';
import { CheckBoxComponent } from 'smart-webcomponents-angular/checkbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {

  hospital_id : string;
  Pa_appointment : number;
  admin : number;
  c_appointment : number;
  doctor : number;
  hospital : number;
  patient : number;
  revenue : number;
  up_appointment : number;
  user_list : any = [];
  patient_list : any = [];
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Call Counts' },
  ];


  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  @ViewChild('chart', { read: ChartComponent, static: false }) chart: ChartComponent;
  @ViewChild('checkbox', { read: CheckBoxComponent, static: false }) checkbox: CheckBoxComponent;

  sampleData = [
    { Day: 'Monday', Keith: 30, Erica: 15, George: 25 },
    { Day: 'Tuesday', Keith: 25, Erica: 25, George: 30 },
    { Day: 'Wednesday', Keith: 30, Erica: 20, George: 25 },
    { Day: 'Thursday', Keith: 35, Erica: 25, George: 45 },
    { Day: 'Friday', Keith: 20, Erica: 20, George: 25 },
    { Day: 'Saturday', Keith: 30, Erica: 20, George: 30 },
    { Day: 'Sunday', Keith: 60, Erica: 45, George: 90 }
];
      caption = 'Weekly Call Details';
      description = 'Weekly Call Details';
      showLegend = true;
      padding = { left: 5, top: 5, right: 5, bottom: 5 };
      titlePadding = { left: 90, top: 0, right: 0, bottom: 10 };
      dataSource = this.sampleData;
      xAxis = {
          dataField: 'Day',
          gridLines: {
              visible: true
          }
      };
      colorScheme = 'scheme29';
      seriesGroups = [
          {
              type: 'column',
              columnsGapPercent: 50,
              seriesGapPercent: 0,
              valueAxis: {
                  unitInterval: 10,
                  minValue: 0,
                  maxValue: 100,
                  description: 'No of Calls',
                  axisSize: 'auto'
              },
              series: [
                  { dataField: 'Keith', displayText: 'Keith' },
                  { dataField: 'Erica', displayText: 'Erica' },
                  { dataField: 'George', displayText: 'George' }
              ]
          }
      ];

  constructor(private SpinnerService: NgxSpinnerService,private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    Feather.replace();
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
   this.getuser(1,6);
  }

  ngAfterViewInit() {
    this.init();
    Feather.replace();
  }
  init(): void {
    // init code.
    const that = this;

    that.checkbox.addEventListener('change', function (event: CustomEvent) {
        if (that.chart.seriesGroups && that.chart.seriesGroups[0]) {
            that.chart.seriesGroups[0].useGradientColors = event.detail.value;
            that.chart.update();
        }
    });
}

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  getdashboardcount(hospital_id){
    this.authService.getdashboardcount(hospital_id)
    .subscribe(data=> {
      console.log(data.result);
      this.Pa_appointment = data.result.Pa_appointment;
      this.admin = data.result.admin;
      this.c_appointment = data.result.c_appointment;
      this.doctor = data.result.doctor;
      this.hospital = data.result.hospital;
      this.patient = data.result.patient;
      this.revenue = data.result.revenue;
      this.up_appointment = data.result.up_appointment;

      debugger
    })  
  }

  getrecentlyuserlist(hospital_id){
    this.authService.getrecentlyuserlist(hospital_id)
    .subscribe(data=> {
      console.log(data.result);
      this.user_list = data.result;
    
      debugger
    })  
  }

getuser(page,limit){
  this.authService.getUser(page,limit)
  .subscribe(data=> {
    console.log(data);
      this.patient_list = data;
      debugger
    // this.hospital_list = data.result;

    debugger
  })  
}

}
