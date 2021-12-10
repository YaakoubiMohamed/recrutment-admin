import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {

  question: Question;
  QForm: FormGroup;
  date = new Date();
  questions: Question[];
  quiz: any;
  editable=false;
  id: any;
  constructor(private router:Router, private questionservice: QuestionService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.quiz = JSON.parse(localStorage.getItem('quiz'));
    this.getQuestion();
    this.QForm = this.fb.group({
      titre:[''],
      reponse:[''],
      ch1:[''],
      ch2:[''],
      ch3:[''],
      ch4:[''],
      date:[this.date],
      quiz:[this.quiz.uid],
    })
  }

  getQuestion(){
    this.questionservice.getQuestionsListe().subscribe(admin => {
      this.questions = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Question;
      });
      console.log(this.questions);           
    });
  }

  Add(){
    console.log(this.QForm.value);
    this.questionservice.addQuestion(this.QForm.value);
    this.getQuestion();
    this.QForm.reset();
    //this.router.navigate(['/question']);
  }

  update(question){
    this.QForm = this.fb.group(question);
    this.editable = true;
    console.log(this.editable);
    this.id = question.uid;
  }

  edit(){
    this.questionservice.editQuestion(this.QForm.value,this.id);
    this.QForm.reset();
  }


  delete(question){
    this.questionservice.deleteQuestion(question.uid);
  }

}
