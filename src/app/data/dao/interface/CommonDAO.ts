import {Observable} from "rxjs";

export interface CommonDAO<T> {

  // получить все значения
  getAll(): Observable<T[]>;

  // получить одно значение по id
  get(id: number): Observable<T>; // получение значения по уникальному id

  // обновить значение
  update(p:T): Observable<T>;

  // удалить значение
  delete(id: number): Observable<T>; // удаление по id

  // добавить значение
  add(p:T): Observable<T>;

}

