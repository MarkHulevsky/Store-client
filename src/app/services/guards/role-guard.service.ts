import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Injectable()
export class RoleGuard implements CanActivate {

  private currentUser: User;

  constructor(
    private jwtHalper: JwtHelperService, private router: Router,
    private userService: UserService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('jwt');

    await this.userService.getCurrentUser().toPromise().then((data: User) => {
      this.currentUser = data;
    });

    if (!token || this.jwtHalper.isTokenExpired() ||
      this.currentUser.role != expectedRole
    ) {
      this.router.navigate(['account/sign-in']);
      return false;
    }

    return true;

  }
}
