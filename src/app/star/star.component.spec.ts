/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { StarComponent } from './star.component';

describe('Component: Star', () => {
  it('should create an instance', () => {
    let component = new StarComponent();
    expect(component).toBeTruthy();
  });
});
