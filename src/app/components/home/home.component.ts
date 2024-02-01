import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {config, Map, MapStyle} from "@maptiler/sdk";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  componentName: string = "home";
  imageQuotes: { image: string, quote: string }[] = [];
  private apiKey: string = 'GdBykHsvbdFF4ciOF3wi';
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  map!: Map;
  componentToShow!: string;

  ngOnInit() {
    const images = [
      'assets/images/image1.jpg',
      'assets/images/image3.jpg',
      'assets/images/image4.jpg',
    ];

    const quotes = [
      "Explore the world, one journey at a time.",
      "Adventure awaits at every corner of the globe.",
      "Find joy in the journey, not just the destination.",
    ];

    this.imageQuotes = images.map((image, index) => ({ image, quote: quotes[index] }));
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
  }

  handleChildOutput(value: string) {
    this.componentToShow = value;
  }
}
