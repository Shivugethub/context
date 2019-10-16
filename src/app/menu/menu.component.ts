import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { ContextMenuItem } from './contextMenu';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  display = false;
  menuItems: ContextMenuItem[];
  addForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.menu();

    this.addForm = this.fb.group({
      articleName: new FormControl(''),
      category: new FormControl('')
    });


  }



  // menu items here
  menu() {
    this.menuItems = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-plus',
        items: [{
          label: 'New',
          icon: 'pi pi-fr pi-plus',
          // routerLink:'/',
          command: (click:any) => {
            this.display = true;
          },
          // items: [
          //   {label: 'Upload'},
          //   {label: 'Other',
          // }]
        }]
      }
    ];
  }


    onAdd() {

    }

}
