import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DataService } from 'src/app/shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDoctorComponent } from './delete-doctor/delete-doctor.component';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctorArr : any[]=[];
  displayedColumns: string[] = ['name', 'mobile', 'email', 'department', 'gender','action'];
  dataSource!: MatTableDataSource<Doctor>;
  constructor(public dialog: MatDialog, private api:DataService, private _snackBar:MatSnackBar){

  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllDoctor()
    
  }

  addDctor(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus=true;
  dialogConfig.data={
    title:'Register Doctor'
  }
  
    dialogConfig.data.title = "Add doctor";
    dialogConfig.data.buttonName = "Add";
    

  const dialogRef= this.dialog.open(AddDoctorComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(data=>{
    if(data){
    this.api.addDoctor(data);
    this.openSnackBar('Register of Doctor is Successfull', 'OK')
    }
  })
  }
  openSnackBar(message:string,action:string) {
    this._snackBar.open(message,action)
  }

  getAllDoctor(){
    this.api.getAllDoctor().subscribe(res=>{
      this.doctorArr = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;

      })
      this.dataSource = new MatTableDataSource(this.doctorArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewDoctor(row : any) {
    window.open('/dashboard/doctor/'+row.id,'_blank');
  }
  deleteDoctor(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete doctor',
      doctorName : row.name
    }

    const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.api.deleteDoctor(row.id);
        this.openSnackBar("Doctor deleted successfully.", "OK")
      }
    })
  }
  editDoctor(row : any) {
    if(row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit doctor";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.birthdate = row.birthdate.toDate();

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.api.updateDoctor(data);
        this.openSnackBar("Doctor is updated successfully.", "OK")
      }
    })
  }



}
