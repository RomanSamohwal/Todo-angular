import {CommonDAO} from "./CommonDAO";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {Observable} from "rxjs";

// специфичные методы для работы с задачами (которые не входят в обычный CRUD)
export interface TaskDAO extends CommonDAO<Task> {

  // поиск задач по всем параметрам
  // если какой-либо параметр равен null - он не будет учитываться при поиске
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> | undefined;

  // кол-во завершенных задач в заданной категории (если category === null, то для всех категорий)
  getCompletedCountInCategory(category: Category): Observable<number> | undefined;

  // кол-во незавершенных задач в заданной категории (если category === null, то для всех категорий)
  getUncompletedCountInCategory(category: Category): Observable<number> | undefined;

  // кол-во всех задач в заданной категории (если category === null, то для всех категорий)
  getTotalCountInCategory(category: Category): Observable<number> | undefined;

  // кол-во всех задач в общем
  getTotalCount(): Observable<number> | undefined;

}
