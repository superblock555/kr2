import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserForRegistrationDto } from 'src/app/interfaces/user/userForRegistrationDto.model';
import { AuthenticationService } from 'src/app/services/authentication.service.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForAuthenticationDto } from '../interfaces/user/userForAuthenticationDto.model';
//import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginError: boolean = false;
  registerForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.registerForm = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(300)]),
      
      password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)])
   
    });
   


    // this.registerForm.get('confirm')?.setValidators([Validators.required,
    //   this.passConfValidator.validateConfirmPassword(this.registerForm.get('password')!)]);
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    console.log(this.registerForm);
    return this.registerForm.get(controlName)?.hasError(errorName)
  }
  public login = (registerFormValue : any) => {
    this.isLoginError = true;
    const formValues = { ...registerFormValue };
    const user: UserForAuthenticationDto = {
      email: formValues.email,
      password: formValues.password
    };
;
  }




  public validateConfirmPassword = (passwordControl: AbstractControl): ValidatorFn => {
    return (confirmationControl: AbstractControl): { [key: string]: boolean } | null => {
  
      const confirmValue = confirmationControl.value;
      const passwordValue = passwordControl.value;

      if (confirmValue === '') {
        return null;
      }

      if (confirmValue !== passwordValue) {
        return { mustMatch: true }; 
      }

      return null;
    };
  }

  public validateDate = (): ValidatorFn => {
    return (dateControl: AbstractControl): { [key: string]: boolean } | null => {
        let dateAsDate = new Date(dateControl.value);

      if(dateAsDate < new Date("1/1/1900")) {
        return { dateToLow: true }; 
      }
      if(dateAsDate > new Date("1/1/2015")) {
        return { dateToHigh: true }; 

      }
      return null;
    };
  }
}