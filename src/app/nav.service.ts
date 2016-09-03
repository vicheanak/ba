import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthenticationService} from './service/authentication';
import {Router} from '@angular/router';

@Injectable()
export class NavService {

    // Observable navItem source
    private navItemSource = new BehaviorSubject<string>('report');

    // Observable navItem stream
    navItem$ = this.navItemSource.asObservable();
    constructor(private router: Router, private authenticationService: AuthenticationService){}

    // service command
    changeNav(page) {
        // let routes = ['report', 'product', 'distributor', 'outlet', 'sp', 'viewer'];
        // for (var r = 0; r < routes.length; r ++){
        //     if (page.indexOf(routes[r]) > 0){
        //         if (!this.authenticationService.isAuth()){
        //             this.router.navigate(['/login']);
        //         }
        //     }
        // }
        if (!this.authenticationService.isAuth()){
            this.router.navigate(['/login']);
        }
        this.navItemSource.next(page);
    }
}
