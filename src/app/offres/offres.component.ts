import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Offre } from '../classes/offre';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {

  offres: Offre[];
  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private router:Router, private offreservice:OffreService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.offreservice.getOffres().subscribe(admin => {
      this.offres = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Offre;
      });
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      } 
      console.log(this.offres);           
    });
  }


  Supprimer(offre){
    console.log(offre);
    this.offreservice.deleteOffre(offre.uid);
  }

  Add(){
    this.router.navigate(['/add-offre']);
  }
  Edit(offre){
    localStorage.setItem('offre',JSON.stringify(offre));
    this.router.navigate(['/edit-offre']);
  }

}
