//Place this at the top near your imports
/// <reference path="../../typings/globals/underscore/index.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import * as moment from 'moment';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import * as _ from 'underscore';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {NavService}   from './nav.service';
import {Subscription} from 'rxjs/Subscription';
import {MdToolbar} from '@angular2-material/toolbar';
import {AuthenticationService} from './service/authentication';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
      MATERIAL_DIRECTIVES,
      AlertComponent,
      ROUTER_DIRECTIVES,
      MD_SIDENAV_DIRECTIVES,
      MdToolbar
  ],
  providers: [
      MATERIAL_PROVIDERS
  ]
})
export class AppComponent {
    @ViewChild('logoutDialog') logoutDialog;
    title = moment().format();
    googleUrl: string = 'https://www.google.com';
    title1: string = 'Button';
    title4: string = 'Warn';
    isDisabled: boolean = true;
    routes: Object[] = [
    {icon: 'assignment', link: '/report', label: 'Report'},
    {icon: 'shopping_basket', link: '/product', label: 'Product'},
    {icon: 'domain', link: '/distributor', label: 'Distributor'},
    {icon: 'store', link: '/outlet', label: 'Outlet'},
    {icon: 'supervisor_account', link: '/sp', label: 'SP'},
    {icon: 'visibility', link: '/viewer', label: 'Viewer'},
    {icon: 'settings', link: '/setting', label: 'Setting'},
    ];
    currentPage: string;
    subscription: Subscription;
    isLogin: boolean = true;
    item: any;

    constructor(private navService:NavService, private router: Router, private authenticationService: AuthenticationService){
    }

    ngOnInit(){
    }

    ngAfterViewInit(){
        this.subscription = this.navService.navItem$.subscribe(item =>{
            setTimeout(()=>{
                this.isLogin = true;
            })
            this.item = item;
            if (this.item == '/login'){
                setTimeout(()=>{
                    this.isLogin = false;
                })
            }
            this.currentPage = item;
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    linkClicked(route){

    }

    setPageTitle(label){
        this.currentPage = label;
    }

    showLogoutPopup(isSubmit){
         event.preventDefault();
         this.logoutDialog.show();
    }

    logout(isSubmit){
        if (isSubmit){
            this.authenticationService.logout().then(data => {
                if (data == 'logout'){
                    this.router.navigate(['/login']);
                }
            });
        }
    }

}

