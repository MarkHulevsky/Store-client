import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './modules/account/account.module';
import { AuthGuard, tokenGetter } from './services/auth-guard.service';
import { UserModule } from './modules/user/user.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AdministratorModule } from './modules/administrator/administrator.module';
import { RoleGuard } from './services/role-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    UserModule,
    AdministratorModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: []
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
