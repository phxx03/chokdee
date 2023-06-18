import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    personnel_fname: string,
    personnel_lname: string,
    personnel_caedID: string,
    personnel_phone: string,
    personnel_email: string,
    personnel_username: string,
    personnel_password: string,
    personnel_img: string
  ): Observable<any> {
    // return this.uploadFiles(personnel_img).pipe(
    //   switchMap((uploadEvent: HttpEvent<any>) => {
    //     if (uploadEvent.type === HttpEventType.Response) {
    //       const uploadedFileUrl = uploadEvent.body.fileUrl; // เปลี่ยนตามการตอบกลับจากเซิร์ฟเวอร์ของคุณ
          return this.http.post(
            AUTH_API + 'signup',
            {
              personnel_fname,
              personnel_lname,
              personnel_caedID,
              personnel_phone,
              personnel_email,
              personnel_username,
              personnel_password,
              personnel_img: personnel_img
            },
            httpOptions
          );
      //   } else {
      //     // กรณีที่อัพโหลดยังไม่เสร็จสมบูรณ์
      //     return of(null);
      //   }
      // })
    // );
  }
  
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  uploadFiles(file: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${AUTH_API}upload-image`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    let res =  this.http.request(req).pipe();
    return res
  }

  getFiles(): Observable<any> {
    return this.http.get(`${AUTH_API}`);
  }
}
