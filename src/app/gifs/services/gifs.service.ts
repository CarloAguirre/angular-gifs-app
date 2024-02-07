import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiUrl = "http://api.giphy.com/v1/gifs"
  private GIPHY_API_KEY = "N1Vi4fJvHCVi57uzYRLmkOaOKd2WRNYJ"
  constructor(private http: HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase()

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag)
    }

    this._tagsHistory.unshift(tag)
  }

searchTag(tag: string): void{
    if(tag.length === 0) return;
    this.organizeHistory(tag)

    // fetch(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${tag}&limit=10`)
    //   .then(res => res.json())
    //   .then(data=> console.log(data))

    const params = new HttpParams()
      .set('api_key', this.GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag)

    this.http.get(`${this.apiUrl}/search`, {params})
      .subscribe(res =>{
        console.log(res)
      })

  }
}
