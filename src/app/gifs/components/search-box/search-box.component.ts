import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ShowText } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar concordancias..."
    #txtTagInput
    (keyup.enter)="searchTag()"
    (keyup)="onKeyUp($event)"
   >
  `,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  constructor(private gifService: GifsService, private showText: ShowText){}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  searchTag(){
    this.showText.setShowText(null)
    this.showText.setIndex(null)
   const newTag = this.tagInput.nativeElement.value

    this.gifService.searchTag(newTag)

    this.tagInput.nativeElement.value = "";
  }

  onKeyUp(event: KeyboardEvent) {
    // Si la tecla presionada es 'Enter' o 'Intro', realiza la búsqueda
    if (event.key === 'Enter' || event.key === 'Intro') {
      this.searchTag();
    }
  }
}
