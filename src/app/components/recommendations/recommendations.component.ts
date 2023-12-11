import {Component, inject, Input, OnInit} from '@angular/core';
import {AmadeusGeoCode} from "../../api/models/amadeus-geo-code";
import {ApiService} from "../../api/services";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  protected recommendations!: Recommendation[];
  protected displayDetailsDialog: boolean = false;
  currentRecommendation: Recommendation | null = null;
  responsiveOptions: any[] | undefined;
  @Input() cityCode: string = 'NYC';

  ngOnInit() {
    this.apiService.getRecommendations({city: this.cityCode})?.subscribe(recommendations => {
      this.recommendations = recommendations['data'].map((rec: any) => ({
        cityName: rec.name,
        geoCode: rec.geoCode,
        activities: []
      }));
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getActivities(recommendation: any) {
    const recommendationToUpdate = this.recommendations.find(rec => rec.cityName === recommendation.cityName);
    if (recommendationToUpdate) {
      this.apiService.getActivities({body: recommendation.geoCode}).subscribe(activities => {
        recommendationToUpdate.activities = activities['data'];
        this.displayDetailsDialog = true;
      });
    }
  }

  showDetails(recommendation: Recommendation) {
    this.currentRecommendation = recommendation;
    console.log(recommendation)
    this.getActivities(recommendation);
    this.displayDetailsDialog = true;
  }

  onDialogClose() {
    this.displayDetailsDialog = false;
  }
}

export interface Recommendation {
  cityName: string,
  geoCode: AmadeusGeoCode,
  activities: any
}
