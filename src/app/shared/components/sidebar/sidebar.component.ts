import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { ShowText } from '../../services/shared.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifService : GifsService, private showText: ShowText){}


  get tags(): string[]{
    return this.gifService.tagsHistory;
  }

  tagClick(tag: string): void{
    this.showText.setShowText(null)
    this.showText.setIndex(null)
    this.gifService.searchTag(tag)
  }

}
