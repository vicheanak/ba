import { Component, OnInit, ElementRef } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import * as _ from 'underscore';
import * as moment from 'moment';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {Router} from '@angular/router';
import {NavService} from '../nav.service';
import {AuthenticationService} from '../service/authentication';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {AlertComponent, DATEPICKER_DIRECTIVES, PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {OutletService} from '../service/outlet';
import {DistributorService} from '../service/distributor';
import {SpService} from '../service/sp';
import {ProductService} from '../service/product';
import {OrderService} from '../service/order';
import {RoundPipe} from '../pipe/round';
import 'rxjs/Rx';

@Component({
moduleId: module.id,
selector: 'app-report',
templateUrl: 'report.component.html',
styleUrls: ['report.component.css'],
directives: [AlertComponent, DATEPICKER_DIRECTIVES, SELECT_DIRECTIVES, MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox, PAGINATION_DIRECTIVES],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS, ProductService, OutletService, DistributorService, SpService, OrderService],
pipes: [RoundPipe]
})
export class ReportComponent implements OnInit {

    data: any;
    public dt:Date = new Date();
    // public minDate:Date = void 0;
    public events:Array<any>;
    public formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    public format:string = this.formats[0];
    public dateOptions:any = {
        formatYear: 'YY',
        startingDay: 1
    };
    private opened:boolean = false;
    results: any;
    private start_dt:Date;
    private end_dt:Date;
    private minDate:Date = void 0;
    private showStartDatePicker:boolean = false;
    private showEndDatePicker:boolean = false;
    public distributors: any;
    public distributorItems:Array<Object> = [];
    public sps: any;
    public spItems:Array<Object> = [];
    public products: any;
    public productItems:Array<Object> = [];
    private selectedDistributors: any = [];
    private selectedSps: any = [];
    private selectedProducts: any = [];
    private orders: Object = {};
    maxSize:number = 5;
    totalItems:number;
    currentPage:number;
    totalPages: number;

