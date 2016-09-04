import { EventEmitter, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import { PaginationService } from './pagination_service';
export interface IPaginationModel {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}
export declare abstract class AbstractPaginationSubComponent {
    protected service: PaginationService;
    name: string;
    model: IPaginationModel;
    constructor(service: PaginationService);
}
export declare class MdPaginationRange extends AbstractPaginationSubComponent {
    protected service: PaginationService;
    mdPaginationRange: boolean;
    html: string;
    name: string;
    model: IPaginationModel;
    rangeFormat: string;
    value: string;
    constructor(service: PaginationService);
    getFormattedValue(rangeStart: number, rangeStop: number, totalItems: number): string;
    getRange(): string;
}
export declare class MdPaginationControls extends AbstractPaginationSubComponent {
    protected service: PaginationService;
    mdPaginationControls: boolean;
    name: string;
    model: IPaginationModel;
    constructor(service: PaginationService);
    isFirstPage(): boolean;
    isLastPage(): boolean;
    previousPage(): void;
    nextPage(): void;
    changePage(newPage: number): void;
}
export declare class MdPaginationItemsPerPage extends AbstractPaginationSubComponent {
    protected service: PaginationService;
    mdPaginationItemsPerPage: boolean;
    hidden: boolean;
    name: string;
    model: IPaginationModel;
    itemsPerPageBefore: string;
    itemsPerPageAfter: string;
    itemsPerPageOptions: Array<number>;
    constructor(service: PaginationService);
    changePaginationLength(value: any): void;
}
export interface IPaginationChange {
    name: string;
    target: string;
    pagination: IPaginationModel;
}
export declare class MdPagination implements AfterContentInit, AfterViewInit {
    private service;
    private element;
    mdPagination: boolean;
    name: string;
    model: IPaginationModel;
    range: boolean;
    rangeFormat: string;
    controls: boolean;
    itemsPerPage: boolean;
    itemsPerPageBefore: string;
    itemsPerPageAfter: string;
    itemsPerPageOptions: Array<number>;
    onPaginationChange: EventEmitter<IPaginationChange>;
    defaultDisplay: boolean;
    constructor(service: PaginationService, element: ElementRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
}
