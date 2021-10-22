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

// @ts-ignore
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> | undefined {
    return undefined;
  }

// @ts-ignore
  update(p: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }


}
