import { CatalogComponent } from './pages/catalog/catalog.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CatalogueRouteModule } from './catalogue-route.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [SharedModule, CatalogueRouteModule]
})
export class TextCatalogModule {}
