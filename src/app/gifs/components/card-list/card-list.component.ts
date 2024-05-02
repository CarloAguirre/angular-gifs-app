import { Component, Input, Output } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { Concordancias } from '../../interfaces/concordancias.interfaces';
import { Chapter } from '../../interfaces/chapter.interfaces';
import { Verse } from '../../interfaces/verse';
import { ShowText } from '../../../shared/services/shared.service';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  constructor(private showText: ShowText){}

  @Input()
  public gifs: Concordancias[] = [];

  @Input()
  public mostrarSpinner: boolean = false;

  public text: Verse[] = []

  public showTextOutput: boolean | null = this.showText.showText;
  public index: number | null = this.showText.index

  ngOnInit() {
    this.showTextOutput = this.showText.showText;
    this.showText.showTextChanged.subscribe((newValue) => {
      this.showTextOutput = newValue;
    });

    this.index = this.showText.index
    this.showText.indexChanged.subscribe((newValue: null) => {
      this.index = newValue
  })
  }

  public libro: string = "";
  public selectedConcordancia: Concordancias = {
    concordancia: '',
    relacion: '',
    libro: '',
    capitulo: ''
  };
// Función para eliminar acentos de una cadena
  private removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

  public async onCardClick(concordancia: Concordancias, index: number){
    this.showText.setShowText(true)
    this.selectedConcordancia = concordancia
    this.index = index;
    const libroSinAcentos = this.removeAccents(concordancia.libro);
    const bibleFetch = await fetch(`https://bible-api.deno.dev/api/read/rv1960/${libroSinAcentos}/${concordancia.capitulo}`)
    const response = await bibleFetch.json()

    if (response){
      this.text = [];
      // this.selectedConcordancia = {}
      response.vers.map((verse: Verse)=>{
        this.text.push(verse)
      })
      this.showText.setShowText(false)
    }
  }
}
