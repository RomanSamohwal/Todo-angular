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
    // @ts-ignore
    return undefined;
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

    return of(this.searchTodos(category, searchText, status, priority));

  }

  private searchTodos(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Task[] {

    let allTasks = TestData.tasks;


    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }


    return allTasks; // отфильтрованный массив
  }

// @ts-ignore
  update(task: Task): Observable<Task> {

    const taskTmp = TestData.tasks.find(t => t.id === task.id); // обновляем по id
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

    return of(task);

  }


}
