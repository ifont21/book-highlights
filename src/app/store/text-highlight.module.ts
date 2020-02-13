import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { TextHighlightReducer } from './text-highlight.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.forRoot({
      textHighlight: TextHighlightReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ]
})
export class TextHighlightStoreModule {}
