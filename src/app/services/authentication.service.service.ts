import { UserForRegistrationDto } from 'src/app/interfaces/user/userForRegistrationDto.model'; 
import { RegistrationResponseDto } from 'src/app/interfaces/response/registrationResponseDto.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserForAuthenticationDto } from '../interfaces/user/userForAuthenticationDto.model';
import { AuthResponseDto } from '../interfaces/response/authResponseDto.model';
import { bootstrapApplication } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public registerUser = (body: UserForRegistrationDto) => {
    
    localStorage.setItem("registeredUser", JSON.stringify(body));
    
    return true;
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
     
  }
}