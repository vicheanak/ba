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
import {DistributorService} from '../service/distributor';
declare var json2csv: any;

@Component({
moduleId: module.id,
selector: 'app-distributor',
templateUrl: 'distributor.component.html',
styleUrls: ['distributor.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS, DistributorService]
})
export class DistributorComponent implements OnInit {
    @ViewChild('delete') delete;
    @ViewChild('create') create;
    distributor: any = {};
    state: any;
    data: any;
    distributors: any;
    cbData: any;
    popuptitle: any;
    deletedDistributor: any;
    userdata: any;
    dtCodeMessage: any;
    dtNameMessage: any;
    dtNameKhMessage: any;
    isValid: boolean;

    constructor(private router: Router, private navService: NavService, private auth: AuthenticationService, private distributorService: DistributorService) {
        this.distributor = {name: '', promotion: '', star: ''};
    }

    closePopup(value: boolean){
        if (value){
            switch (this.state) {
                case 'create': 
                    this.distributorService.insert(this.distributor).then(distributor => {
                        this.distributors.push(distributor);
                    });
                    break;
                case 'edit':
                    this.distributorService.update(this.distributor).then(data => {});
                    break;
                case 'delete':
                    this.distributorService.delete(this.distributor).then(distributor => {
                        this.deletedDistributor = distributor;
                        this.distributors = _.without(this.distributors, _.findWhere(this.distributors, {
                            'id': this.deletedDistributor.id
                        }));
                    })
                    break;
            }
        }
        this.distributor = {};
    }
    showCreate(){
        this.state = 'create';
        this.popuptitle = 'Create';
        this.create.show();
    }

    showDelete(distributor){
        this.state = 'delete';
        this.distributor = distributor;
        this.delete.show();
    }

    showEdit(distributor){
        this.state = 'edit';
        this.popuptitle = 'Edit';
        this.distributor = distributor;
        this.create.show();
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.userdata = this.auth.getAuth();
        this.distributorService.getAll().then((distributors) => {
            this.distributors = distributors;
        });
    }

    closeDialog(isSubmit: boolean){
        if (isSubmit){
            this.isValid = true;
            if (!this.distributor.dtCode){
                this.dtCodeMessage = 'Distributor code must be filled';
                this.isValid = false;
            }
            else{
                this.dtCodeMessage = '';
            }

            if (!this.distributor.dtName){
                this.dtNameMessage = 'Distributor Name must be filled';
                this.isValid = false;
            }
            else{
                this.dtNameMessage = '';
            }

            if (!this.distributor.dtNameKh){
                this.dtNameKhMessage = 'Distributor Name in Khmer must be filled';
                this.isValid = false;
            }
            else{
                this.dtNameKhMessage = '';
            }


            if(this.isValid){
                this.create.close(isSubmit);
            }
        }
        else{
           this.dtCodeMessage = '';
           this.dtNameMessage = '';
           this.dtNameKhMessage = '';
           this.create.close(isSubmit);
        }
    }

}
