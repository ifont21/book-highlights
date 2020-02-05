import { CatalogComponent } from './pages/catalog/catalog.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [SharedModule]
})
export class TextCatalogModule {}
