import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {config, GeoJSONSourceSpecification, Map, MapStyle, Marker} from '@maptiler/sdk';
import {MessageService} from "primeng/api";
import {JourneyApiService} from "../../../services/journey-api.service";
import {forkJoin, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../../services/auth.service";

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private readonly messageService = inject(MessageService);
  private readonly journeyService = inject(JourneyApiService);
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthenticationService);
  @Input() journey!: any;
  @Input() action!: string;
  @Output() closeDialog = new EventEmitter<void>();
  map!: Map;
  journeyForm!: FormGroup;
  pois: any[] = [];
  private markers: { [poiName: string]: Marker } = {};
  private baseUrl: string = 'https://api.maptiler.com/geocoding/';
  private apiKey: string = 'GdBykHsvbdFF4ciOF3wi';

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit() {
    this.journeyForm = new FormGroup({
      originCountry: new FormControl('', Validators.required),
      originCity: new FormControl('', Validators.required),
      originStreet: new FormControl(''),
      originHouseNumber: new FormControl(''),
      destinationCountry: new FormControl('', Validators.required),
      destinationCity: new FormControl('', Validators.required),
      destinationStreet: new FormControl(''),
      destinationHouseNumber: new FormControl(''),
      startDate: new FormControl<Date | null>(null, Validators.required),
      endDate: new FormControl<Date | null>(null, Validators.required),
      pois: new FormArray([]),
      user: new FormControl('')
    });

    config.apiKey = this.apiKey
  }

  ngAfterViewInit() {
    const initialState = {lng: 35.063, lat: 30.341, zoom: 2};

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.OPENSTREETMAP,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    const layers = ['Cultural', 'Attraction', 'Place of worship', 'Mall', 'Park', 'National park labels', 'Zoo', 'Stadium', 'Cemetery'];

    layers.forEach(layer => {
      this.map.on('click', layer, (e) => {
        if (e.features && e.features.length > 0) {
          const poi = e.features[0];
          this.onPoiClick(poi);
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['journey'] && this.journey && this.action === 'show') {
      this.loadPoisToMap(this.journey.placesToVisit);
      this.centerMapOnCity(this.journey.destination.city);
      this.pois = this.journey.placesToVisit;
      console.log(this.journey)
    }
  }

  onSubmit() {
    if (this.journeyForm.valid) {
      this.journeyService.saveJourney({body: this.mapFormToDTO()}).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Journey saved',
            detail: 'journey has been saved successfully!',
          })
          this.closeDialog.emit();
          this.journeyForm.reset();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Journey save error',
            detail: 'Could not save journey',
          })
        }
      });
    }
  }

  onPoiClick(poi: any) {
    let isAlreadySaved = false;
    this.pois.forEach(poiSaved => {
      if (poiSaved.name === poi.properties.name) {
        isAlreadySaved = true;
        return
      }
    })
    if (!isAlreadySaved) {
      const poiObject = {
        type: poi.layer.id,
        name: poi.properties.name,
        location: poi.geometry.coordinates
      };

      this.pois.push(poiObject);

      const poiFormGroup = new FormGroup({
        type: new FormControl(poiObject.type),
        name: new FormControl(poiObject.name),
        location: new FormControl(poiObject.location)
      });

      const poisFormArray = this.journeyForm.get('pois') as FormArray;
      poisFormArray.push(poiFormGroup);

      this.markers[poiObject.name] = new Marker({color: 'blue'})
        .setLngLat(poiObject.location)
        .addTo(this.map);
      isAlreadySaved = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Not able to add point of interest',
        detail: 'Point of interest is already selected!',
      })
    }
  }

  centerMapOnPoi(poi) {
    if (poi.location) {
      this.map.flyTo({center: poi.location, essential: true, zoom: 16});
    } else {
      this.map.flyTo({center: poi.coordinates, essential: true, zoom: 16});

    }
  }

  onDeletePoi(poiName: string) {
    if (this.markers[poiName]) {
      this.markers[poiName].remove();
      delete this.markers[poiName];
    }
    const poisFormArray = this.journeyForm.get('pois') as FormArray;
    const index = this.pois.findIndex(poi => poi.name === poiName);
    if (index !== -1) {
      poisFormArray.removeAt(index);
    }
    this.pois = this.pois.filter(poi => poi.name !== poiName);
  }

  loadPoisToMap(pois) {
    pois.forEach(poi => {
      const location = poi.coordinates;

      new Marker({color: 'blue'})
        .setLngLat([location[0], location[1]])
        .addTo(this.map);
    });
  }

  private centerMapOnCity(cityName: string) {
    this.getCoordinates(cityName).subscribe(response => {
      if (response.features && response.features.length > 0) {
        const coordinates = response.features[0].geometry.coordinates;
        this.map.flyTo({center: coordinates, essential: true, zoom: 8});
      }
    });
  }

  getCoordinates(cityName: string): Observable<any> {
    const url = `${this.baseUrl}${encodeURIComponent(cityName)}.json?key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  mapFormToDTO(): any {
    const formValue = this.journeyForm.value;
    const userId = this.authService.decodeToken().userId;

    const journeyDTO = {
      user: userId,
      startPlace: {
        country: formValue.originCountry,
        city: formValue.originCity,
        street: formValue.originStreet,
        houseNumber: formValue.originHouseNumber,
      },
      destination: {
        country: formValue.destinationCountry,
        city: formValue.destinationCity,
        street: formValue.destinationStreet,
        houseNumber: formValue.destinationHouseNumber,
      },
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      placesToVisit: formValue.pois.map((poi: any) => ({
        type: poi.type,
        name: poi.name,
        coordinates: poi.location,
      }))
    };
    return journeyDTO;
  }

  clearMarkersFromMap() {
    Object.values(this.markers).forEach(marker => {
      marker.remove();
    });
    this.markers = {};
    this.pois = [];
  }

  onCarButtonClick() {
    const origin = this.journeyForm.value.originCity;
    const destination = this.journeyForm.value.destinationCity;

    forkJoin({
      origin: this.getCoordinates(origin),
      destination: this.getCoordinates(destination)
    }).subscribe(({origin, destination}) => {

      const originCoordsLat = origin.features[0].geometry.coordinates[1];
      const originCoordsLon = origin.features[0].geometry.coordinates[0];
      const destinationCoordsLat = destination.features[0].geometry.coordinates[1];
      const destinationCoordsLon = destination.features[0].geometry.coordinates[0];

      this.getRoute([originCoordsLon, originCoordsLat], [destinationCoordsLon, destinationCoordsLat])
        .subscribe(route => {
          this.drawRouteOnMap(route);
        });
    });
  }

  getRoute(origin: any, destination: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      'Authorization': '5b3ce3597851110001cf6248445981b90d3540ec988c988d21ade9dd'
    });

    const body = {
      coordinates: [origin, destination]
    };

    const routeServiceUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';

    return this.httpClient.post(routeServiceUrl, body, {headers: headers});
  }

  parseRouteData(routeData) {
    const coordinates = routeData.routes[0].geometry;

    let geoJson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": coordinates
          }
        }
      ]
    };

    return geoJson;
  }

  drawRouteOnMap(routeData) {
    this.map.on('load', async () => {
      const routeGeoJSON = this.parseRouteData(routeData);

      if (this.map.getLayer('route')) {
        this.map.removeLayer('route');
      }
      if (this.map.getSource('route')) {
        this.map.removeSource('route');
      }

      this.map.addSource('route', {
        type: 'geojson',
        data: routeGeoJSON
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {},
        paint: {
          'line-color': '#ff7f00',
          'line-width': 5
        }
      });
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
