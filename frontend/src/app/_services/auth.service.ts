import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(personnel_username: string, personnel_password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        personnel_username,
        personnel_password,
      },
      httpOptions
    );
  }

  register(
      // username: string, 
      // email: string, 
      // password: string
      personnel_fname: string,
      personnel_lname: string,
      personnel_caedID: string,
      personnel_phone: string,
      personnel_email: string,
      personnel_username: string,
      personnel_password: string,
      personnel_img: string
    ): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        // username,
        // email,
        // password,
        personnel_fname,
        personnel_lname,
        personnel_caedID,
        personnel_phone,
        personnel_email,
        personnel_username,
        personnel_password,
        personnel_img
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}