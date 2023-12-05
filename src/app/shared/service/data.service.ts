import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs :AngularFirestore) { }

  addDoctor(doctor:any){
    doctor.id = this.afs.createId();

    return this.afs.collection('Doctor/').add(doctor)
  }

  addPatient(patient:any){
    patient.id = this.afs.createId();

    return this.afs.collection('Patient/').add(patient)
  }

  getAllDoctor(){
    return this.afs.collection('Doctor/').snapshotChanges();
  }

  getAllPatient(){
    return this.afs.collection('Patient/').snapshotChanges()
  }
  updateDoctor(doctor : any) {
    return this.afs.doc("Doctor/"+doctor.id).update(doctor);
  }

  updatePatient(patient : any) {
    return this.afs.doc("Patient/"+patient.patient_id).update(patient);
  }

  deleteDoctor(id:string){
    return this.afs.doc('Doctor/').delete()
  }
  
  deletePatient(id : string) {
    return this.afs.doc("Patient/"+id).delete();
  }

  getPatientById(id : any) {
    return this.afs.doc("Patient/"+id).valueChanges();
  }

  getDoctorById(id:String){
    return this.afs.doc('Doctor/'+id).valueChanges();
  }
}
