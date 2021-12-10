import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Condidat } from '../classes/condidat';

import { CompetenceService } from '../services/competence.service';
import { CondidatService } from '../services/condidat.service';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CvsComponent implements OnInit {

  condidats: Condidat[];
  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private router:Router, private condidatservice:CondidatService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.condidatservice.getCondidats().subscribe(admin => {
      this.condidats = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Condidat;
      });
      console.log(this.condidats);   
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }         
    });
  }


  show(condidat){
    localStorage.setItem('condidat',JSON.stringify(condidat));
    this.router.navigate(['/cv-detail']);
  }

}
