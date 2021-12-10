import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { CondidatService } from 'src/app/services/condidat.service';
import { Condidat } from 'src/app/classes/condidat';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {

  contactForm: FormGroup;
  user: any;
  date = new Date();
  condidats: Condidat[];
  
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private condidatservice:CondidatService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.user);
    this.getCondidats();
    this.contactForm = this.fb.group({
      "sujet":[''],
      "texte":[''],
      "recepteur":[''],
      "emmetteur":[this.user.email],
      "date":[this.date],
    })
  }


  getCondidats(){
    this.condidatservice.getCondidats().subscribe(admin => {
      this.condidats = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Condidat;
      });
      console.log(this.condidats);   
             
    });
  }


  envoyer(){
    console.log(this.contactForm.value);
    this.messageService.addMessage(this.contactForm.value);
    this.router.navigate(['/envoyer']);
  }
}
