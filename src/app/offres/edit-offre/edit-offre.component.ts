import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Offre } from 'src/app/classes/offre';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-edit-offre',
  templateUrl: './edit-offre.component.html',
  styleUrls: ['./edit-offre.component.css']
})
export class EditOffreComponent implements OnInit {

  offre: Offre;
  OffreForm: FormGroup;
  offreitems: any;
  currentDate : Date =new Date();
  
  constructor(private router:Router, private offreservice: OffreService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.offreitems = JSON.parse(localStorage.getItem('offre'));
    this.OffreForm = this.fb.group({
      titre:[this.offreitems.titre],
      description:[this.offreitems.description],
      departement:[this.offreitems.departement],
      date_limited:[this.offreitems.date_limited],
    })
  }

  Edit(){
    console.log(this.OffreForm.value);
    this.offreservice.editOffre(this.OffreForm.value,this.offreitems.uid);
    this.router.navigate(['/offres']);
  }

}
