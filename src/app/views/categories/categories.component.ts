import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[] = []

  @Output()
  selectCategory = new EventEmitter<Category>()

  selectedCategory: Category | undefined

  constructor(private dataHandler: DataHandlerService) {

  }

  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  showTasksByCategory(category: Category) {
    // this.selectedCategory = category;
    // this.dataHandler.fillTasksByCategory(category)

    //если ничего не изменилось, ничего не делать
    if (this.selectedCategory === category) {
      return
    }

    this.selectedCategory = category//сохранем выбранную категорию
    //вызываем внешний обработчик и переаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory)
  }

}
