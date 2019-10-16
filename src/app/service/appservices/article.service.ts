import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // Common Url
  URLToken = 'https://03e4116f.ngrok.io/api/KB/';

  FetchAllData = 'GetArticles?getall=0&categ=';
  Categories = 'GetCategories';
  FetchDataById = 'GetKBArticlesById?ArticleId=';
  InsertUpdate = 'InsertUpdateKBAricles';
  Paginator = 'GetArticles?getall=0&categ=&Page=';
  Search = 'GetArticles?getall=0&SearchString=';

  // url for operation
  URLfetchAllData = this.URLToken + this.FetchAllData;
  URLcategories = this.URLToken + this.Categories;
  URLfetchDataById = this.URLToken + this.FetchDataById;
  URLInsertUpdate = this.URLToken + this.InsertUpdate;
  URLPaginator = this.URLToken + this.Paginator;
  URLSearch = this.URLToken + this.Search;

  constructor(private _http: HttpClient) {
  }

  getAllArticles() {
    return this._http.get(this.URLfetchAllData);
  }

  getPageByNumber(num) {
    alert(num);
    return this._http.get(this.URLPaginator + num);
  }

  public getArticleBySearch(value) {
    return this._http.get(this.URLSearch + value);
  }

  getAllcategories() {
    return this._http.get(this.URLcategories);
  }

  fetchDataById(id) {
    return this._http.get(this.URLfetchDataById + id);
  }

  insertUpdateData(arrData) {
    console.log(arrData);
    const body = JSON.stringify(arrData);
    const head = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.URLInsertUpdate, body, { headers: head });
  }
}
