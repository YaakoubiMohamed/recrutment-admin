import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: any;
  profileForm: FormGroup;
  photo: any;
  @ViewChild("img") img: ElementRef;
  newimg = false;

  constructor(private storage: AngularFireStorage,
    private userService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.profileForm = this.fb.group({
      "nom":[this.user.nom],
      "prenom":[this.user.prenom],
      "telephone":[this.user.telephone],
      "departement":[this.user.departement],
      "photo":[this.user.photo],
    })
  }


  update(){
    //console.log(this.addProduct.value);
    let profile={};
    
    profile = this.profileForm.value;
    profile['email'] = this.user.email;
    if(!this.newimg) {
      profile['photo']= this.user.photo;
      console.log(this.user.photo);
    }
    else{
      profile['photo']= this.img;
      console.log(this.img);
    }    
   console.log(profile);
    localStorage.setItem('userInfo',JSON.stringify(profile));
    this.userService.updateProfile(this.user.uid, profile);
  }

  upload(f, img) {
    this.newimg = true;
    const path = `/images/${f.files[0].name}`;
    const storageReference = this.storage.ref('/images/' + f.files[0].name);
    const uploadTask = this.storage.upload(path,(f.files[0]));
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageReference.getDownloadURL().subscribe(downloadURL => {
          this.img = downloadURL;
          //fileUpload.name = fileUpload.file.name;
          console.log(this.img);
        });
      })
    ).subscribe();
  }

}
