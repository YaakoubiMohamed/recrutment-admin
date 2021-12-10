import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Offre } from 'src/app/classes/offre';
import { Quiz } from 'src/app/classes/quiz';
import { OffreService } from 'src/app/services/offre.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  quiz: Quiz;
  QuizForm: FormGroup;
  date = new Date();
  offres: Offre[];
  quizitem: any;
  constructor(private router:Router, private quizservice: QuizService,private fb: FormBuilder, private offreservice:OffreService) { }

  ngOnInit(): void {
    this.quizitem = JSON.parse(localStorage.getItem('quiz'));
    this.offreservice.getOffres().subscribe(admin => {
      this.offres = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Offre;
      });
      console.log(this.offres);           
    });
    this.QuizForm = this.fb.group({
      titre:[this.quizitem.titre],
      offre:[this.quizitem.offre],
      date:[this.date],
    })
  }

  Edit(){
    console.log(this.QuizForm.value);
    this.quizservice.editQuiz(this.QuizForm.value,this.quizitem.uid);
    this.router.navigate(['/quiz']);
  }

}
