import { Component, Input, Output } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { Concordancias } from '../../interfaces/concordancias.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  @Input()
  public gifs: Concordancias[] = [];

  @Input()
  public mostrarSpinner: boolean = false;
}
