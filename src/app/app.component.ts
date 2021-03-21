import { Component } from '@angular/core';

@Component({
  selector: 'careers-root',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <careers-header></careers-header>
      </nb-layout-header>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
      <nb-layout-footer fixed>
        <careers-footer></careers-footer>
      </nb-layout-footer>
    </nb-layout>
  `
})
export class AppComponent {}
