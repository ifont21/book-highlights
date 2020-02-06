import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogue',
    pathMatch: 'full'
  },
  {
    path: 'catalogue',
    loadChildren: () =>
      import('@app/text-catalog/text-catalog.module').then(
        mod => mod.TextCatalogModule
      )
  }
];

export const RouteModule = RouterModule.forRoot(routes, {
  enableTracing: false,
  scrollPositionRestoration: 'enabled'
});
