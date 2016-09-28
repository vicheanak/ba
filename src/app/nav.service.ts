import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthenticationService} from './service/authentication';
import {Router} from '@angular/router';



@Injectable()
export class NavService {

    userData: any;
    // Observable navItem source
    private navItemSource = new BehaviorSubject<string>('report');
    host: String;
    // Observable navItem stream
    navItem$ = this.navItemSource.asObservable();
    constructor(private router: Router, private authenticationService: AuthenticationService){}

    // service command
    changeNav(page) {
        this.authenticationService.isAuth().then((userData) => {
            this.userData = userData;
            if (this.userData.err){
                this.router.navigate(['/login']);
            }
            this.navItemSource.next(page);
        });
    }
}
