"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var OutletService = (function () {
    function OutletService(http, env, auth, router) {
        this.http = http;
        this.env = env;
        this.auth = auth;
        this.router = router;
        this.host = this.env.getHost();
        this.userdata = auth.getAuth();
    }
    OutletService.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json'
            });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.get(_this.host + '/outlets', options)
                .subscribe(function (data) {
                resolve(data.json());
            });
        });
    };
    OutletService.prototype.get = function (productId) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json'
            });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.get(_this.host + '/outlets/' + productId, options)
                .subscribe(function (data) {
                resolve(data.json());
            });
        });
    };
    OutletService.prototype.insert = function (product) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'token': _this.userdata.token,
                'username': _this.userdata.username
            });
            var options = new http_1.RequestOptions({ headers: headers });
            var body = JSON.stringify(product);
            _this.http.post(_this.host + '/outlets', body, options)
                .subscribe(function (data) {
                _this.cbData = data.json();
                if (_this.cbData.success == false) {
                    _this.router.navigate(['/login']);
                }
                else {
                    resolve(data.json());
                }
            });
        });
    };
    OutletService.prototype.update = function (product) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'token': _this.userdata.token,
                'username': _this.userdata.username
            });
            var options = new http_1.RequestOptions({ headers: headers });
            var body = JSON.stringify(product);
            _this.http.put(_this.host + '/outlets/' + product.id, body, options)
                .subscribe(function (data) {
                _this.cbData = data.json();
                if (_this.cbData.success == false) {
                    _this.router.navigate(['/login']);
                }
                else {
                    resolve(data.json());
                }
            });
        });
    };
    OutletService.prototype.delete = function (product) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'token': _this.userdata.token,
                'username': _this.userdata.username
            });
            var options = new http_1.RequestOptions({ headers: headers });
            // let body = JSON.stringify({username: this.userdata.username});
            _this.http.delete(_this.host + '/outlets/' + product.id, options)
                .subscribe(function (data) {
                _this.cbData = data.json();
                if (_this.cbData.success == false) {
                    _this.router.navigate(['/login']);
                }
                else {
                    resolve(data.json());
                }
            });
        });
    };
    OutletService = __decorate([
        core_1.Injectable()
    ], OutletService);
    return OutletService;
}());
exports.OutletService = OutletService;
