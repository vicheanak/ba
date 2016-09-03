import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from './env';
import {AuthenticationService} from '../service/authentication';

@Injectable()
export class OutletService {
    data: any;
    host: any;
    userdata: any;
    cbData: any;

    constructor(private http: Http, private env: Env, private auth: AuthenticationService, private router: Router) {
        this.host = this.env.getHost();
        this.userdata = auth.getAuth();
    }

    getAll() {
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.host + '/outlets', options)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    get(outletId){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.host + '/outlets/' + outletId, options)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    insert(outlet){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(outlet);
            this.http.post(this.host + '/outlets', body, options)
                .subscribe(data => {
                    this.cbData = data.json();
                    if (this.cbData.success == false){
                        this.router.navigate(['/login']);
                    }
                    else{
                        resolve(data.json());
                    }
                });
        });
    }

    update(outlet){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(outlet);
            this.http.put(this.host + '/outlets/' + outlet.id, body, options)
                .subscribe(data => {
                    this.cbData = data.json();
                    if (this.cbData.success == false){
                        this.router.navigate(['/login']);
                    }
                    else{
                        resolve(data.json());
                    }
                });
        });
    }

    delete(outlet){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            // let body = JSON.stringify({username: this.userdata.username});
            this.http.delete(this.host + '/outlets/' + outlet.id, options)
                .subscribe(data => {
                    this.cbData = data.json();
                    if (this.cbData.success == false){
                        this.router.navigate(['/login']);
                    }
                    else{
                        resolve(data.json());
                    }
                });
        });
    }

}


