import { Component, OnInit } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-star',
  templateUrl: 'star.component.html',
  styleUrls: ['star.component.css'],
  directives: [MdToolbar]
})
export class StarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
