import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

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

  @Input()
  selectedCategory: Category | undefined

  // удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>()

  indexMouseMove: number | undefined

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog // внедряем MatDialog, чтобы работать с диалоговыми окнами
  ) {

  }

  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  showTasksByCategory(category: Category) {
    //если ничего не изменилось, ничего не делать
    if (this.selectedCategory === category) {
      return
    }

    this.selectedCategory = category//сохранем выбранную категорию
    //вызываем внешний обработчик и переаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory)
  }

  // сохраняет индекс записи категории, над который в данный момент проходит мышка (и там отображается иконка редактирования)
  private showEditIcon(index: number) {
    this.indexMouseMove = index;

  }

  // диалоговое окно для редактирования категории
  private openEditDialog(category: Category) {
    console.log(category)
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') { // нажали удалить

        this.deleteCategory.emit(category); // вызываем внешний обработчик

        return;
      }

      if (typeof (result) === 'string') { // нажали сохранить
        category.title = result as string;

        this.updateCategory.emit(category); // вызываем внешний обработчик
        return;
      }
    });
  }

}
