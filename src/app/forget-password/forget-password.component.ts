import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  code: any;

  constructor(private auth: AuthService,private fb: FormBuilder, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams['oobCode'];
  }

  reset(password,confirmPassword){
    this.auth.confirmPasswordReset(this.code, password);
  }

}
