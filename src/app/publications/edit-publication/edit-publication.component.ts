import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Publication } from 'src/app/classes/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css']
})
export class EditPublicationComponent implements OnInit {

  publication: Publication;
  PublicationForm: FormGroup;
  constructor(private router:Router, private publicationservice: PublicationService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.publication = JSON.parse(localStorage.getItem('publication'));
    console.log(this.publication);
    this.PublicationForm = this.fb.group({
      titre:[this.publication.titre],
      texte:[this.publication.texte],
    })
  }

  Edit(){
    console.log(this.PublicationForm.value);
    this.publicationservice.editPublication(this.PublicationForm.value,this.publication.uid);
    this.router.navigate(['/publications']);
  }

}
