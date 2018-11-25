import { Loading } from "ionic-angular";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

/**
 * Generated class for the CustomsearchbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "customsearchbar",
  templateUrl: "customsearchbar.html"
})
export class CustomsearchbarComponent {
  text: string;

  /////////////////progressbar ////////
  searching: any = false;
  ////////////////input search or not

  searchControl: FormControl;
  searchTerm: any;
  loading: Loading;
  searchArray  : any

  @Input()
  set passarray(array : any)
  {
    this.searchArray = array;
  }

  @Output() onChangeSearchValue : EventEmitter<any> = new EventEmitter()

  constructor() {
    console.log("Hello CustomsearchbarComponent Component");
    this.text = "Hello World";

    this.searchControl = new FormControl()
    this.searchTerm = '';

    this.searchArray = []

  }

  onSearchInput()
  {


    this.searching = true
    if(this.searchTerm == '')
    {
      this.searching = false
      this.onChangeSearchValue.emit([])
    }else{
      this.searching = false
      var returnarray =  this.filterItems(this.searchTerm)
      console.log(returnarray);
      this.onChangeSearchValue.emit(returnarray)
    }
  }

   /////////////////function : get search result array fromm search key///////////////////
   filterItems(searchTerm) {

    return this.searchArray.filter(info => {
      return (
        info.title
          .toUpperCase()
          .indexOf(searchTerm.toUpperCase()) > -1 &&
        info.content
          .toUpperCase()
          .indexOf(searchTerm.toUpperCase()) > -1
      );
    });
  }
}
