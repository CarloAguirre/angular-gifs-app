import { Component, Input, Output } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private gifService: GifsService){}


  get gifs(){
    return this.gifService.gifList;
  }

  get mostrarSpinner(){
    return this.gifService.showSpinner;
  }
}
