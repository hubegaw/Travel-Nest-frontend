import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  componentName: string = "home";
  imageQuotes: { image: string, quote: string }[] = [];

  ngOnInit() {
    const images = [
      'assets/images/image1.jpg',
      'assets/images/image2.jpg',
      'assets/images/image3.jpg',
      'assets/images/image4.jpg',
    ];

    const quotes = [
      "Explore the world, one journey at a time.",
      "Embrace the beauty of every destination.",
      "Adventure awaits at every corner of the globe.",
      "Find joy in the journey, not just the destination.",
      "Discover new horizons and create unforgettable memories."
    ];

    this.imageQuotes = images.map((image, index) => ({ image, quote: quotes[index] }));
  }
}
