import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {BrowserModule} from "@angular/platform-browser";
import {RecommendationsComponent} from "./recommendations.component";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {CarouselModule} from "primeng/carousel";
import {GalleriaModule} from "primeng/galleria";
import {NewlineToBrPipe} from "../../helpers/newline-to-br.pipe";

@NgModule({
  declarations: [RecommendationsComponent, NewlineToBrPipe],
  imports: [
    ButtonModule,
    NgIf,
    PanelModule,
    BrowserModule,
    CardModule,
    DialogModule,
    CarouselModule,
    GalleriaModule,
  ],
  exports: [
    RecommendationsComponent
  ],
  providers: []
})
export class RecommendationsModule {
}
