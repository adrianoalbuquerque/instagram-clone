import { Component, OnInit } from '@angular/core';
import { BdService } from '../../bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  email: string;
  publicacoes: any;

  constructor(private bd: BdService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.atualizarTimeLine();
    });
  }

  atualizarTimeLine() {
    this.bd.consultarPublicacoes(this.email)
    .then((publicacoes: any) => {
      this.publicacoes = publicacoes;
    });
  }
}
