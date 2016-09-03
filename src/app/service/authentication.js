"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// import { LocalStorage, Storage } from 'ionic-angular';
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var WebStorage_1 = require("angular2-localstorage/WebStorage");
var AuthenticationService = (function () {
    function AuthenticationService(http, env) {
        this.http = http;
        this.env = env;
        this.HAS_LOGGED_IN = 'hasLoggedIn';
        this.data = null;
        this.host = this.env.getHost();
    }
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve) {
            console.log('logout');
            _this.userdata = '';
            // this.storage.remove(this.HAS_LOGGED_IN);
            // this.storage.remove('userdata').then( data => {
            //     resolve(data);
            // });
        });
    };
    AuthenticationService.prototype.setUser = function (user) {
        // this.storage.set('userdata', JSON.stringify(user));
    };
    AuthenticationService.prototype.getUser = function () {
        return new Promise(function (resolve) {
            // this.storage.get('userdata').then((value) => {
            //     resolve(JSON.parse(value));
            // });
        });
    };
    AuthenticationService.prototype.getAuth = function () {
        return this.userdata;
    };
    // return a promise
    AuthenticationService.prototype.isAuth = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'token': _this.userdata.token
            });
            var options = new http_1.RequestOptions({ headers: headers });
            var body = JSON.stringify({ username: _this.userdata.username });
            _this.http.post(_this.host + '/islogin', body, options)
                .subscribe(function (data) {
                resolve(data.json());
            }, function (error) {
                resolve({ err: 'Authentication Failed' });
            });
        });
    };
    AuthenticationService.prototype.login = function (credentials) {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            var body = JSON.stringify(credentials);
            _this.http.post(_this.host + '/authenticate', body, options)
                .subscribe(function (data) {
                _this.userdata = data.json();
                resolve(data.json());
            }, function (error) {
                console.log("Oooops!");
            });
        });
    };
    __decorate([
        WebStorage_1.LocalStorage('userdata')
    ], AuthenticationService.prototype, "userdata");
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
