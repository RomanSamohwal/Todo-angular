import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from './model/Task'
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  tasks: Task[] = []
  categories: Category[] = []

  // @ts-ignore
  private selectedCategory: Category | null;

  constructor(private dataHandler: DataHandlerService,//фасад для работы с данными
  ) {
  }

  ngOnInit() {
   // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  // изменение категории
  private onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      // @ts-ignore
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  private onUpdateTask(task: Task) {

    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        // @ts-ignore
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });

  }

  // удаление задачи
  private onDeleteTask(task: Task) {

    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        //@ts-ignore
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        console.log(tasks)
        this.tasks = tasks;
      });
    });
  }

}
