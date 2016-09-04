import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import * as _ from 'underscore';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {Router, ActivatedRoute} from '@angular/router';
import {NavService} from '../nav.service';
import {AuthenticationService} from '../service/authentication';
import {SpService} from '../service/sp';
import {ProductService} from '../service/product';
import {OutletService} from '../service/outlet';
import {Subscription} from 'rxjs/Subscription';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
moduleId: module.id,
selector: 'app-outlet',
templateUrl: 'create-sp.component.html',
styleUrls: ['create-sp.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox, AlertComponent],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS, SpService, ProductService, OutletService]
})

export class CreateSpComponent implements OnInit {
    sp: any = {};
    data: any;
    spTitle: any;
    sub: Subscription;
    products: any;
    outlets: any;
    monthlyOrder: any;
    userOutlets: any;
    isSaved: any = false;
    isFaded: any = false;
    saveState: any;
    message: any;
    res: any;
    messageType: any;
    nameMessage: any;
    usernameMessage: any;
    passwordMessage: any;

    constructor(private router: Router, private route: ActivatedRoute, private navService: NavService, private auth: AuthenticationService, private spService: SpService, private productService: ProductService, private outletService: OutletService, private location: Location) {
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.sub = this.route.params.subscribe(params => {
            if (params['id']){
                this.spTitle = 'Edit SP';
                this.saveState = 'edit';
                let id = +params['id']; // (+) converts string 'id' to a number
                this.spService.get(id).then((sp) => {
                    this.sp = sp;
                });
                this.productService.getAll().then(products => {
                    this.products = products;

                    //Products
                    this.spService.getMonthlyOrder(id).then((monthlyOrder) => {
                        this.monthlyOrder = monthlyOrder;
                        for (var p = 0; p < this.products.length; p ++){
                            for (var m = 0; m < this.monthlyOrder.length; m ++){
                                if (this.products[p].id == this.monthlyOrder[m].ProductId){
                                    this.products[p].amount = this.monthlyOrder[m].amount;
                                }
                            }
                        }
                    });

                    //Outlets
                    this.outletService.getAll().then(outlets => {
                        this.outlets = outlets;
                        this.spService.getUserOutlets(id).then((userOutlets) => {
                            this.userOutlets = userOutlets;
                            for (var o = 0; o < this.outlets.length; o ++){
                                for (var u = 0; u < this.userOutlets.length; u ++){
                                    if (this.outlets[o].id == this.userOutlets[u].OutletId){
                                        this.outlets[o].checked = true;
                                    }
                                }
                            }
                        });
                    });

                });
            }
            else{
                this.spTitle = 'Create SP';
                this.saveState = 'create';
                //Products
                this.productService.getAll().then(products => {
                    this.products = products;

                    //Outlets
                    this.outletService.getAll().then(outlets => {
                        this.outlets = outlets;
                    });
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isValid(){
        var isValid = true;
        if (!this.sp.name){
            this.nameMessage = 'Name must be filled';
            isValid = false;
        }
        else{
            this.nameMessage = '';
        }

        if (!this.sp.username){
            this.usernameMessage = 'Username must be filled';
            isValid = false;
        }
        else{
            this.usernameMessage = '';
        }

        if (!this.sp.password){
            if (this.saveState == 'create'){
                this.passwordMessage = 'Password must be filled';
                isValid = false;
            }
        }
        else{
            this.passwordMessage = '';
        }
        return isValid;
    }

    save(){
        if(this.isValid()){
            var user = {sp: this.sp, products: this.products, outlets: this.outlets};
            if (this.saveState == 'edit'){
                this.spService.update(user).then((res) => {
                    this.res = res;
                    if (this.res.error){
                        this.messageType = 'danger';
                        this.message = this.res.error.errors[0].message;
                    }
                    else{
                        this.messageType = 'success';
                        this.message = 'SP successfully updated.';
                    }
                    this.isFaded = true;
                    this.isSaved = true;
                    setTimeout(() => {
                        this.isFaded = false;
                    }, 3000);
                });
            }
            else{
                this.spService.insert(user).then((spId) => {
                    this.res = spId;
                    if (this.res.errors){
                        this.messageType = 'danger';
                        this.message = this.res.errors[0].message;
                    }
                    else{
                        this.sp['id'] = spId;
                        this.messageType = 'success';
                        this.message = 'SP successfully inserted.';
                        this.saveState = 'edit';
                    }
                    this.isSaved = true;
                    this.isFaded = true;
                    setTimeout(() => {
                        this.isFaded = false;
                    }, 3000);
                });
            }
        }
    }

    goBack(){
        this.location.back();
    }
}
