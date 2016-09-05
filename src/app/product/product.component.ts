import { Component, OnInit, ViewChild } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import * as _ from 'underscore';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {Router} from '@angular/router';
import {NavService} from '../nav.service';
import {AuthenticationService} from '../service/authentication';
import {ProductService} from '../service/product';

@Component({
moduleId: module.id,
selector: 'app-product',
templateUrl: 'product.component.html',
styleUrls: ['product.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS, ProductService]
})
export class ProductComponent implements OnInit {

    @ViewChild('delete') delete;
    @ViewChild('create') create;
    selectedProduct: any;
    product: any;
    state: any;
    data: any;
    products: any;
    cbData: any;
    popuptitle: any;
    deletedProduct: any;
    userdata: any;
    inventoryCodeMessage: any;
    nameMessage: any;
    nameKhMessage: any;
    unitKhMessage: any;
    piecesMessage: any;
    priceMessage: any;
    isValid: boolean;

    constructor(private router: Router, private navService: NavService, private auth: AuthenticationService, private productService: ProductService) {
        this.selectedProduct = {id: '', name: '', promotion: 0, star: false};
        this.product = {name: '', promotion: '', star: ''};
    }

    closeDialog(isSubmit: boolean){
        if (isSubmit){
            this.isValid = true;
            if (!this.product.inventoryCode){
                this.inventoryCodeMessage = 'Inventory code must be filled';
                this.isValid = false;
            }
            else{
                this.inventoryCodeMessage = '';
            }

            if (!this.product.name.trim()){
                this.nameMessage = 'Name must be filled';
                this.isValid = false;
            }
            else{
                this.nameMessage = '';
            }

            if (!this.product.nameKh.trim()){
                this.nameKhMessage = 'Name in Khmer must be filled';
                this.isValid = false;
            }
            else{
                this.nameKhMessage = '';
            }

            if (!this.product.unitKh.trim()){
                this.unitKhMessage = 'Unit in Khmer must be filled';
                this.isValid = false;
            }
            else{
                this.unitKhMessage = '';
            }

            if (isNaN(+this.product.pieces.trim())){
                this.piecesMessage = 'Piece must be number';
                this.isValid = false;
            }

            if (!this.product.pieces){
                this.piecesMessage = 'Piece must be filled';
                this.isValid = false;
            }

            if (this.product.pieces && !isNaN(+this.product.pieces)){
                this.piecesMessage = '';
            }

            if (isNaN(+this.product.price.trim())){
                this.priceMessage = 'Price must be number';
                this.isValid = false;
            }

            if (!this.product.price.trim()){
                this.priceMessage = 'Price must be filled';
                this.isValid = false;
            }

            if (this.product.price.trim() && !isNaN(+this.product.price.trim())){
                this.priceMessage = '';
            }

            if(this.isValid){
                this.create.close(isSubmit);
            }
        }
        else{
           this.inventoryCodeMessage = '';
           this.nameMessage = '';
           this.nameKhMessage = '';
           this.unitKhMessage = '';
           this.piecesMessage = '';
           this.priceMessage = '';
           this.create.close(isSubmit);
        }
    }

    closePopup(value: boolean){
        if (value){
            switch (this.state) {
                case 'create': 
                    this.productService.insert(this.product).then(product => {
                        this.products.push(product);
                    });
                    break;
                case 'edit':
                    this.productService.update(this.product).then(data => {});
                    break;
                case 'delete':
                    this.productService.delete(this.product).then(product => {
                        this.deletedProduct = product;
                        this.products = _.without(this.products, _.findWhere(this.products, {
                            'id': this.deletedProduct.id
                        }));
                    })
                    break;
            }
        }
        this.product = {};
    }

    showCreate(){
        this.state = 'create';
        this.popuptitle = 'Create';
        this.create.show();
    }

    showDelete(product){
        this.state = 'delete';
        this.product = product;
        this.delete.show();
    }

    showEdit(product){
        this.state = 'edit';
        this.popuptitle = 'Edit';
        this.product = product;
        this.create.show();
    }

    ngOnInit() {
        this.navService.changeNav(this.router.url);
        this.userdata = this.auth.getAuth();
        this.productService.getAll().then((products) => {
            this.products = products;
        });
    }

}
