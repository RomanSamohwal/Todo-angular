import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from './model/Task'
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  private tasks: Task[] = []
  private categories: Category[] = []
  private priorities: Priority[] = []; // все приоритеты
  // поиск
  private searchTaskText = ''; // текущее значение для поиска задач

  // фильтрация
  // @ts-ignore
  private priorityFilter: Priority;
  // @ts-ignore
  private statusFilter: boolean;
  // @ts-ignore
  private selectedCategory: Category | null;

  constructor(private dataHandler: DataHandlerService,//фасад для работы с данными
  ) {
  }

  ngOnInit() {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
    //this.onSelectCategory(null); // показать все задачи
  }

  // изменение категории
  private onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.updateTasks()

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

  // удаление категории
  private onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe((cat: Category) => {
      this.selectedCategory = null; // открываем категорию "Все"
      // @ts-ignore
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // обновлении категории
  private onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      // @ts-ignore
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // поиск задач
  private onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фильтрация задач по статусу (все, решенные, нерешенные)
  private onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  // фильтрация задач по приоритету
  private onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }


  private updateTasks() {
    this.dataHandler.searchTasks(
      //@ts-ignore
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
