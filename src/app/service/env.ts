import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Env {
    host: String;
    constructor() {
        this.host = 'https://api.unibookkh.com';
    }
    getHost(){
        return this.host;
    }
}



