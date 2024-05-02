import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShowText {
  public showText: boolean | null = false;
  public showTextChanged: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();

  public index: number | null = null;
  public indexChanged: EventEmitter<number | null> = new EventEmitter<number | null>()

  setIndex(valor: null | number) {
    this.index = valor
    this.indexChanged.emit(valor)
  }

  setShowText(valor: boolean | null) {
    this.showText = valor;
    this.showTextChanged.emit(valor); // Emitir el evento cuando cambia showText
  }
}
