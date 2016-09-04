"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var toolbar_1 = require('@angular2-material/toolbar');
var ng2_material_1 = require('ng2-material');
var _ = require('underscore');
var forms_1 = require('@angular/forms');
var input_1 = require('@angular2-material/input');
var checkbox_1 = require('@angular2-material/checkbox');
var outlet_1 = require('../service/outlet');
var OutletComponent = (function () {
    function OutletComponent(router, navService, auth, outletService) {
        this.router = router;
        this.navService = navService;
        this.auth = auth;
        this.outletService = outletService;
        this.outlet = {};
    }
    OutletComponent.prototype.closePopup = function (value) {
        var _this = this;
        if (value) {
            switch (this.state) {
                case 'create':
                    this.outletService.insert(this.outlet).then(function (outlet) {
                        _this.outlets.push(outlet);
                    });
                    break;
                case 'edit':
                    this.outletService.update(this.outlet).then(function (data) { });
                    break;
                case 'delete':
                    this.outletService.delete(this.outlet).then(function (outlet) {
                        _this.deletedOutlet = outlet;
                        _this.outlets = _.without(_this.outlets, _.findWhere(_this.outlets, {
                            'id': _this.deletedOutlet.id
                        }));
                    });
                    break;
            }
        }
        this.outlet = {};
    };
    OutletComponent.prototype.showCreate = function () {
        this.state = 'create';
        this.popuptitle = 'Create';
        this.create.show();
    };
    OutletComponent.prototype.showDelete = function (outlet) {
        this.state = 'delete';
        this.outlet = outlet;
        this.delete.show();
    };
    OutletComponent.prototype.showEdit = function (outlet) {
        this.state = 'edit';
        this.popuptitle = 'Edit';
        this.outlet = outlet;
        this.create.show();
    };
    OutletComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.navService.changeNav(this.router.url);
        this.auth.isAuth().then(function (data) {
            _this.data = data;
            if (_this.data.err) {
                _this.router.navigate(['/login']);
            }
            else {
                _this.outletService.getAll().then(function (outlets) {
                    _this.outlets = outlets;
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('delete')
    ], OutletComponent.prototype, "delete");
    __decorate([
        core_1.ViewChild('create')
    ], OutletComponent.prototype, "create");
    OutletComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-outlet',
            templateUrl: 'outlet.component.html',
            styleUrls: ['outlet.component.css'],
            directives: [toolbar_1.MdToolbar, ng2_material_1.MATERIAL_DIRECTIVES, forms_1.FORM_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES, checkbox_1.MdCheckbox],
            providers: [ng2_material_1.MATERIAL_PROVIDERS, forms_1.FORM_PROVIDERS, outlet_1.OutletService]
        })
    ], OutletComponent);
    return OutletComponent;
}());
exports.OutletComponent = OutletComponent;
