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
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
moduleId: module.id,
selector: 'app-outlet',
templateUrl: 'setting.component.html',
styleUrls: ['setting.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox, AlertComponent],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS]
})

export class SettingComponent implements OnInit {
    data: any;
    isFaded: any = false;
    message: any;
    messageType: any;
    nameMessage: any;
    oldPasswordMessage: any;
    newPasswordMessage: any;
    user:any;
    modelOldPassword: any;
    modelNewPassword: any;
    res: any;

    constructor(private router: Router, private route: ActivatedRoute, private navService: NavService, private auth: AuthenticationService) {
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
    }


    isValid(){
        var isValid = true;
        if (!this.modelOldPassword){
            this.oldPasswordMessage = 'Old Password must be filled';
            isValid = false;
        }
        else{
            this.oldPasswordMessage = '';
        }

        if (!this.modelNewPassword){
            this.newPasswordMessage = 'New Password must be filled';
            isValid = false;
        }
        else{
            this.newPasswordMessage = '';
        }

        return isValid;
    }

    save(){
        if(this.isValid()){
            let passwords = {oldPassword: this.modelOldPassword, newPassword: this.modelNewPassword};
            this.auth.changePassword(passwords).then((res) => {
                this.res = res;
                if (!this.res.success){
                    this.oldPasswordMessage = this.res.msg; 
                }
            });
        }
    }

}
