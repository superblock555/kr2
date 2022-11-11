import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserForRegistrationDto } from 'src/app/interfaces/user/userForRegistrationDto.model';
import { AuthenticationService } from 'src/app/services/authentication.service.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterUserComponent {

  registerForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      middleName: new FormControl('', [Validators.maxLength(20)]),

      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(300)]),
      
      password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
      passwordConfirmation: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
      birthDate: new  FormControl('',[this.validateDate])
   
    });
    this.registerForm.get('birthDate')?.setValidators([Validators.required,
      this.validateDate()]);


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
  public registerUser = (registerFormValue : any) => {
    
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      middleName: formValues.middleName,
      birthDate: formValues.birthDate,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    this.authService.registerUser(user);
    this.router.navigate(['/login']);
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