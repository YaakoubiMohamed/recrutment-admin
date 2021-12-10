import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../classes/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizs: Quiz[];
  constructor(private router:Router, private quizservice:QuizService) { }

  ngOnInit(): void {
    this.quizservice.getQuizsListe().subscribe(admin => {
      this.quizs = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Quiz;
      });
      console.log(this.quizs);           
    });
  }

  Add(){
    this.router.navigate(['/add-quiz']);
  }


  Supprimer(quiz){    
    this.quizservice.deleteQuiz(quiz.uid)
  }  

  Modifier(quiz){
    localStorage.setItem('quiz',JSON.stringify(quiz));
    this.router.navigate(['/edit-quiz']);
  }

  Afficher(quiz){
    localStorage.setItem('quiz',JSON.stringify(quiz));
    this.router.navigate(['/show-quiz']);
  }

}
