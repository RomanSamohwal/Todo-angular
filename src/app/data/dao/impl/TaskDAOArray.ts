import {TaskDAO} from "../interface/TaskDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from 'src/app/model/Task';
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  // @ts-ignore
  add(p: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }


  // @ts-ignore
  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === id); // удаляем по id
    if (taskTmp) {
      TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
      return of(taskTmp);
    }
  }

// @ts-ignore
  get(id: number): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

// @ts-ignore
  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> | undefined {
    return undefined;
  }

  getTotalCount(): Observable<number> | undefined {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> | undefined {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> | undefined {
    return undefined;
  }

  // поиск задач по параметрам
  // если значение null - параметр не нужно учитывать при поиске
  // @ts-ignore
  search(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Observable<Task[]> {

    return of(this.searchTasks(category, searchText, status, priority));

  }

  private searchTasks(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Task[] {

    let allTasks = TestData.tasks;

    // поочереди применяем все условия (какие не пустые)
    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          task.title.toUpperCase().includes(searchText.toUpperCase()) // учитываем текст поиска (если '' - возвращаются все значения)
      );
    }

    return allTasks;
  }

// @ts-ignore
  update(task: Task): Observable<Task> {

    const taskTmp = TestData.tasks.find(t => t.id === task.id); // обновляем по id
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

    return of(task);

  }


}
