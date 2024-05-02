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
  public highlightedVerses: number[] = [];
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
    // Lógica para obtener los versículos a resaltar
    this.highlightedVerses = this.getHighlightedVerses(concordancia);
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

  private getHighlightedVerses(concordancia: Concordancias): number[] {
    const verseRange = concordancia.concordancia.split('-');

    if (verseRange.length === 1) {
      // Solo hay un versículo
      const verseNumber = parseInt(verseRange[0].split(':')[1], 10);
      return [verseNumber];
    } else if (verseRange.length === 2) {
      // Hay un rango de versículos
      const startVerse = parseInt(verseRange[0].split(':')[1], 10);
      const endVerse = parseInt(verseRange[1], 10);
      return Array.from({ length: endVerse - startVerse + 1 }, (_, i) => startVerse + i);
    }

    return [];
  }

  isHighlighted(verseNumber: number): boolean {
    // Comprueba si el versículo actual está en la lista de versículos resaltados
    return this.highlightedVerses.includes(verseNumber);
  }

}
