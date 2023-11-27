import {ElementRef, inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Map, MapStyle, Marker} from '@maptiler/sdk';
import {FormArray} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly http = inject(HttpClient);
  private apiKey: string = 'https://api.maptiler.com/geocoding/'; // Replace with your API key
  private baseUrl: string = 'GdBykHsvbdFF4ciOF3wi';
  private map!: Map;
  private markers: { [poiName: string]: Marker } = {};
  pois: any[] = [];

  initializeMap(mapContainer: ElementRef<HTMLElement>): Map {
    const initialState = {lng: 35.063, lat: 30.341, zoom: 2};
    this.map = new Map({
      container: mapContainer.nativeElement,
      style: MapStyle.OPENSTREETMAP,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    return this.map;
  }

  addPoiToMap(poi: any): Marker {
    const marker = new Marker({color: 'blue'})
      .setLngLat([poi.coordinates[0], poi.coordinates[1]])
      .addTo(this.map);
    return marker;
  }

  centerMapOnCoordinates(coordinates: [number, number], zoomLevel: number = 8) {
    this.map.flyTo({center: coordinates, essential: true, zoom: zoomLevel});
  }

  getCoordinates(cityName: string): Observable<any> {
    const url = `${this.baseUrl}${encodeURIComponent(cityName)}.json?key=${this.apiKey}`;
    return this.http.get(url);
  }
}
