import { TextHighlightStoreModule } from './store/text-highlight.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { RouteModule } from './app.route';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TextHighlightStoreModule,

    RouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
