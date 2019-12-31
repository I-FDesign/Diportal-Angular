import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';
import { Anuncio } from '../../../../models/anuncio.model';
import { GeocoderService } from '../../../../services/geocoder.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { AnuncioService } from '../../../../services/anuncio.service';

declare var swal;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  public xmlItems: any;

  file: any;

  constructor(
    private http: HttpClient,
    private geoCoderService: GeocoderService,
    private authenticationService: AuthenticationService,
    private anuncioService: AnuncioService
    ) {
  }

  setFile(event) {
    if (event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }

  formSubmit() {
    if (!this.file) {
      return;
    }

    this.loadXML();

  }

  loadXML() {

    const reader = new FileReader();
    reader.onload = (evt) => {
        const xmlData: string = (evt as any).target.result;
        this.parseXML(xmlData)
          .then((data) => {
            this.xmlItems = data;
          });
    };
    reader.readAsText(this.file);
  }
  parseXML(data) {
    return new Promise(resolve => {
      let k: string | number;
      const arr = [];
      const parser = new xml2js.Parser();
      parser.parseString(data, (err, result) => {
        const obj = result.properties.propiedad;
        // tslint:disable: prefer-for-of
        // tslint:disable: max-line-length

        for (let i = 0; i < obj.length; i++) {

          if (!obj[i].descripciones[0].descripcion) {
            obj[i].descripciones[0] = {
              descripcion: [
                {
                  descripcion: 'Propiedad en venta',
                  titulo: 'Propiedad en venta'
                }
              ]
            };
          }

          const announce = new Anuncio(
            (obj[i].descripciones[0].descripcion.length > 1) ? obj[i].descripciones[0].descripcion[1].titulo[0] : obj[i].descripciones[0].descripcion[0].titulo[0],
            obj[i].descripciones[0].descripcion[0].titulo[0],
            {
              formatted: obj[i].localizacion[0].zona[0] + ', ' + obj[i].localizacion[0].poblacion[0]._ + ', ' + obj[i].localizacion[0].provincia[0],
              provincia: obj[i].localizacion[0].provincia[0],
              provinciaFormatted: this.geoCoderService.sanitizeProvince(obj[i].localizacion[0].provincia[0]).toString(),
              poblacion: obj[i].localizacion[0].poblacion[0]._,
              zona: obj[i].localizacion[0].zona[0],
              cp: obj[i].localizacion[0].cp[0]
            },
            false,
            (obj[i].operacion[0]._ === 'Venta' || obj[i].operacion[0]._ === 'Traspaso') ? 'comprar' : 'alquilar',
            null,
            'vivienda',
            'piso',
            obj[i].dormitorios[0],
            obj[i].banos[0],
            (obj[i].superficies[0].construida[0]) ? obj[i].superficies[0].construida[0] : obj[i].superficies[0].habitable[0],
            obj[i].precio[0]._,
            [],
            (obj[i].descripciones[0].descripcion.length > 1) ? obj[i].descripciones[0].descripcion[1].descripcion[0] : obj[i].descripciones[0].descripcion[0].descripcion[0],
            obj[i].descripciones[0].descripcion[0].descripcion[0],
            obj[i].referencia[0],
            obj[i].caracteristicas[0].caracteristica
          );

          if (obj[i].imagenes[0].imagen) {
            for (let b = 0; b < obj[i].imagenes[0].imagen.length; b++) {
              announce.imagenes.push(obj[i].imagenes[0].imagen[b].$.url);
            }
          }

          announce.uid = this.authenticationService.user._id;

          this.anuncioService.uploadImportedAnuncios(announce);

          if (i === obj.length - 1) {
            swal('Anuncios importados', 'Los anuncios han sido importados y subidos correctamente!', 'success');
            resolve(arr);
            return;
          }
        }
      });
    });
  }

}
