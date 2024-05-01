import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { Concordancias } from '../interfaces/concordancias.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Concordancias[] = [];

  public showSpinner: boolean = false;

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

  async searchTag(tag: string) {
    if(tag.length === 0) return;
    // Supongamos que tienes algún dato que deseas enviar en el cuerpo de la solicitud POST
    this.showSpinner = true;
    const requestData = {
        tag: tag,
        // Otros datos que desees enviar...
    };

    // Configurar la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
        },
        body: JSON.stringify(requestData),
    };

    // Realizar la solicitud POST
    try {
      const response = await fetch('https://ia-server-5.onrender.com/api/gpt', requestOptions);
      const data = await response.json(); // Si esperas una respuesta JSON

      if (Array.isArray(data) && data.length < 1) {
          // Si data es un array y tiene longitud de uno
          window.alert("No hay referencias")
          this.showSpinner = false;
      } else {
          // Si no cumple la condición
          this.gifList = data;
          this.organizeHistory(tag);
          this.showSpinner = false;
      }
  } catch (error) {
        console.error('Error al realizar la solicitud POST:', error);
    }
}

}
