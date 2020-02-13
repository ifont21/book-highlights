import { ColorPickerContainerComponent } from './containers/color-picker-container/color-picker-container.component';
import { ColorFilterContainerComponent } from './containers/color-filter-container/color-filter-container.component';
import { HighlightFilterPipe } from './pipes/highlight-filter.pipe';
import { SharedModule } from './../shared/shared.module';
import { HighlighterComponent } from './pages/highlighter/highlighter.component';
import { NgModule } from '@angular/core';
import { HighlighterRouteModule } from './highlighter-route.module';
import { HighlightListComponent } from './components/highlight-list/highlight-list.component';
import { TextAreaHighlightContainerComponent } from './containers/text-area-highlight-container/text-area-highlight-container.component';
import { HighlightListContainerComponent } from './containers/highlight-list-container/highlight-list-container.component';

@NgModule({
  declarations: [
    HighlighterComponent,
    HighlightListComponent,
    ColorFilterContainerComponent,
    ColorPickerContainerComponent,
    TextAreaHighlightContainerComponent,
    HighlightListContainerComponent,

    HighlightFilterPipe
  ],
  imports: [SharedModule, HighlighterRouteModule]
})
export class HighligtherModule {}
