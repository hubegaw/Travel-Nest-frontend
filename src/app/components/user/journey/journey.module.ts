import {NgModule} from "@angular/core";
import {JourneyComponent} from "./journey.component";
import {SplitterModule} from "primeng/splitter";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [JourneyComponent],
    imports: [
        SplitterModule,
        NgIf,
        ButtonModule,
        CalendarModule,
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule,
        TimelineModule,
        NgForOf,
        CardModule,
        TableModule,
        ToastModule,
        AsyncPipe,
        OverlayPanelModule,
        RippleModule
    ],
  exports: [
    JourneyComponent
  ],
  providers: []
})
export class JourneyModule {
}
