import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {

  token_id: string;

  constructor(private router: Router) {
  }

    cadastrarUsuario(usuario: Usuario): Promise<any> {
       // console.log('Chegamos até o serviço: ', usuario);

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                // remover a senha do atributo senha do objeto usuário
                delete usuario.senha;

                // registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario );

            })
            .catch((error: Error) => {
                console.log(error);
            });
    }

    autenticar(email: string, senha: string) {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
              firebase.auth().currentUser.getIdToken()
              .then((idToken: string) => {
                this.token_id = idToken;
                localStorage.setItem('idToken', idToken);
                this.router.navigate(['/home']);
              });
            })
            .catch((error: Error) => alert(error));
    }

    autenticado(): boolean {

      if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
        this.token_id = localStorage.getItem('idToken');
      }

      if (this.token_id === undefined) {
        this.router.navigate(['/']);
      }

      return this.token_id !== undefined;
    }

    sair() {
      localStorage.removeItem('idToken');
      firebase.auth().signOut()
      .then(() => {
        this.token_id =  undefined;
        this.router.navigate(['/']);
      });
    }
}
