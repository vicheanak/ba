import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import {disableDeprecatedForms, provideForms} from '@angular/forms'
import {NavService} from './app/nav.service';
import {AuthenticationService} from './app/service/authentication';
import {Env} from './app/service/env';
import {LocalStorageService, LocalStorageSubscriber} from "angular2-localstorage/LocalStorageEmitter";

if (environment.production) {
  enableProdMode();
}

var appPromise = bootstrap(AppComponent, [
        HTTP_PROVIDERS,
        LocalStorageService,
        NavService,
        Env,
        AuthenticationService,
        APP_ROUTER_PROVIDERS,
        disableDeprecatedForms(),
        provideForms()
]);

LocalStorageSubscriber(appPromise);
