import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Object} from "../entities/models/object";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  private readonly URL_TESTING = "https://api.restful-api.dev/objects"

  /// public declare objectsObserve: Observable<Object[]>

  constructor(private http: HttpClient) {
    /*this.objectsObserve = new Observable((observe) => {
      this.http.get(this.URL_TESTING+'?id=1&id=2&id=4&id=5').subscribe((response: any) => {
        observe.next(response)
      })
    })*/
  }

  public getObjectsSpecifyIds(): Observable<Object[]> {
    // you can specify return type on generic after http method as get<T> , post<T>
    return this.http.get<Object[]>(this.URL_TESTING + '?id=1&id=2&id=4&id=5')
  }

  public getObjects(): Observable<Object[]> {
    // you can specify return type on generic after http method as get<T> , post<T>
    return this.http.get<Object[]>(this.URL_TESTING)
  }

  public deleteObjectByID(id: number | string): Observable<any> {
    return this.http.delete<any>(this.URL_TESTING + '/' + id)
  }

  public createObject(object: Object): Observable<Object> {
    return this.http.post<Object>(this.URL_TESTING, object)
  }

  public updateObject(object: Object,id: number | string): Observable<Object> {
    return this.http.put<Object>(this.URL_TESTING+'/'+id, object)
  }

}
