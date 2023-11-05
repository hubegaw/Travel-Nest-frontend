import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;

  ngOnInit() {
    this.searchForm = new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      startDate: new FormControl<Date | null>(null, Validators.required),
      endDate: new FormControl<Date | null>(null, Validators.required)
    });
  }
}
