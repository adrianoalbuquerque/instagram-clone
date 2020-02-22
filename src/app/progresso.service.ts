import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

  status: string;
  estado: any;

  constructor() { }
}
