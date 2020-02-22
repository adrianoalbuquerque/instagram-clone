import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {

    var firebaseConfig = {
      apiKey: "AIzaSyBWGavNyFpHLoQ71yKApUReEm4BeZ4ysTw",
      authDomain: "jta-instragam-clone.firebaseapp.com",
      databaseURL: "https://jta-instragam-clone.firebaseio.com",
      projectId: "jta-instragam-clone",
      storageBucket: "jta-instragam-clone.appspot.com",
      messagingSenderId: "692304130485",
      appId: "1:692304130485:web:eeafe64d3497037ebd29fc",
      measurementId: "G-940QMS6KWV"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
