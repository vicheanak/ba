import { Component, OnInit } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import * as _ from 'underscore';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {Router} from '@angular/router';
import {NavService} from '../nav.service';
import {AuthenticationService} from '../service/authentication';
import {SpService} from '../service/sp';


@Component({
moduleId: module.id,
selector: 'app-outlet',
templateUrl: 'sp.component.html',
styleUrls: ['sp.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS, SpService]
})

export class SpComponent implements OnInit {
    sps: any;
    data: any;
    userdata: any;

    constructor(private router: Router, private navService: NavService, private auth: AuthenticationService, private spService: SpService) {
    }

    create(){
        this.router.navigate(['/sp/create']);
    }


    edit(sp){
        this.router.navigate(['/sp/edit/', sp.id]);
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.userdata = this.auth.getAuth();
        this.spService.getAll().then((sps) => {
            this.sps = sps;
        });
    }

}
