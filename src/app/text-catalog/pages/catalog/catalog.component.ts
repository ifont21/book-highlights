import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  colors: any = [
    { value: '#BC2020', label: 'Careful', selected: false },
    { value: '#348574', label: 'Warning', selected: false },
    { value: '#ECE629', label: 'Good', selected: false }
  ];
  constructor() {}

  getColorSelected(event) {
    // ...
  }
}
