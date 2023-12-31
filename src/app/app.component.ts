import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HMSystem';
  userLoggedIn :boolean =false;
  constructor(private apiAuth:AuthService){

  }

ngOnInit(): void {
  this.userLoggedIn= this.apiAuth.isUserLoggedIn()
}
}
