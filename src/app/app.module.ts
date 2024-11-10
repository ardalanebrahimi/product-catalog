import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { AdminAreaModule } from './admin-area/admin-area.module';
import { CustomerAreaModule } from './customer-area/customer-area.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, NotificationComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    AdminAreaModule,
    CustomerAreaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
