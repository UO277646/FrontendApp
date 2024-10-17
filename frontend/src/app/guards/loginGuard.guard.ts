import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

export const loginGuard: CanActivateFn=(route,state)=>{
    const auth=inject(AuthService);
    let user=sessionStorage.getItem("loggedInUser");
    if(user==null || user==undefined){ 
        auth.signOut();
        return false;
    }else{
        return true;
    }
};