import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Env {
    host: String;
    constructor() {
        this.host = 'http://localhost:3000';
    }
    getHost(){
        return this.host;
    }
}



