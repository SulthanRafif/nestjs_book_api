import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('data user ', user);

    console.log('role 1', roles)
    console.log('role 2', user.role)
    console.log(this.matchRoles(roles, user.role))

    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: string[], userRole): boolean {
    return roles.includes(userRole);
  }
}
