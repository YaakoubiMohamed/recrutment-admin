import { Component, OnInit } from '@angular/core';
import { Competence } from 'src/app/classes/competence';
import { CompetenceService } from 'src/app/services/competence.service';

@Component({
  selector: 'app-cv-detail',
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.css']
})
export class CvDetailComponent implements OnInit {
  condidat: any;
  competances: Competence[];
  user: any;
  educations: Competence[];
  experiences: Competence[];
  competences: Competence[];
  socials: Competence[];

  constructor(private competanceService: CompetenceService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.condidat = JSON.parse(localStorage.getItem('condidat'));
    console.log(this.condidat);
    this.getCompetances();
  }


  getCompetances(){
    this.competanceService.getCompetencesListe().subscribe(admin => {
      this.competances = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Competence;
      });
      console.log('competances', this.competances);
      this.competances = this.competances.filter(competence =>{
        return competence.user == this.condidat.uid;
      })
      console.log(this.competances);   
      this.educations = this.competances.filter(education => {
        return education.type == 'education';
      })
      this.experiences = this.competances.filter(experience => {
        return experience.type == 'experience';
      })
      this.competences = this.competances.filter(competence => {
        return competence.type == 'competance';
      })
      this.socials = this.competances.filter(social => {
        return social.type == 'social';
      })
      console.log("educations",this.educations,"experiences",this.experiences,
      "competences",this.competences,"socials",this.socials[0].github);           
    });
  }

}
