import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {config, Map, MapStyle, Marker} from '@maptiler/sdk';
import {MessageService} from "primeng/api";
import {JourneyApiService} from "../../../services/journey-api.service";

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly messageService = inject(MessageService);
  private readonly journeyService = inject(JourneyApiService);
  @Input() journey!: any;
  @Input() action!: string;
  @Output() closeDialog = new EventEmitter<void>();
  map!: Map;
  journeyForm!: FormGroup;
  pois: any[] = [];
  private markers: { [poiName: string]: Marker } = {};

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
      user: new FormControl('1')
    });

    config.apiKey = 'GdBykHsvbdFF4ciOF3wi'
  }

  ngAfterViewInit() {
    const initialState = { lng: 35.063, lat: 30.341, zoom: 2 };

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

  onSubmit() {
    if (this.journeyForm.valid) {
      this.journeyService.saveJourney({body: this.mapFormToDTO()}).subscribe({next: (response) => {
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
      if(poiSaved.name === poi.properties.name) {
        isAlreadySaved = true;
        return
      }
    })
    if(!isAlreadySaved) {
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
    this.map.flyTo({ center: poi.location, essential: true, zoom: 17 });
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

  mapFormToDTO(): any {
    const formValue = this.journeyForm.value;

    const journeyDTO = {
      user: formValue.user,
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

  ngOnDestroy() {
    this.map?.remove();
  }
}
