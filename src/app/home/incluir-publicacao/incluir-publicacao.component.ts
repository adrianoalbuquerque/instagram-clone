import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from 'src/app/bd.service';
import { ProgressoService } from 'src/app/progresso.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import * as firebase from 'firebase';
import { interval } from 'rxjs';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  email: string;
  private imagem: any;

  progressoPublicacao = 'pendente';
  porcentagemUpload: number;

  formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null)
  });

  constructor(
    private bd: BdService,
    private progresso: ProgressoService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  publicar() {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    const acompanhamentoUpload = interval(1500);

    const continua = new Subject();

    continua.next(true);

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe(() => {
        // console.log(this.progresso.status)
        // console.log(this.progresso.estado)
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido';

          // emitir um evento do componenete parent (home)
          this.atualizarTimeLine.emit();
          continua.next(false);
        }
      });
  }

  preparaImagemUpload(event: Event) {
    this.imagem = ((event.target as HTMLInputElement).files);
  }

}
