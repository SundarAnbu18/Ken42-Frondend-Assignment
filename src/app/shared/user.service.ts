import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {


    _id:'',
    name:'',
    designation:'',
    company:'',
    salary:''

  };
users:User[]
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  readonly baseURL = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }


  postEmployee(user:User ) {
    return this.http.post(this.baseURL, user);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  putEmployee(user:User) {
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
