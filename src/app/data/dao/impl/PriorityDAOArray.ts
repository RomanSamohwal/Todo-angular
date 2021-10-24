import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {
  add(p: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    // @ts-ignore
    return of(TestData.priorities);
  }

  update(p: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
