import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable} from "rxjs";
import {Priority} from "../../../model/Priority";

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
    return undefined;
  }

  update(p: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
