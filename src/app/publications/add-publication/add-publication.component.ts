import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Publication } from 'src/app/classes/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent implements OnInit {

  publication: Publication;
  PublicationForm: FormGroup;
  date = new Date();
  constructor(private router:Router, private publicationservice: PublicationService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.PublicationForm = this.fb.group({
      titre:[''],
      texte:[''],
      date:[this.date],
    })
  }

  Add(){
    console.log(this.PublicationForm.value);
    this.publicationservice.addPublication(this.PublicationForm.value);
    this.router.navigate(['/publications']);
  }

}
