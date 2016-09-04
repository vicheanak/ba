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
import {ViewerService} from '../service/viewer';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
moduleId: module.id,
selector: 'app-outlet',
templateUrl: 'viewer.component.html',
styleUrls: ['viewer.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox, AlertComponent],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS, ViewerService]
})

export class ViewerComponent implements OnInit {
    @ViewChild('delete') delete;
    @ViewChild('create') create;
    viewers: any;
    data: any;
    viewer: any = {};
    state: any;
    deletedViewer: any;
    popuptitle: any;
    response: any = {};
    message: any;
    isFaded: any = false;
    userdata: any;
    nameMessage: any;
    usernameMessage: any;
    passwordMessage: any;
    isValid: boolean;

    constructor(private router: Router, private navService: NavService, private auth: AuthenticationService, private viewerService: ViewerService) {
    }

    closeDialog(isSubmit: boolean){
        if (isSubmit){
            this.isValid = true;
            if (!this.viewer.name){
                this.nameMessage = 'Name must be filled';
                this.isValid = false;
            }
            else{
                this.nameMessage = '';
            }

            if (!this.viewer.username){
                this.usernameMessage = 'Username must be filled';
                this.isValid = false;
            }
            else{
                this.usernameMessage = '';
            }

            if (!this.viewer.password){
                if (this.state == 'create'){
                    this.passwordMessage = 'Password must be filled';
                    this.isValid = false;
                }
            }
            else{
                this.passwordMessage = '';
            }


            if(this.isValid){
                this.create.close(isSubmit);
            }
        }
        else{
           this.nameMessage = '';
           this.usernameMessage = '';
           this.passwordMessage = '';
           this.create.close(isSubmit);
        }
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.userdata = this.auth.getAuth();
        this.viewerService.getAll().then((viewers) => {
            this.viewers = viewers;
        });
    }

    closePopup(value: boolean){
        if (value){
            switch (this.state) {
                case 'create': 
                    this.viewerService.insert(this.viewer).then(viewer => {
                        this.response = viewer;
                        if (this.response.errors){
                            this.message = this.response.errors[0].message;
                            this.isFaded = true;
                            setTimeout(() => {
                                this.isFaded = false;
                            }, 3000);
                        }
                        else{
                            this.viewers.push(viewer);
                        }
                    });
                    break;
                case 'edit':
                    this.viewerService.update(this.viewer).then(viewer => {
                        this.response = viewer;
                        if (this.response.error){
                            for (var v = 0; v < this.viewers.length; v ++){
                                if (this.viewers[v].id == this.response.data.id){
                                    this.viewers[v] = this.response.data;
                                }
                            }
                            this.message = this.response.error.errors[0].message;
                            this.isFaded = true;
                            setTimeout(() => {
                                this.isFaded = false;
                            }, 3000);
                        }
                    });
                    break;
                case 'delete':
                    this.viewerService.delete(this.viewer).then(viewer => {
                        this.deletedViewer = viewer;
                        this.viewers = _.without(this.viewers, _.findWhere(this.viewers, {
                            'id': this.deletedViewer.id
                        }));
                    })
                    break;
            }
        }
        this.viewer = {};
    }

    showCreate(){
        this.state = 'create';
        this.popuptitle = 'Create';
        this.create.show();
    }

    showDelete(viewer){
        this.state = 'delete';
        this.viewer = viewer;
        this.delete.show();
    }

    showEdit(viewer){
        this.state = 'edit';
        this.popuptitle = 'Edit';
        this.viewer = viewer;
        this.create.show();
    }

}
