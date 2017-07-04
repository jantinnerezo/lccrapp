import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

/*
  Generated class for the AttendanceDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-attendance-details',
  templateUrl: 'attendance-details.html'
})
export class AttendanceDetailsPage {
    
  
   @ViewChild('lineGraph') lineGraph;
 
   
    lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      
      this.showGraphs();
  }

  
   showGraphs(){
       
       this.lineChart = new Chart(this.lineGraph.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["Present", "Tardiness", "Absences"],
                datasets: [
                    {
                       
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [54,6,30],
                        spanGaps: false,
                    }
                ]
            }
 
        });
       
   }
}
