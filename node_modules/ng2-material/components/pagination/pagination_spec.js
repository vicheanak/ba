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
var util_1 = require('../../platform/testing/util');
var testing_1 = require('@angular/core/testing');
var testing_2 = require("@angular/compiler/testing");
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require('./index');
function main() {
    testing_1.describe('Pagination', function () {
        var builder;
        testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        util_1.componentSanityCheck('MdPagination', 'md-pagination', "<md-pagination></md-pagination>");
        testing_1.describe('MdPagination', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.defaultModel = {
                        currentPage: 1,
                        itemsPerPage: 5,
                        totalItems: 24
                    };
                    this.defaultItemsPerPageOptions = [10, 50, 100];
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPagination, index_1.MdPaginationControls, index_1.MdPaginationItemsPerPage, index_1.MdPaginationRange],
                        template: "<md-pagination></md-pagination>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            testing_1.describe('default values', function () {
                testing_1.it('should have a default model', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(0);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(0);
                        testing_1.expect(api.comp.model.totalItems).toEqual(0);
                    });
                }));
                testing_1.it('should accept custom model', testing_1.inject([], function () {
                    return setup("<md-pagination [model]=\"defaultModel\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(1);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(5);
                        testing_1.expect(api.comp.model.totalItems).toEqual(24);
                    });
                }));
                testing_1.it('should have a default name', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('default');
                    });
                }));
                testing_1.it('should accept a custom name', testing_1.inject([], function () {
                    return setup("<md-pagination name=\"book\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('book');
                    });
                }));
                testing_1.it('should display range by default', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.range).toBeTruthy();
                    });
                }));
                testing_1.it('should accept a custom display for range', testing_1.inject([], function () {
                    return setup("<md-pagination [range]=\"false\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.range).toBeFalsy();
                    });
                }));
                testing_1.it('should not have a default rangeFormat', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.rangeFormat).toBeUndefined();
                    });
                }));
                testing_1.it('should accept a custom rangeFormat', testing_1.inject([], function () {
                    return setup("<md-pagination range-format=\"{start}/{total}\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.rangeFormat).toEqual('{start}/{total}');
                    });
                }));
                testing_1.it('should display controls by default', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.controls).toBeTruthy();
                    });
                }));
                testing_1.it('should accept a custom display for controls', testing_1.inject([], function () {
                    return setup("<md-pagination [controls]=\"false\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.controls).toBeFalsy();
                    });
                }));
                testing_1.it('should display items per page options by default', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.itemsPerPage).toBeTruthy();
                    });
                }));
                testing_1.it('should accept a custom display for items per page', testing_1.inject([], function () {
                    return setup("<md-pagination [items-per-page]=\"false\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.itemsPerPage).toBeFalsy();
                    });
                }));
                testing_1.it('should not have a default prepended string to items per page', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageBefore).toBeUndefined();
                    });
                }));
                testing_1.it('should accept a custom prepended string to items per page', testing_1.inject([], function () {
                    return setup("<md-pagination items-per-page-before=\"page:\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageBefore).toEqual('page:');
                    });
                }));
                testing_1.it('should not have a default appended string to items per page', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageAfter).toBeUndefined();
                    });
                }));
                testing_1.it('should accept a custom appended string to items per page', testing_1.inject([], function () {
                    return setup("<md-pagination items-per-page-after=\" - \"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageAfter).toEqual(' - ');
                    });
                }));
                testing_1.it('should not have a default list of options for items per page', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageOptions).toBeUndefined();
                    });
                }));
                testing_1.it('should accept a custom list of options for items per page', testing_1.inject([], function () {
                    return setup("<md-pagination [items-per-page-options]=\"defaultItemsPerPageOptions\"></md-pagination>").then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageOptions).not.toContain(5);
                        testing_1.expect(api.comp.itemsPerPageOptions).toContain(10);
                        testing_1.expect(api.comp.itemsPerPageOptions).toContain(50);
                        testing_1.expect(api.comp.itemsPerPageOptions).toContain(100);
                    });
                }));
            });
            testing_1.describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 2,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                testing_1.beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                testing_1.it('should listen PaginationService', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        api.comp.onPaginationChange.subscribe(function (event) {
                            testing_1.expect(event.name).toEqual('pagination_changed');
                            testing_1.expect(event.target).toEqual('default');
                            testing_1.expect(event.pagination).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                }));
                testing_1.it('should listen PaginationService only for his reference name', testing_1.inject([], function () {
                    return setup("<md-pagination name=\"book\"></md-pagination>").then(function (api) {
                        var spy = jasmine.createSpy('spy');
                        api.comp.onPaginationChange.subscribe(spy);
                        service.onChange.subscribe(function () {
                            testing_1.expect(spy).not.toHaveBeenCalled();
                        });
                        service.change('default', updatedPagination);
                    });
                }));
            });
            testing_1.describe('ngAfterContentInit', function () {
                testing_1.it('should init default components', testing_1.async(testing_1.inject([], function () {
                    return setup().then(function (api) {
                        var element = api.debug.nativeElement;
                        api.fixture.detectChanges();
                        testing_1.expect(element.children.length).toEqual(3);
                    });
                })));
                testing_1.it('should accept custom components as children', testing_1.async(testing_1.inject([], function () {
                    return setup("<md-pagination><button></button></md-pagination>").then(function (api) {
                        var element = api.debug.nativeElement;
                        api.fixture.detectChanges();
                        testing_1.expect(element.children.length).toEqual(1);
                    });
                })));
            });
            testing_1.describe('ngAfterViewInit', function () {
                var service, defaultModel = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                testing_1.beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                    spyOn(service, 'change');
                }));
                testing_1.it('should dispatch his model after init', testing_1.async(testing_1.inject([], function () {
                    return setup("<md-pagination name=\"book\" [model]=\"defaultModel\"></md-pagination>").then(function (api) {
                        testing_1.expect(service.change).toHaveBeenCalled();
                    });
                })));
            });
        });
        util_1.componentSanityCheck('MdPaginationRange', 'md-pagination-range', "<md-pagination-range></md-pagination-range>");
        testing_1.describe('MdPaginationRange', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.page2 = {
                        currentPage: 2,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page3 = {
                        currentPage: 3,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.defaultRangeFormat = '{start}-{end} / {total}';
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPaginationRange],
                        template: "<md-pagination-range></md-pagination-range>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-range'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            testing_1.describe('default values', function () {
                testing_1.it('should have a default model', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(0);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(0);
                        testing_1.expect(api.comp.model.totalItems).toEqual(0);
                    });
                }));
                testing_1.it('should accept custom model', testing_1.inject([], function () {
                    return setup("<md-pagination-range [model]=\"page2\"></md-pagination-range>").then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(2);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(30);
                        testing_1.expect(api.comp.model.totalItems).toEqual(65);
                    });
                }));
                testing_1.it('should have a default name', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('default');
                    });
                }));
                testing_1.it('should accept a custom name', testing_1.inject([], function () {
                    return setup("<md-pagination-range name=\"book\"></md-pagination-range>").then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('book');
                    });
                }));
                testing_1.it('should have a default range format', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.rangeFormat).toEqual('{start}-{end} of {total}');
                    });
                }));
                testing_1.it('should accept a custom range format', testing_1.inject([], function () {
                    return setup("<md-pagination-range [range-format]=\"defaultRangeFormat\"></md-pagination-range>").then(function (api) {
                        testing_1.expect(api.comp.rangeFormat).toEqual('{start}-{end} / {total}');
                    });
                }));
            });
            testing_1.describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                testing_1.beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                testing_1.it('should listen PaginationService', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        service.onChange.subscribe(function (event) {
                            testing_1.expect(api.comp.model).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                }));
                testing_1.it('should listen PaginationService only for his reference name', testing_1.inject([], function () {
                    return setup("<md-pagination-range name=\"book\"></md-pagination-range>").then(function (api) {
                        service.onChange.subscribe(function () {
                            testing_1.expect(api.comp.model).toEqual({
                                currentPage: 0,
                                itemsPerPage: 0,
                                totalItems: 0
                            });
                        });
                        service.change('default', updatedPagination);
                    });
                }));
            });
            testing_1.describe('getFormattedValue', function () {
                testing_1.it('should replace pattern in the range format', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.getFormattedValue(1, 5, 30)).toEqual('1-5 of 30');
                    });
                }));
            });
            testing_1.describe('getRange', function () {
                testing_1.it('should calculate range at the middle', testing_1.inject([], function () {
                    return setup("<md-pagination-range [model]=\"page2\"></md-pagination-range>").then(function (api) {
                        spyOn(api.comp, 'getFormattedValue').and.callThrough();
                        var result = api.comp.getRange();
                        testing_1.expect(result).toEqual('31-60 of 65');
                        testing_1.expect(api.comp.getFormattedValue).toHaveBeenCalledWith(31, 60, 65);
                    });
                }));
                testing_1.it('should calculate range at the end', testing_1.inject([], function () {
                    return setup("<md-pagination-range [model]=\"page3\"></md-pagination-range>").then(function (api) {
                        spyOn(api.comp, 'getFormattedValue').and.callThrough();
                        var result = api.comp.getRange();
                        testing_1.expect(result).toEqual('61-65 of 65');
                        testing_1.expect(api.comp.getFormattedValue).toHaveBeenCalledWith(61, 65, 65);
                    });
                }));
            });
        });
        util_1.componentSanityCheck('MdPaginationControls', 'md-pagination-controls', "<md-pagination-controls></md-pagination-controls>");
        testing_1.describe('MdPaginationControls', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.page1 = {
                        currentPage: 1,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page2 = {
                        currentPage: 2,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page3 = {
                        currentPage: 3,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPaginationControls],
                        template: "<md-pagination-controls></md-pagination-controls>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-controls'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            testing_1.describe('default values', function () {
                testing_1.it('should have a default model', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(0);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(0);
                        testing_1.expect(api.comp.model.totalItems).toEqual(0);
                    });
                }));
                testing_1.it('should accept custom model', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(2);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(30);
                        testing_1.expect(api.comp.model.totalItems).toEqual(65);
                    });
                }));
                testing_1.it('should have a default name', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('default');
                    });
                }));
                testing_1.it('should accept a custom name', testing_1.inject([], function () {
                    return setup("<md-pagination-controls name=\"book\"></md-pagination-controls>").then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('book');
                    });
                }));
            });
            testing_1.describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                testing_1.beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                testing_1.it('should listen PaginationService', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        service.onChange.subscribe(function (event) {
                            testing_1.expect(api.comp.model).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                }));
                testing_1.it('should listen PaginationService only for his reference name', testing_1.inject([], function () {
                    return setup("<md-pagination-controls name=\"book\"></md-pagination-controls>").then(function (api) {
                        service.onChange.subscribe(function () {
                            testing_1.expect(api.comp.model).toEqual({
                                currentPage: 0,
                                itemsPerPage: 0,
                                totalItems: 0
                            });
                        });
                        service.change('default', updatedPagination);
                    });
                }));
            });
            testing_1.describe('isFirstPage', function () {
                testing_1.it('should accept first page as first page', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page1\"></md-pagination-controls>").then(function (api) {
                        testing_1.expect(api.comp.isFirstPage()).toBeTruthy();
                    });
                }));
                testing_1.it('should not accept second page as first page', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        testing_1.expect(api.comp.isFirstPage()).toBeFalsy();
                    });
                }));
            });
            testing_1.describe('isLastPage', function () {
                testing_1.it('should accept third page as last page', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page3\"></md-pagination-controls>").then(function (api) {
                        testing_1.expect(api.comp.isLastPage()).toBeTruthy();
                    });
                }));
                testing_1.it('should not accept second page as last page', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        testing_1.expect(api.comp.isLastPage()).toBeFalsy();
                    });
                }));
            });
            testing_1.describe('previousPage', function () {
                testing_1.it('should call change of page to previous one', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        spyOn(api.comp, 'changePage');
                        api.comp.previousPage();
                        testing_1.expect(api.comp.changePage).toHaveBeenCalledWith(1);
                    });
                }));
            });
            testing_1.describe('nextPage', function () {
                testing_1.it('should call change of page to previous one', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        spyOn(api.comp, 'changePage');
                        api.comp.nextPage();
                        testing_1.expect(api.comp.changePage).toHaveBeenCalledWith(3);
                    });
                }));
            });
            testing_1.describe('changePage', function () {
                var service;
                testing_1.beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                    spyOn(service, 'change');
                }));
                testing_1.it('should dispatch the new current page to the service', testing_1.inject([], function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        api.comp.changePage(1);
                        testing_1.expect(service.change).toHaveBeenCalledWith('default', {
                            currentPage: 1,
                            itemsPerPage: 30,
                            totalItems: 65
                        });
                    });
                }));
            });
        });
        util_1.componentSanityCheck('MdPaginationItemsPerPage', 'md-pagination-items-per-page', "<md-pagination-items-per-page></md-pagination-items-per-page>");
        testing_1.describe('MdPaginationItemsPerPage', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.page1 = {
                        currentPage: 1,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page2 = {
                        currentPage: 2,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.defaultItemsPerPageOptions = [10, 50, 100];
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPaginationItemsPerPage],
                        template: "<md-pagination-items-per-page></md-pagination-items-per-page>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-items-per-page'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            testing_1.describe('default values', function () {
                testing_1.it('should have a default model', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(0);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(0);
                        testing_1.expect(api.comp.model.totalItems).toEqual(0);
                    });
                }));
                testing_1.it('should accept custom model', testing_1.inject([], function () {
                    return setup("<md-pagination-items-per-page [model]=\"page2\"></md-pagination-items-per-page>").then(function (api) {
                        testing_1.expect(api.comp.model.currentPage).toEqual(2);
                        testing_1.expect(api.comp.model.itemsPerPage).toEqual(30);
                        testing_1.expect(api.comp.model.totalItems).toEqual(65);
                    });
                }));
                testing_1.it('should have a default name', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('default');
                    });
                }));
                testing_1.it('should accept a custom name', testing_1.inject([], function () {
                    return setup("<md-pagination-items-per-page name=\"book\"></md-pagination-items-per-page>").then(function (api) {
                        testing_1.expect(api.comp.name).toEqual('book');
                    });
                }));
                testing_1.it('should have a default prepended string', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageBefore).toEqual('Rows per page:');
                    });
                }));
                testing_1.it('should accept a custom prepended string', testing_1.inject([], function () {
                    return setup("<md-pagination-items-per-page items-per-page-before=\"Items per page:\"></md-pagination-items-per-page>").then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageBefore).toEqual('Items per page:');
                    });
                }));
                testing_1.it('should not have a default appended string', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageAfter).toBeUndefined();
                    });
                }));
                testing_1.it('should accept a custom appended string', testing_1.inject([], function () {
                    return setup("<md-pagination-items-per-page items-per-page-after=\" - \"></md-pagination-items-per-page>").then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageAfter).toEqual(' - ');
                    });
                }));
                testing_1.it('should have a empty list of options for items per page', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageOptions).toEqual([]);
                    });
                }));
                testing_1.it('should accept a custom list of options for items per page', testing_1.inject([], function () {
                    return setup("<md-pagination-items-per-page [items-per-page-options]=\"defaultItemsPerPageOptions\"></md-pagination-items-per-page>").then(function (api) {
                        testing_1.expect(api.comp.itemsPerPageOptions).not.toContain(5);
                        testing_1.expect(api.comp.itemsPerPageOptions).toContain(10);
                        testing_1.expect(api.comp.itemsPerPageOptions).toContain(50);
                        testing_1.expect(api.comp.itemsPerPageOptions).toContain(100);
                    });
                }));
            });
            testing_1.describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                testing_1.beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                testing_1.it('should listen PaginationService', testing_1.inject([], function () {
                    return setup().then(function (api) {
                        service.onChange.subscribe(function (event) {
                            testing_1.expect(api.comp.model).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                }));
                testing_1.it('should listen PaginationService only for his reference name', testing_1.inject([], function () {
                    return setup("<md-pagination-items-per-page name=\"book\"></md-pagination-items-per-page>").then(function (api) {
                        service.onChange.subscribe(function () {
                            testing_1.expect(api.comp.model.currentPage).toEqual(0);
                            testing_1.expect(api.comp.model.itemsPerPage).toEqual(0);
                            testing_1.expect(api.comp.model.totalItems).toEqual(0);
                        });
                        service.change('default', updatedPagination);
                    });
                }));
            });
            testing_1.describe('changePaginationLength', function () {
                var service;
                testing_1.beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                    spyOn(service, 'change');
                }));
                testing_1.it('should dispatch page change to the service and reset to first page', testing_1.inject([], function () {
                    return setup("<md-pagination-items-per-page [model]=\"page2\"></md-pagination-items-per-page>").then(function (api) {
                        api.comp.changePaginationLength(50);
                        testing_1.expect(service.change).toHaveBeenCalledWith('default', {
                            currentPage: 1,
                            itemsPerPage: 50,
                            totalItems: 65
                        });
                    });
                }));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=pagination_spec.js.map