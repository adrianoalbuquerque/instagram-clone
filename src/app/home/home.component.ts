import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes', {static: false}) publicacoes: any;

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  sair() {
    this.autenticacao.sair();
  }

  atualizarTimeLine() {
    this.publicacoes.atualizarTimeLine();
  }

}
