import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from './env';
import {AuthenticationService} from '../service/authentication';

@Injectable()
export class DistributorService {
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
            this.http.get(this.host + '/distributors', options)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    get(productId){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.host + '/distributors/' + productId, options)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    insert(product){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(product);
            this.http.post(this.host + '/distributors', body, options)
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

    update(product){
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(product);
            this.http.put(this.host + '/distributors/' + product.id, body, options)
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
            this.http.delete(this.host + '/distributors/' + product.id, options)
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


