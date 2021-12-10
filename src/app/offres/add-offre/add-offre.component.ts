import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffreService } from '../../services/offre.service';
import { Offre } from '../../classes/offre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { minDateValidator } from './min-date.validator';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css'],
  providers: [DatePipe]
})
export class AddOffreComponent implements OnInit {

  offre: Offre;
  OffreForm: FormGroup;
  startDate: Date;
  latest_date: string;
  datepipe = new DatePipe('en-US');
  currentDate : Date =new Date();

  constructor(
    private router:Router, private offreservice: OffreService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.startDate = new Date();
    this.latest_date =this.datepipe.transform(this.startDate, 'dd-MM-yyyy');
    console.log(this.latest_date);
    this.OffreForm = this.fb.group({
      titre:['',[Validators.required]],
      description:['',[Validators.required]],
      departement:['',[Validators.required]],
      date_limited:['', [Validators.required]],
    })
  }

  Add(){
    console.log(this.OffreForm.value);
    this.offreservice.addOffre(this.OffreForm.value);
    this.router.navigate(['/offres']);
  }

}
