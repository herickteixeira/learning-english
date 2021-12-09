import { Component, OnInit } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase:';  
  public resposta: string | undefined;

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;

  constructor() {
    this.rodadaFrase = this.frases[this.rodada]
  }
  

  ngOnInit(): void {
  }

  public atualizaReposta(resposta: Event): void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
    
  }

  public verificarResposta(): void{

    if(this.rodadaFrase.frasePtBr == this.resposta){
      alert('A tradução está correta')

      this.rodada++;

      this.rodadaFrase = this.frases[this.rodada];

      this.progresso = this.progresso + (100 / this.frases.length);

    }else{
      alert('A tradução está errada')
    }    
    
  }

}
