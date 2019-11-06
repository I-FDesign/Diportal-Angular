import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Anuncio } from '../../../models/anuncio.model';

declare let L;

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit, OnChanges {

  map: any;
  mapHandler: any;
  marker: any;

  @Input() anuncios: Anuncio[] = [];

  announceToShow: Anuncio;


  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  generateMap( anuncios ) {
    if (!this.map) {
      this.mapHandler = L;

      this.map = this.mapHandler.map('map');
      this.map.setView([40.41441094701144, -3.7038087844848633], 6);

      this.mapHandler.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
      const iconUrl = 'assets/leaflet/images/marker-icon.png';
      const shadowUrl = 'assets/leaflet/images/marker-shadow.png';
      const iconDefault = this.mapHandler.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      this.mapHandler.Marker.prototype.options.icon = iconDefault;
    }

    anuncios.forEach(anuncio => {

      const latLgn = {
        lon: anuncio.address.longitud,
        lat: anuncio.address.latitud
      };

      this.mapHandler.marker(latLgn,
        { title: anuncio.title })
        .on('click', () => {
          this.announceToShow = anuncio;
        })
        .addTo(this.map);
    });

  }

  ngOnChanges() {
    console.log(this.anuncios);
    this.generateMap(this.anuncios);
  }

}
