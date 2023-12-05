import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {
    id!:any;
    doctorObj!:any;

    constructor(private route:ActivatedRoute, private service:DataService){
      this.id = this.route.snapshot.paramMap.get('id')

    }

  ngOnInit(): void {
    
  }

  getDoctorByID(){
    this.service.getDoctorById(this.id).subscribe(res=>{
      this.doctorObj=res;
      console.log(this.doctorObj);
      
    })
  }

}
