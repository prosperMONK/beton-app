import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(
    public authservice:AuthService
  ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authservice.logOut()
  }
}
