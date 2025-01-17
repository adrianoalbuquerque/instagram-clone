import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate('500ms 0s ease-in-out') // duração, delay e aceleração
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),

        // 0 void ----X----------------------------X--X--X-------------------X criado 1.5s//
        animate('1.5s 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)'}),

          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)'})
        ])) // duração, delay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  estadoBanner = 'criado';
  estadoPainel = 'criado';

  cadastro = false;

  constructor() { }

  ngOnInit() {
  }

  exibirPainel(event: string) {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  inicioDaAnimacao() {
    // console.log('início da animação')
  }

  fimDaAnimacao() {
    // console.log('fim da animação')
  }
}

