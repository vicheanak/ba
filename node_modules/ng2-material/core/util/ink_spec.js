"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require('@angular/core/testing');
var index_1 = require('../../index');
var core_1 = require('@angular/core');
var testing_2 = require('@angular/compiler/testing');
var ink_1 = require('./ink');
var platform_browser_1 = require("@angular/platform-browser");
function main() {
    var defaultTemplate = "<div md-ink></div>";
    var TestComponent = (function () {
        function TestComponent() {
        }
        TestComponent = __decorate([
            core_1.Component({
                selector: 'ink-test-component',
                directives: [index_1.MATERIAL_DIRECTIVES],
                template: defaultTemplate
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    testing_1.describe('Ink', function () {
        var builder;
        var _api = null;
        function setup(template) {
            if (template === void 0) { template = defaultTemplate; }
            return builder
                .overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                _api = fixture;
                return fixture;
            }).catch(console.error.bind(console));
        }
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        afterEach(function () {
            _api.destroy();
        });
        testing_1.describe('canApply', function () {
            testing_1.it('should return true if element does not have md-no-ink attribute', testing_1.async(function () {
                setup("<div></div>")
                    .then(function (api) {
                    var el = api.debugElement.query(platform_browser_1.By.css('div'));
                    testing_1.expect(ink_1.Ink.canApply(el.nativeElement)).toBe(true);
                });
            }));
            testing_1.it('should return true if element does not have md-no-ink attribute', testing_1.async(function () {
                setup("<div md-no-ink></div>")
                    .then(function (api) {
                    var el = api.debugElement.query(platform_browser_1.By.css('div'));
                    testing_1.expect(ink_1.Ink.canApply(el.nativeElement)).toBe(false);
                });
            }));
        });
        testing_1.describe('ripple', function () {
            testing_1.it('should ripple and resolve when the ink animation is done', testing_1.async(function () {
                setup("<div></div>")
                    .then(function (api) {
                    var el = api.debugElement.query(platform_browser_1.By.css('div'));
                    ink_1.Ink.ripple(el.nativeElement, 0, 0).then(function () {
                        ink_1.Ink.ripple(el.nativeElement, 0, 0);
                    });
                });
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=ink_spec.js.map