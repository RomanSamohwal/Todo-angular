import {CategoryDAO} from "../interface/CategoryDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  add(p: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    // @ts-ignore
    return undefined;
  }

  update(p: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }
}
