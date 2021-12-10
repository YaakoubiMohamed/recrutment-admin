import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CondidaturesComponent } from './condidatures/condidatures.component';
import { ProfileComponent } from './profile/profile.component';
import { CvsComponent } from './cvs/cvs.component';
import { OffresComponent } from './offres/offres.component';
import { AddOffreComponent } from './offres/add-offre/add-offre.component';
import { QuizComponent } from './quiz/quiz.component';
import { PublicationsComponent } from './publications/publications.component';
import { CondidatsComponent } from './condidats/condidats.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule} from '@angular/fire';
import { AddPublicationComponent } from './publications/add-publication/add-publication.component';
import { EditPublicationComponent } from './publications/edit-publication/edit-publication.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { EditQuizComponent } from './quiz/edit-quiz/edit-quiz.component';
import { EditOffreComponent } from './offres/edit-offre/edit-offre.component';
import { MessagesComponent } from './messages/messages.component';
import { AddMessageComponent } from './messages/add-message/add-message.component';
import { ShowQuizComponent } from './quiz/show-quiz/show-quiz.component'
import { DataTablesModule } from 'angular-datatables';
import { EnvoyerComponent } from './messages/envoyer/envoyer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CvDetailComponent } from './cvs/cv-detail/cv-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    CondidaturesComponent,
    ProfileComponent,
    CvsComponent,
    OffresComponent,
    AddOffreComponent,
    QuizComponent,
    PublicationsComponent,
    CondidatsComponent,
    LoginComponent,
    AddPublicationComponent,
    EditPublicationComponent,
    AddQuizComponent,
    EditQuizComponent,
    EditOffreComponent,
    MessagesComponent,
    AddMessageComponent,
    ShowQuizComponent,
    EnvoyerComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    CvDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    DataTablesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
