import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MdToolbar} from '@angular2-material/toolbar';
import {NavService} from '../nav.service';
import {AuthenticationService} from '../service/authentication';

@Component({
moduleId: module.id,
selector: 'app-dashboard',
templateUrl: 'dashboard.component.html',
styleUrls: ['dashboard.component.css'],
directives: [MdToolbar]
})
export class DashboardComponent implements OnInit {

    data: any;

    constructor(private router: Router, private navService: NavService, private auth: AuthenticationService) { }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.auth.isAuth().then((data) => {
            this.data = data;
            if (this.data.err){
                this.router.navigate(['/login']);
            }
        })
    }

}
