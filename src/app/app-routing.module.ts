import { EnvoyerComponent } from './messages/envoyer/envoyer.component';
import { ShowQuizComponent } from './quiz/show-quiz/show-quiz.component';
import { EditPublicationComponent } from './publications/edit-publication/edit-publication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondidatsComponent } from './condidats/condidats.component';
import { CondidaturesComponent } from './condidatures/condidatures.component';
import { HomeComponent } from './home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './login/login.component';
import { AddOffreComponent } from './offres/add-offre/add-offre.component';
import { OffresComponent } from './offres/offres.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicationsComponent } from './publications/publications.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddPublicationComponent } from './publications/add-publication/add-publication.component';
import { EditOffreComponent } from './offres/edit-offre/edit-offre.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { EditQuizComponent } from './quiz/edit-quiz/edit-quiz.component';
import { CvsComponent } from './cvs/cvs.component';
import { MessagesComponent } from './messages/messages.component';
import { AddMessageComponent } from './messages/add-message/add-message.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CvDetailComponent } from './cvs/cv-detail/cv-detail.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: '',component: LayoutsComponent, children:[
    {path:"home", component:HomeComponent},
    {path:"offres", component:OffresComponent},
    {path:"add-offre", component:AddOffreComponent},
    {path:"edit-offre", component:EditOffreComponent},
    {path:"condidatures", component:CondidaturesComponent},
    {path:"publications", component:PublicationsComponent},
    {path:"add-publication", component:AddPublicationComponent},
    {path:"edit-publication", component:EditPublicationComponent},
    {path:"condidats", component:CondidatsComponent},
    {path:"profile", component:ProfileComponent},
    {path:"quiz", component:QuizComponent},
    {path:"add-quiz", component:AddQuizComponent},
    {path:"edit-quiz", component:EditQuizComponent},
    {path:"show-quiz", component:ShowQuizComponent},
    {path:"profile", component:ProfileComponent},
    {path:"cv", component:CvsComponent},
    {path:"cv-detail", component:CvDetailComponent},
    {path:"messages", component:MessagesComponent},
    {path:"envoyer", component:EnvoyerComponent},
    {path:"add-message", component:AddMessageComponent},
  ]},
  {path:"login", component:LoginComponent},

  {path:"reset-password", component:ResetPasswordComponent},
  {path:"forgot-password", component:ForgetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
