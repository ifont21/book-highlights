import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'highlighter',
    pathMatch: 'full'
  },
  {
    path: 'highlighter',
    loadChildren: () =>
      import('@app/highlighter/highlighter.module').then(
        mod => mod.HighligtherModule
      )
  }
];

export const RouteModule = RouterModule.forRoot(routes, {
  enableTracing: false,
  scrollPositionRestoration: 'enabled'
});
