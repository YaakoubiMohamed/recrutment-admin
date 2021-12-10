import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../classes/message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  user: any;
  contacts: Message[];
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
      //console.log(this.messages);     
      this.messages = this.messages.filter(message =>{
        console.log(message.recepteur,this.user.email)
        return message.recepteur == this.user.email;
      })
      //console.log(this.contacts); 
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
