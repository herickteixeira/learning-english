import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase:';  
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase = this.frases[this.rodada];

  public progresso: number = 0;

  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada()
    
  }
  

  ngOnInit(): void {
   
  }
  ngOnDestroy(){
    console.log('Componente painel foi destruido')
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
      
      if( this.rodada === 4 ) {
        this.encerrarJogo.emit("vitoria");
      }

    }else{

      this.tentativas--
      this.atualizaRodada();

      if( this.tentativas === -1 ){
        this.encerrarJogo.emit("derrota");
        
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
