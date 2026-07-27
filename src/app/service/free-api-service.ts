import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Object as ObjectFreeApi} from "../entities/crud/object";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  private readonly URL_TESTING  : string = environment.baseURL

  constructor(private readonly http: HttpClient) {
  }

  public getObjectsSpecifyIds(): Observable<ObjectFreeApi[]> {
    // you can specify return type on generic after http method as get<T> , post<T>
    return this.http.get<ObjectFreeApi[]>(this.URL_TESTING + '?id=1&id=2&id=4&id=5')
  }

  public getObjects(): Observable<ObjectFreeApi[]> {
    return this.http.get<ObjectFreeApi[]>(this.URL_TESTING)
  }

  public deleteObjectByID(id: number | string): Observable<any> {
    return this.http.delete<any>(this.URL_TESTING + '/' + id)
  }

  public createObject(object: Object): Observable<ObjectFreeApi> {
    return this.http.post<ObjectFreeApi>(this.URL_TESTING, object)
  }

  public updateObject(object: Object,id: number | string): Observable<ObjectFreeApi> {
    return this.http.put<ObjectFreeApi>(this.URL_TESTING+'/'+id, object)
  }

}
