import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/classes/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-envoyer',
  templateUrl: './envoyer.component.html',
  styleUrls: ['./envoyer.component.css']
})
export class EnvoyerComponent implements OnInit {

  messages: Message[];
  user: any;
  constructor(private router:Router, private messageservice:MessageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.user);      
    this.messageservice.getMessagesListe().subscribe(admin => {
      this.messages = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Message;
      });
      this.messages = this.messages.filter(message =>{
        console.log(message.emmetteur,this.user.email)
        return message.emmetteur == this.user.email;
      })
      console.log(this.messages);           
    });
  }


  Supprimer(message){
    console.log(message);
    this.messageservice.deleteMessage(message.uid);
  }

  Add(){
    this.router.navigate(['/add-message']);
  }

  Edit(message){
    localStorage.setItem('message',JSON.stringify(message));
    this.router.navigate(['/edit-message']);
  }

}
