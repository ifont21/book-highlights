import { NgModule } from '@angular/core';
import { AdminComponent } from './pages/admin/admin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [SharedModule]
})
export class AdminModule {}
