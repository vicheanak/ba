import { Component, OnInit } from '@angular/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {Router} from '@angular/router';
import {NavService} from '../nav.service';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import {AuthenticationService} from '../service/authentication';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES],
  providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS]
})
export class LoginComponent implements OnInit {
    user: any = {};
    message: any;
    data: any;

    constructor(private navService: NavService, private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {
      this.navService.changeNav(this.router.url);
  }

  signin(){
      this.message = '';
      this.auth.login(this.user).then(data => {
          this.data = data;
           console.log(this.data);
           if (!this.data.err){
               this.router.navigate(['/report']);
           }
           else{
                this.message = this.data.err;
           }
      });
  }

}
