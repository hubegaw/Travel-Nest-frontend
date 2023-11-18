import {Component, inject, OnInit} from '@angular/core';
import {DiJourneys, DiUser} from "../../../data";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private readonly journeys$ = inject(DiJourneys);
  private readonly user$ = inject(DiUser);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected userDetails!: any;
  protected journeys!: any[];
  protected selectedJourney!: any;
  protected currentJourney$!: Observable<any>;
  protected upcomingJourneyCountdown!: any;
  displayJourneyDialog: boolean = false;
  currentJourneyHeader: string = "Current journey";
  showAddJourneyButton: boolean = false;
  journeyAction!: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['action'] === 'addJourney') {
        this.onJourneyAction('add');
      }
    });

    this.user$.subscribe((result) => {
      this.userDetails = result;
    })

    this.journeys$.subscribe((result) => {
      this.journeys = result;
    })

    this.currentJourney$ = this.journeys$.pipe(
      map(journeys => {
        return this.checkCurrentJourney(journeys);
      }))

  }

  onJourneyAction(action: string) {
    this.displayJourneyDialog = true;
    this.journeyAction = action;
  }

  checkCurrentJourney(journeys: any[]) {
    let journeyToReturn = undefined;
    const today = new Date();
    let hasUpcomingJourney = false;

    for (const journey of journeys) {
      const startDate = new Date(journey.startDate);
      const endDate = new Date(journey.endDate);

      if (startDate <= today && endDate >= today) {
        journeyToReturn = journey
        return;
      }

      if (startDate > today) {
        journeyToReturn = journey
        hasUpcomingJourney = true;

        const timeDiff = startDate.getTime() - today.getTime();
        const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if(daysRemaining === 0) {
          this.upcomingJourneyCountdown = `${hoursRemaining}h left!`
        } else {
          this.upcomingJourneyCountdown = `${daysRemaining}d ${hoursRemaining}h left!`
        }
      }
    }

    if (hasUpcomingJourney) {
      this.currentJourneyHeader = "Upcoming Journey";
    } else {
      this.currentJourneyHeader = "No Current or Upcoming Journeys";
      this.showAddJourneyButton = true;
    }
    return journeyToReturn;
  }

  onDialogClose() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {}
      }
    ).then();
  }

}
