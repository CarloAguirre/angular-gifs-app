import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gif..."
    #txtTagInput
    (keyup.enter)="searchTag()"
   >
  `,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  searchTag(){
    console.log({newTag: this.tagInput.nativeElement.value})
  }
}
