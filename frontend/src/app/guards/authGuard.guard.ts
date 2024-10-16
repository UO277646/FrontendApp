import { inject } from "@angular/core";
import { ActivatedRoute, CanActivateChildFn, CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { ValidatorService } from "../services/validator/validator.service";

export const auth: CanActivateFn=async (route,state)=>{
    const validator=inject(ValidatorService);
    const email=JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
    const proyectId = route.params['id'];
    if(await validator.validateUser(proyectId, email)){
        return true;
    }else{
        return false;
    }
   
};