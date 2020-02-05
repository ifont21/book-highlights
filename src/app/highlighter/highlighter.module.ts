import { SharedModule } from './../shared/shared.module';
import { HighlighterComponent } from './pages/highlighter/highlighter.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HighlighterComponent],
  imports: [SharedModule]
})
export class HighligtherModule {}
