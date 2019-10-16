import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ArticleService } from '../service/appservices/article.service';
import { KbArtilces } from '../Models/articles';
import { Category } from '../Models/category';
import { Pagerinfo } from '../Models/pagerinfo';

import { SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { ContextMenuItem } from '../menu/contextMenu';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  arrData: KbArtilces[] = [];
  allArticles: KbArtilces[] = [];
  arrCat: Category[] = [];
  // arrCategory: Category [] = [];
  arrPager: Pagerinfo[] = [];
  currentPage;
  totalPages;
  itemsPerPage;
  totalItems;
  // cars: Car[];

  selectedArticle: KbArtilces;
  selectedCategory: Category;
  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  menuItems: ContextMenuItem[];
  display = false;
  addForm: FormGroup;
  clearInterId;
  constructor(private _data: ArticleService, private messageService: MessageService, private fb: FormBuilder) {

    // setInterval(() => {
    //   let date= new Date();
    //   console.log('Seconds '+date.getSeconds());
    // }, 1000);

  }



  ngOnInit() {
    this.clearInterId=setInterval(() => {
      let date= new Date();
      console.log('Seconds '+date.getSeconds());
    }, 1000);

    this.getArticles();
    this.menu();
    this.formBuild();
    this.getCategories();

    this.sortOptions = [
      {label: 'Newest First', value: '!createdDate'},
      {label: 'Oldest First', value: 'createdDate'},
      {label: 'Article Name', value: 'articleName'}
    ];
  }

  selectArticles(event: Event, article: KbArtilces) {
    console.log(article);
    this.selectedArticle = article;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onDialogHide() {
    // this.selectedArticle = null;
  }



  // methods
  getArticles() {
    this._data.getAllArticles().subscribe((data: KbArtilces[]) => {
      this.arrData = data;
      console.log(this.arrData);
      this.allArticles = this.arrData["kbArticles"];
      console.log(this.allArticles);

      // this.isPagination = true;
      this.arrPager = this.arrData["pagerInfo"];
      console.log(this.arrPager);
      this.currentPage = this.arrPager["currentPage"];
      this.totalPages = this.arrPager['totalPages'];
      this.itemsPerPage = this.arrPager["itemsPerPage"];
      this.totalItems = this.arrPager["totalItems"];
      console.log(this.totalItems);
    },
    (errMessage:string) => {
      this.messageService.add({severity:'error',summary:'Server Error',detail:'Server Not Responding!'});
    }

    );
  }
  //
  onPage() {
    this.messageService.add({severity:'success',summary:'Server Error',detail:'Server Not Responding!'});
  }

  menu() {
    this.menuItems = [
      {
        label: 'Article',
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


 formBuild() {
  this.addForm = this.fb.group({
    articleName: new FormControl(''),
    categoryId: new FormControl('categoryId')
  });
 }

  getCategories() {
    this._data.getAllcategories().subscribe(
    (cat:Category[]) => {
      this.arrCat = cat;
      console.log(this.arrCat);
    }
    );
  }


 onAdd() {
   console.log(this.addForm.value);
   alert(this.addForm.value.categoryId);
 }

 ngOnDestroy() {
   console.log('destroy');
  // clearInterval(this.clearInterId);
  // setTimeout(() => {
  //   clearInterval(this.clearInterId);
  //   let date= new Date();
  //   console.log('Year '+date.getFullYear());
  //   }, 10000);
 }
}
