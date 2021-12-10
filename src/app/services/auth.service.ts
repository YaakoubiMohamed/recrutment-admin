import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  AngularFireAuth
} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        console.log(this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.SetUserData(result.user);
          this.router.navigate(['home']);
        });
        return result;
        
      }).catch((error) => {
        //window.alert(error.message)
        console.log(error.message);
        return error.message;
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }



  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    /*
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
    */
  }
  confirmPasswordReset(token, newPassword) {
    return this.afAuth.confirmPasswordReset(token, newPassword);
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.SetUserData(result.user);
          //this.router.navigate(['dashboard']);
        })
      
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  async SetUserData(user) {
    //const userRef = this.afs.collection('users').doc(user.uid).get();
    //doc(`users/${user.uid}`);
    console.log(user);
    let document = await this.afs.doc(`rh/${user.uid}`).get().toPromise();
    //return document.data();

    //console.log(userData);
    const userInfo = document.data();
    userInfo['uid'] = user.uid;
    console.log(document.data());
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  updateProfile(uid, profile) {
    console.log(uid);
    this.afs.collection('rh').doc(uid).update(profile);
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      localStorage.clear();

      this.router.navigate(['login']);
    })
  }
}
