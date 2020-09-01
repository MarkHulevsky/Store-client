import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent, tokenGetter } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './modules/account/account.module';
import { AuthGuard } from './services/guards/auth-guard.service';
import { UserModule } from './modules/user/user.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AdministratorModule } from './modules/administrator/administrator.module';
import { JwtInterceptor } from './interceptor/jwt-interceptor';
import { Constants } from './models/constants/constants';
import { CookieHelper } from './helpers/cookie.helper';
import { StorageHelper } from './helpers/storage.helper';
import { PrintingEditionModule } from './modules/printing-edition/printing-edition.module';
import { PipeModule } from './modules/pipe/pipe.module';
import { CartIconComponent } from 'src/app/components/shared/cart-icon/cart-icon.component';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartIconComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    AppRoutingModule,
    AccountModule,
    UserModule,
    AdministratorModule,
    PrintingEditionModule,
    CartModule,
    HttpClientModule,
    FormsModule,
    MatBadgeModule,
    MatSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.apiUrl],
        blacklistedRoutes: []
      }
    }),
    BrowserAnimationsModule,
    PipeModule,
    MatTableModule,
    MatSidenavModule,
    OrderModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    Constants,
    CookieHelper,
    StorageHelper,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
