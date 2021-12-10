import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Condidat } from '../classes/condidat';
import { Condidature } from '../classes/condidature';
import { Offre } from '../classes/offre';
import { CondidatService } from '../services/condidat.service';
import { CondidatureService } from '../services/condidature.service';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-condidatures',
  templateUrl: './condidatures.component.html',
  styleUrls: ['./condidatures.component.css']
})
export class CondidaturesComponent implements OnInit {

  condidatures: Condidature[];
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9, 12];
  offres: Offre[];
  offreListe: Offre[];
  jobs: Array<{}> = [];
  condidats: Condidat[];
  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private router:Router, private condidatureservice:CondidatureService,
    private offreservice: OffreService,
    private condidatservice:CondidatService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getCondidatures();
  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }

  getCondidatures(){
    this.condidatservice.getCondidats().subscribe(admin => {
      this.condidats = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Condidat;
      });
      console.log(this.condidats);           
    });
    this.condidatureservice.getCondidaturesListe().subscribe(admin => {
      this.condidatures = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Condidature;
      });
      this.count = this.condidatures.length;
      this.offreservice.getOffres().subscribe(admin => {
        this.offres = admin.map(item => {
          let uid = item.payload.doc.id;
          let data = item.payload.doc.data();
          return { uid, ...(data as {}) } as Offre;
        });
        this.count = this.offres.length;
        console.log(this.offres);  
        this.offreListe = this.offres;      
        let i=0;  
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        } 
        this.condidatures.forEach(data => {
          //console.log(i);
  //        this.offres.forEach(off =>{
            for(let j=0;j<this.count;j++){
                if(this.offres[j].uid == data.offre) {
                  let job={};
                  job['titre'] = this.offres[j].titre;
                  job['departement'] = this.offres[j].departement;
                  job['offre'] = this.offres[j].uid;
                  job['uid'] = data.uid;
                  job['user'] = data.user;
                  console.log(j);
                  
                   
                  this.jobs.push(job); 
                console.log(this.offres[j].uid,data.offre);
                }
              }
              i++; 
            }); 
      });
      //console.log(this.condidatures);   
      //console.log(this.jobs);
    });
  }

  Refuser(condidature){
    let record = {};
    record['etat'] = 'refuser';
    this.condidatureservice.editCondidature(record, condidature.uid);
    this.getCondidatures();
  }  

  showCondidat(condidat){
    localStorage.setItem('condidat',JSON.stringify(condidat));
    this.router.navigate(['cv-detail']);
  }

  Accepter(condidature){
    let record = {};
    record['etat'] = 'accepter';
    this.condidatureservice.editCondidature(record, condidature.uid);
    this.getCondidatures();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
