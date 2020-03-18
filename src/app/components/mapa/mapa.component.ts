import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl:any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() cords: string;
  @ViewChild('mapa', {static: true}) mapa;

  constructor() { }

  ngOnInit() {
    const latLng = this.cords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
      console.log(this.cords);
      mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVhNDA0MCIsImEiOiJjazd3OGdycHYwMXFoM2RsaW9vOXlkN3d4In0.tQNhS6tHQqjKiXqwtOLsbg';
      const map = new mapboxgl.Map({
         container:  this.mapa.nativeElement,
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [lng, lat],
         zoom: 15
    });
    //crrando marcador 
    
    const marker = new mapboxgl.Marker()
        .setLngLat( [ lng, lat ] )
        .addTo( map );



  }

}
