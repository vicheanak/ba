import { Component, OnInit } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-promotion',
  templateUrl: 'promotion.component.html',
  styleUrls: ['promotion.component.css'],
  directives: [MdToolbar]
})
export class PromotionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
