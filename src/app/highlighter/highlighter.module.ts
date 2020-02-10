import { HighlightFilterPipe } from './pipes/highlight-filter.pipe';
import { SharedModule } from './../shared/shared.module';
import { HighlighterComponent } from './pages/highlighter/highlighter.component';
import { NgModule } from '@angular/core';
import { HighlighterRouteModule } from './highlighter-route.module';
import { HighlightListComponent } from './components/highlight-list/highlight-list.component';

@NgModule({
  declarations: [
    HighlighterComponent,
    HighlightListComponent,

    HighlightFilterPipe
  ],
  imports: [SharedModule, HighlighterRouteModule]
})
export class HighligtherModule {}
