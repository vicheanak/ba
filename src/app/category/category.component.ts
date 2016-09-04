//Place this at the top near your imports
/// <reference path="../../../typings/globals/underscore/index.d.ts" />

import { Component, OnInit, ViewChild } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import * as _ from 'underscore';
import {FORM_DIRECTIVES, FORM_PROVIDERS} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';

@Component({
moduleId: module.id,
selector: 'app-category',
templateUrl: 'category.component.html',
styleUrls: ['category.component.css'],
directives: [MdToolbar, MATERIAL_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox],
providers: [MATERIAL_PROVIDERS, FORM_PROVIDERS]
})
export class CategoryComponent implements OnInit {

    @ViewChild('delete') delete;
    @ViewChild('create') create;
    categories: any;
    selectedCategory: any;
    category: any;
    state: any;

    constructor() {
        this.selectedCategory = {_id: '', name: '', promotion: 0, star: false};
        this.category = {name: '', promotion: '', star: ''};
        this.categories = [
        {_id: '1', name: 'VISO Pises', promotion: 15, star: false, active: true},
        {_id: '2', name: 'Knorr Chicken Powder', promotion: 10, star: true, active: true},
        {_id: '3', name: 'Clear Men Blue', promotion: 20, star: false, active: false},
        {_id: '4', name: 'Sunlight Lemon', promotion: 20, star: false, active: true}
        ];
    }

    ngOnInit() {

    }

    closePopup(value: boolean){
        if (value){
            switch (this.state) {
                case 'create': 
                    this.categories.push({
                        _id: Math.floor(Math.random() * 999).toString(),
                        name: this.category.name,
                        promotion: this.category.promotion,
                        star: this.category.star,
                        active: this.category.active
                    });
                    break;
                case 'edit':

                    break;
                case 'delete':
                    this.categories = _.without(this.categories, _.findWhere(this.categories, {
                        '_id': this.category._id
                    }));
                    break;
            }
        }
        this.category = {};
    }

    showCreate(){
        this.state = 'create';
        this.create.show();
    }

    showDelete(category){
        this.state = 'delete';
        this.category = category;
        this.delete.show();
    }

    showEdit(category){
        this.state = 'edit';
        this.category = category;
        this.create.show();
    }
}
