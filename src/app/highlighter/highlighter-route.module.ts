import { HighlighterComponent } from './pages/highlighter/highlighter.component';

import {
  RouterModule,
  Routes
} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HighlighterComponent
  }
];

export const HighlighterRouteModule = RouterModule.forChild(
  routes
);
