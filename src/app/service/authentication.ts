import { Injectable } from '@angular/core';
// import { LocalStorage, Storage } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from './env';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Injectable()
export class AuthenticationService {
    data: any;
    host: String;
    @LocalStorage('userdata') public userdata:any;
    @LocalStorage('HAS_LOGGED_IN') public HAS_LOGGED_IN:any;

    constructor(private http: Http, private env: Env) {
        this.data = null;
        this.host = this.env.getHost();
    }

    logout() {
        return new Promise(resolve => {
            this.userdata = '';
            this.HAS_LOGGED_IN = '';
            resolve('logout');
        });
    }


    getAuth(){
        return this.userdata;
    }

    // return a promise
    isAuth() {
        return this.HAS_LOGGED_IN;
        // return new Promise(resolve => {
        //     let headers = new Headers({
        //     'Content-Type': 'application/json',
        //     'token': this.userdata.token
        //     });
        //     let options = new RequestOptions({ headers: headers });
        //     let body = JSON.stringify({username: this.userdata.username});
        //     this.http.post(this.host + '/islogin', body, options)
        //         .subscribe(data => {
        //             resolve(data.json());
        //         }, error => {
        //             resolve({err: 'Authentication Failed'});
        //         });
        // });
    }

    changePassword(passwords){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(passwords);
            this.http.post(this.host + '/changePassword', body, options)
                .subscribe(data => {
                    resolve(data.json());
                }, error => {
                    console.log({success: false, message: 'Failed authentication'});
                });
        });
    }

    login(credentials) {
        return new Promise(resolve => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(credentials);
            this.http.post(this.host + '/authenticate', body, options)
                .subscribe(data => {
                    this.data = data;
                    if (!this.data.err){
                        this.userdata = data.json();
                        this.HAS_LOGGED_IN = true;
                    }
                    resolve(data.json());
                }, error => {
                    console.log("Oooops!");
                });

        })
    }
}


