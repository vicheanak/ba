import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from './env';
import {AuthenticationService} from '../service/authentication';

@Injectable()
export class ViewerService {
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
            this.http.get(this.host + '/viewers', options)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    getMonthlyOrder(spId){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.host + '/monthly-orders-users/' + spId, options)
                .subscribe(data => {
                    resolve(data.json());
                });
        })
    }

    getUserOutlets(spId){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.host + '/user-outlets-users/' + spId, options)
                .subscribe(data => {
                    resolve(data.json());
                });
        })
    }

    get(spId){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.host + '/viewers/' + spId, options)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    insert(user){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(user);
            this.http.post(this.host + '/viewers', body, options)
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

    update(user){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(user);
            this.http.put(this.host + '/viewers/' + user.id, body, options)
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

    delete(product){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            // let body = JSON.stringify({username: this.userdata.username});
            this.http.delete(this.host + '/viewers/' + product.id, options)
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


