import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from './env';
import {AuthenticationService} from '../service/authentication';

@Injectable()
export class OrderService {
    data: any;
    host: any;
    userdata: any;
    cbData: any;

    constructor(private http: Http, private env: Env, private auth: AuthenticationService, private router: Router) {
        this.host = this.env.getHost();
        this.userdata = auth.getAuth();
    }

    getAll(query) {
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let productIds = [];
            let distributorIds = [];
            let spIds = [];

            for (var p = 0; p < query.products.length; p ++){
                productIds.push(query.products[p].id);
            }

            for (var d = 0; d < query.distributors.length; d ++){
                distributorIds.push(query.distributors[d].id);
            }

            for (var s = 0; s < query.sps.length; s ++){
                 spIds.push(query.sps[s].id);
            }

            let queryBody ={
            productIds: productIds,
            distributorIds: distributorIds,
            spIds: spIds,
            startDate: query.startDate,
            endDate: query.endDate,
            currentPage: query.currentPage,
            queryType: query.queryType
            } 


            let body = JSON.stringify(queryBody);

            this.http.post(this.host + '/reports', body, options)
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

    export() {
        return new Promise(resolve => {
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.userdata.token,
            'username': this.userdata.username
            });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(
                    {productIds: [4]}
                    );
            this.http.post(this.host + '/export', body, options)
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


