import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from '../classes/publication';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [DatePipe]
})
export class PublicationsComponent implements OnInit {

  publications: Publication[];
  constructor(private router:Router, private publicationservice:PublicationService) { }

  ngOnInit(): void {
    this.publicationservice.getPublicationsListe().subscribe(admin => {
      this.publications = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Publication;
      });
      console.log(this.publications);           
    });
  }


  Supprimer(publication){
    console.log(publication);
    this.publicationservice.deletePublication(publication.uid);
  }

  Add(){
    this.router.navigate(['/add-publication']);
  }

  Edit(publication){
    localStorage.setItem('publication',JSON.stringify(publication));
    this.router.navigate(['/edit-publication']);
  }

}
