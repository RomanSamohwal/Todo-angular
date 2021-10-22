import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks)
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  private taskDaoArray = new TaskDAOArray()
  private categoryDaoArray = new CategoryDAOArray()

  constructor() {
       this.fillTasks()
  }

  fillTasks() {
    this.tasksSubject.next(TestData.tasks)
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category)
    this.tasksSubject.next(tasks)
  }
}
