import { NgModule , CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TutorialDetailsPageModule } from './tutorial-details/tutorial-details.module'
import { TutorialsListPageModule } from './tutorials-list/tutorials-list.module'
import { TutorialDetailsPage } from './tutorial-details/tutorial-details.page';
import { TutorialsListPage } from './tutorials-list/tutorials-list.page';
import {map} from 'rxjs/operators';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [AppComponent,TutorialDetailsPage,
  ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
