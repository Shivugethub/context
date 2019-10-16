import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { ArticleService } from 'src/app/service/appservices/article.service';
import { KbArtilces } from 'src/app/Models/articles';
import { Pagerinfo } from 'src/app/Models/pagerinfo';
import { Category } from 'src/app/Models/category';

import * as _ from 'lodash';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {
  arrData: KbArtilces[] = [];
  allArticles: KbArtilces[] = [];
  arrPager: Pagerinfo[] = [];
  currentPage;
  totalPages;
  itemsPerPage;
  totalItems;

  arrFetch;
  arrCat: Category[];
  selectedCategory: Category;
  colsArticle: any[];
  editId;
  items: MenuItem[];
  selectedArticle: KbArtilces;
  displayDialog: boolean;
  addEdit: FormGroup;
  display = false;
  isPagination = false;
  page = 1;

  constructor(private _data: ArticleService, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getArticles();

    this.getColsArtilces();
    this.getMenuItems();
    this.formBuild();

  }

  // match with the getArtilces method
  getColsArtilces() {
    this.colsArticle = [
      { field: 'articleName', header: 'Article' },
      { field: 'previewContent', header: 'Preview' },
      { field: 'createdByName', header: 'CreatedBy' },
      { field: 'createdDate', header: 'Date' }
    ];
  }

  getMenuItems() {
    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewArticle(this.selectedArticle) },
      { label: 'Add', icon: 'pi pi-add', command: (event) => this.addArticle() },
      { label: 'Edit', icon: 'pi pi-edit', command: (event) => this.editArticle(this.selectedArticle) }
    ];
  }



  getArticles() {
    this._data.getAllArticles().subscribe((data: KbArtilces[]) => {
      this.arrData = data;
      console.log(this.arrData);
      this.allArticles = this.arrData["kbArticles"];
      console.log(this.allArticles);
      this.isPagination = true;
      this.arrPager = this.arrData["pagerInfo"];
      console.log(this.arrPager);
      this.currentPage = this.arrPager["currentPage"];
      this.totalPages = this.arrPager['totalPages'];
      this.itemsPerPage = this.arrPager["itemsPerPage"];
      this.totalItems = this.arrPager["totalItems"];
      console.log(this.totalItems);
    },
      (errMessage: string) => {
        this.messageService.add({ severity: 'error', summary: 'Server Error', detail: 'Server Not Responding!' });
      }

    );
  }

  // onDialogHide() {

  // }

  viewArticle(car: KbArtilces) {
    this.displayDialog = true;
  }

  formBuild() {
    this.addEdit = this.fb.group({
      articleName: new FormControl(''),
      categoryId: new FormControl(),
      content: new FormControl()
    });

    this._data.getAllcategories().subscribe(
      (cat: Category[]) => {
        this.arrCat = cat;
        console.log(this.arrCat);
        this.arrCat = this.filterformatDataforDropdown("categoryName", "categoryId", this.arrCat);
      }
    );

  }

  addArticle() {
    this.addEdit.patchValue({
      articleName: '',
      categoryId: '',
      content: ''
    });
    this.display = true;
  }

  editArticle(article: KbArtilces) {
    this.display = true;
    console.log(article);
    this._data.fetchDataById(article.articleId).subscribe(
      (editdata: KbArtilces[]) => {
        this.arrFetch = editdata;
        console.log(this.arrFetch.articleName);
        this.editId = this.arrFetch.articleId;
        this.addEdit.patchValue({
          articleName: this.arrFetch.articleName,
          categoryId: this.arrFetch.categoryId,
          content: this.arrFetch.content
        });
      },
      (errMsg: any) => {
        this.messageService.add({severity: 'warning', summary: 'Fetching!', detail: 'No data available'});
      }
    );
  }

  onSubmit() {

    if (this.editId != null) {
      this.addEdit.value.articleId = this.editId;
      // alert( this.addEdit.value.articleId);
      this._data.insertUpdateData(this.getFormValues()).subscribe(
        (updatedData: any) => {
          this.messageService.add({severity: 'info', summary: 'Update' , detail: this.addEdit.value.articleName  + 'Updated'});
        }
      );
      this.ngOnInit();
      this.display = false;
    } else {
      this._data.insertUpdateData(this.getFormValues()).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'info', summary: 'Adding', detail: 'Added Successfuly' });
        }
      );
      this.display = false;
      this.ngOnInit();
    }
  }


  // format dropdown data
  public filterformatDataforDropdown(label, labelData, data, Placeholdervalue?) {
    let formatdata = [];
    let customdata = {
      label: null,
      value: null
    };
    if (!_.isEmpty(Placeholdervalue)) {
      formatdata.push({
        label: Placeholdervalue,
        value: null
      });
    }

    _.forEach(data, function (value) {
      var shallow = _.clone(customdata);
      shallow.label = value[label];
      shallow.value = value[labelData];
      formatdata.push(shallow);
    });
    return formatdata;
  }

  getFormValues() {
    return new KbArtilces(
      this.addEdit.value.articleId,
      this.addEdit.value.articleName,
      this.addEdit.value.categoryId,
      this.addEdit.value.content,
      this.addEdit.value.previewContent,
      this.addEdit.value.categoryName,
      this.addEdit.value.createdBy,
      this.addEdit.value.createdByName,
      this.addEdit.value.createdDate,
      this.addEdit.value.modifiedBy,
      this.addEdit.value.modifiedByName,
      this.addEdit.value.modifiedDate
    );
  }

  onPageChange(number: number) {
    let arr3 = [];

    number = this.page;
    alert(number);
    console.log(number);
    if (number != 0) {
      this._data.getPageByNumber(number).subscribe(
        (x: any) => {
          arr3 = x;
          this.isPagination = true;
          this.allArticles = arr3['kbArticles'];
          this.arrPager = arr3['pagerInfo'];
          this.currentPage = this.arrPager["currentPage"];
          this.totalPages = this.arrPager['totalPages'];
          this.itemsPerPage = this.arrPager["itemsPerPage"];
          this.totalItems = this.arrPager["totalItems"];
          console.log(this.allArticles);
          console.log(arr3);
        }
        );
        // alert()
        // this.ngOnInit();
    }
  }
}