    constructor(private router: Router, private navService: NavService, private auth: AuthenticationService, private productService: ProductService, private _eref: ElementRef, private outletService: OutletService, private spService: SpService, private distributorService: DistributorService, private orderService: OrderService) {

        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.distributorService.getAll().then(distributors => {
            this.distributors = distributors;
            var arr = [];
            for (var i = 0; i < this.distributors.length; i ++){
                arr.push({id: this.distributors[i]['id'], text: this.distributors[i]['dtName']});
            }
            this.distributorItems = arr;
        });
        this.spService.getAll().then(sps => {
            this.sps = sps;
            var arr = [];
            for (var i = 0; i < this.sps.length; i ++){
                arr.push({id: this.sps[i]['id'], text: this.sps[i]['name']});
            }
            this.spItems = arr;
        });
        this.productService.getAll().then(products => {
            this.products = products;
            var arr = [];
            for (var i = 0; i < this.products.length; i ++){
                arr.push({id: this.products[i]['id'], text: this.products[i]['name']});
            }
            this.productItems = arr;
        });
    }

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)){
            // this.showStartDatePicker = false;
            // this.showEndDatePicker = false;
        }
    }


    toggleStartDatePicker() {
        this.showStartDatePicker = !this.showStartDatePicker;
        this.showEndDatePicker = false;
    }

    toggleEndDatePicker() {
        this.showEndDatePicker = !this.showEndDatePicker;
        this.showStartDatePicker = false;
    }

    onSubmit(currentPage, queryType){
        this.showEndDatePicker = false;
        this.showStartDatePicker = false;
        var query = {
            sps: this.selectedSps,
            distributors: this.selectedDistributors,
            products: this.selectedProducts,
            startDate: this.start_dt ? moment(this.start_dt).format('YYYY-MM-DD') : moment().subtract(30, 'days').format("YYYY-MM-DD HH:mm:ss")
,
            endDate: moment(this.end_dt).format('YYYY-MM-DD'),
            currentPage: currentPage,
            queryType: queryType
        }
        this.orderService.getAll(query).then(orders => {
            this.orders = orders;
            for (var o = 0; o < this.orders['results'].length; o ++){
                this.orders['results'][o]['orderDate'] = moment.utc(this.orders['results'][o]['orderDate']).format('DD/MM/YYYY');
            }
            this.currentPage = this.orders['currentPage'];
            setTimeout(()=>{
                this.totalItems = this.orders['total'];
            });
            this.totalPages = this.orders['totalPages'];

        });
    }


    refreshDistributors(value){
        this.selectedDistributors = value;
    }

    refreshBas(value){
        this.selectedSps = value;
    }

    refreshProducts(value){
        this.selectedProducts = value;
    }


    export(){
        var query = {
            sps: this.selectedSps,
            distributors: this.selectedDistributors,
            products: this.selectedProducts,
            startDate: this.start_dt ? moment(this.start_dt).format('YYYY-MM-DD') : moment().subtract(30, 'days').format("YYYY-MM-DD HH:mm:ss")
,
            endDate: moment(this.end_dt).format('YYYY-MM-DD'),
            currentPage: 1,
            queryType: 'export'
        }
         this.orderService.getAll(query).then(orders => {
             this.results = orders['results'];
             var csvResults = [{
             dtCode: 'Dt Code',
             dtName: 'Dt Name',
             outletCode: 'Outlet Code',
             outletName: 'Outlet Name',
             productName: 'Product Name',
             spName: 'SP Name',
             freeQtyCs: 'Free Qty CS',
             freeQtyPc: 'Free Qty Pc',
             saleQty: 'Sale Qty',
             salePrice: 'Sale Price',
             orderDate: 'Order Date'
             }];
             for (var r = 0; r < this.results.length; r ++){
                 csvResults.push({
                     dtCode: this.results[r].Outlet ? this.results[r].Outlet.Distributor.dtCode + '' : '5024',
                     dtName: this.results[r].Outlet ? this.results[r].Outlet.Distributor.dtName + '' : 'Bot Bunly Distributor',
                     outletCode: this.results[r].Outlet ? this.results[r].Outlet.outletCode + '' : '1655280',
                     outletName: this.results[r].Outlet ? this.results[r].Outlet.outletName + '' : 'Che Phea',
                     productName: this.results[r].Product.name + '',
                     spName: this.results[r].User.name + '',
                     freeQtyCs: Math.round((this.results[r].amount / this.results[r].Product.freeInQty) / this.results[r].Product.pieces * 100) / 100 + '',
                     freeQtyPc: Math.round((this.results[r].amount / this.results[r].Product.freeInQty) * 100) / 100 + '',
                     saleQty: this.results[r].amount + '',
                     salePrice: Math.round((this.results[r].amount * this.results[r].Product.price) * 100) / 100  + '',
                     orderDate: moment.utc(this.results[r].orderDate).format('MM/DD/YYYY')
                 })
             }
             moment(this.start_dt).format('YYYY-MM-DD');

             var jsonObject = JSON.stringify(csvResults);
             var csv = this.convertToCSV(jsonObject);
             this.download(csv);
         });
         // this.orderService.export().then((file) => {
         // });
    }

    convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ';'
                    line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }

    download(data){
        // var blob = new Blob([data]);
        // if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        //     window.navigator.msSaveBlob(blob, "filename.csv");
        // else
        // {
        //     var a = window.document.createElement("a");
        //     a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
        //     a.download = "filename.csv";
        //     document.body.appendChild(a);
        //     a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        //     document.body.removeChild(a);
        // }

        var csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'});
        var csvURL = window.URL.createObjectURL(csvData);
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'ActiveEvent_data.csv');
        tempLink.click();

        // var blob = new Blob([data], { type: 'text/txt' });
        // var url= window.URL.createObjectURL(blob);
        // window.open(url);
    }



    pageChanged() {
        this.onSubmit(this.currentPage, 'page');
    };
}

