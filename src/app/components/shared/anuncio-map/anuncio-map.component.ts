import { Component, OnInit } from '@angular/core';
import { GeocoderService } from '../../../services/geocoder.service';
import { Address } from '../../../models/address.model';
import { AnuncioService } from '../../../services/anuncio.service';

declare let L;

@Component({
  selector: 'app-anuncio-map',
  templateUrl: './anuncio-map.component.html',
  styleUrls: ['./anuncio-map.component.css']
})
export class AnuncioMapComponent implements OnInit {

  query: string;

  locations: any[] = [];
  loadingLocations = false;
  address: Address = new Address();

  map: any;
  marker: any;


  constructor(
    private geocoderService: GeocoderService,
    private anuncioService: AnuncioService
  ) {}


  ngOnInit() {
    this.map = L.map('map');
    this.map.setView([40.41441094701144, -3.7038087844848633], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
    const iconUrl = 'assets/leaflet/images/marker-icon.png';
    const shadowUrl = 'assets/leaflet/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map.on('click', (e) => {

      if (this.marker) {
        this.marker.remove();
      }

      this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);

      this.getAddressFromCoords( e.latlng );

    });
  }


  getAddress() {
    if (!this.query) {
      this.locations = [];
      return;
    }

    this.loadingLocations = true;

    this.geocoderService.getAddress( this.query ).subscribe( locations => {
      this.locations =  locations;
      this.loadingLocations = false;
    } );
  }

  getAddressFromCoords( coords ) {
    this.geocoderService.getAddressFromCoords( coords ).subscribe( location => {
      this.addressSelected(location[0], 18, true);
    } );
  }

  addressSelected( location, zoom = 15, selectedByMap = false ) {
    this.anuncioService.address.formatted = location.formatted;
    this.anuncioService.address.latitud = location.geometry.lat;
    this.anuncioService.address.longitud = location.geometry.lng;

    const placeComponents = location.components;

    this.anuncioService.address.provincia = placeComponents.city || placeComponents.county;
    this.anuncioService.address.poblacion = placeComponents.state || placeComponents.county || placeComponents.city;
    this.anuncioService.address.zona = placeComponents.suburb || placeComponents.state || placeComponents.county;
    this.anuncioService.address.cp = placeComponents.postcode || '';

    if (selectedByMap) {
      this.address = this.anuncioService.address;
    }

    this.locations = [];

    this.map.setView([
      this.anuncioService.address.latitud,
      this.anuncioService.address.longitud
    ], zoom);

  }

  removeAddress() {
    this.anuncioService.address = new Address();
    this.address = new Address();
    this.locations = [];
  }

}
