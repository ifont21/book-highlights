import { CatalogComponent } from './pages/catalog/catalog.component';
import {
  RouterModule,
  Routes
} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: CatalogComponent
  }
];

export const CatalogueRouteModule = RouterModule.forChild(
  routes
);
