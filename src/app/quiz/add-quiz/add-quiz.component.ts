import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Offre } from 'src/app/classes/offre';
import { Quiz } from 'src/app/classes/quiz';
import { OffreService } from 'src/app/services/offre.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quiz: Quiz;
  QuizForm: FormGroup;
  date = new Date();
  offres: Offre[];
  constructor(private router:Router, private quizservice: QuizService,private fb: FormBuilder, private offreservice:OffreService) { }

  ngOnInit(): void {
    this.offreservice.getOffres().subscribe(admin => {
      this.offres = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Offre;
      });
      console.log(this.offres);           
    });
    this.QuizForm = this.fb.group({
      titre:[''],
      offre:[''],
      date:[this.date],
    })
  }

  Add(){
    console.log(this.QuizForm.value);
    this.quizservice.addQuiz(this.QuizForm.value);
    this.router.navigate(['/quiz']);
  }

}
