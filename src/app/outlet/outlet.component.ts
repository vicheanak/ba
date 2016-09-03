import { Component, OnInit, ViewChild } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import * as _ from 'underscore';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {Router} from '@angular/router';
import {NavService} from '../nav.service';
import {AuthenticationService} from '../service/authentication';
import {OutletService} from '../service/outlet';
import {DistributorService} from '../service/distributor';
import {SELECT_DIRECTIVES, SelectComponent} from 'ng2-select/ng2-select';



@Component({
moduleId: module.id,
selector: 'app-outlet',
templateUrl: 'outlet.component.html',
styleUrls: ['outlet.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox, SELECT_DIRECTIVES],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS, OutletService, DistributorService]
})

export class OutletComponent implements OnInit {
    @ViewChild('delete') delete;
    @ViewChild('create') create;
    selectedOutlet: any;
    outlet: any = {};
    state: any;
    data: any;
    outlets: any;
    cbData: any;
    popuptitle: any;
    deletedOutlet: any;
    distributor: any;
    distributors: any;
    outletIndex: any;
    userdata: any;
    distributorMessage: any;
    outletCodeMessage: any;
    outletNameMessage: any;
    outletNameKhMessage: any;
    isValid: boolean;

    constructor(private router: Router, private navService: NavService, private auth: AuthenticationService, private outletService: OutletService, private distributorService: DistributorService) {
    }

    closeDialog(isSubmit: boolean){
        if (isSubmit){
            this.isValid = true;

            if (this.distributor == 0){
                this.distributorMessage = 'Distributor must be selected';
                this.isValid = false;
            }
            else{
                this.distributorMessage = '';
            }

            if (!this.outlet.outletCode){
                this.outletCodeMessage = 'Outlet code must be filled';
                this.isValid = false;
            }
            else{
                this.outletCodeMessage = '';
            }

            if (!this.outlet.outletName){
                this.outletNameMessage = 'Outlet Name must be filled';
                this.isValid = false;
            }
            else{
                this.outletNameMessage = '';
            }

            if (!this.outlet.outletNameKh){
                this.outletNameKhMessage = 'Outlet Name in Khmer must be filled';
                this.isValid = false;
            }
            else{
                this.outletNameKhMessage = '';
            }

            if(this.isValid){
                this.create.close(isSubmit);
            }
        }
        else{
           this.outletCodeMessage = '';
           this.outletNameMessage = '';
           this.outletNameKhMessage = '';
           this.distributorMessage = '';
           this.create.close(isSubmit);
        }
    }

    closePopup(value: boolean){
        console.log('close');
        if (value){
            switch (this.state) {
                case 'create': 
                    this.outlet.DistributorId = this.distributor;
                    this.outletService.insert(this.outlet).then(outlet => {
                        var dt =  _.findWhere(this.distributors, {'id': parseInt(this.distributor)});
                        outlet['Distributor'] = dt;
                        this.outlets.push(outlet);
                    });
                    break;
                case 'edit':
                    this.outlet.DistributorId = this.distributor;
                    var dt =  _.findWhere(this.distributors, {'id': parseInt(this.distributor)});
                    var oid = _.findIndex(this.outlets, (outletIndex) => { 
                        this.outletIndex = outletIndex;
                        return this.outletIndex['id'] == this.outlet.id; 
                    });
                    this.outlets[oid]['Distributor'] = dt;
                    this.outletService.update(this.outlet).then(outlet => {});
                    break;
                case 'delete':
                    this.outletService.delete(this.outlet).then(outlet => {
                        this.deletedOutlet = outlet;
                        this.outlets = _.without(this.outlets, _.findWhere(this.outlets, {
                            'id': this.deletedOutlet.id
                        }));
                    })
                    break;
            }
        }
        this.outlet = {};
    }

    showCreate(){
        this.state = 'create';
        this.popuptitle = 'Create';
        this.create.show();
        this.distributor = 0;
    }

    showDelete(outlet){
        this.state = 'delete';
        this.outlet = outlet;
        this.delete.show();
    }

    showEdit(outlet){
        this.state = 'edit';
        this.popuptitle = 'Edit';
        this.outlet = outlet;
        this.create.show();
        this.distributor = this.outlet.DistributorId;
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.userdata = this.auth.getAuth();
        this.outletService.getAll().then((outlets) => {
            this.outlets = outlets;
        });
        this.distributorService.getAll().then((distributors) => {
            this.distributors = distributors;
            var dt =  _.findWhere(this.distributors, {'id': 1});
            console.log('dt', dt);
        });
    }

    getDistributor(id){
         
    }

    remote(){
        // this.selectedDistributor = 1;
        // console.log('Distributor', this.selectedDistributor);
    }

}
