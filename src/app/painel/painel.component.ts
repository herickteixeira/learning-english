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
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase = this.frases[this.rodada];

  public progresso: number = 0;

  public tentativas: number = 3;

  constructor() {
    this.atualizaRodada()
    
  }
  

  ngOnInit(): void {
  }

  public atualizaReposta(resposta: Event): void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
    
  }

  public verificarResposta(): void{

    if(this.rodadaFrase.frasePtBr == this.resposta){
      alert('A tradução está correta')

      //Troca a pergunta da rodada
      this.rodada++;   
      
      this.atualizaRodada();

      //Atualiza o progresso da rodada
      this.progresso = this.progresso + (100 / this.frases.length);      

    }else{

      this.tentativas--
      this.atualizaRodada();

      if(this.tentativas === -1){
        alert('Acabou seus corações');
        
      }
    }    
    
  }

  public atualizaRodada(): void {
    
    //Atualiza a frase da rodada
    this.rodadaFrase = this.frases[this.rodada]

    //Limpa o campo do textarea
    this.resposta = ''
  }

}
