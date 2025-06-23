import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FakeApiService} from "../../service/free-api-service";
import {Object as ObjectFreeApi} from "../../entities/models/object";
import {HeaderColumn} from "../../entities/header-column";
import {DataTreeTable} from "../../entities/data-tree-table";
import {TreeNode} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicIconForm} from "../../entities/dynamic-icon-form";

@Component({
  selector: 'crud-free-api',
  templateUrl: './crud-free-api.component.html',
  styleUrl: './crud-free-api.component.css'
})
export class CrudFreeApiComponent implements OnInit, AfterViewInit, OnChanges {

  // Data table
  protected declare objects: ObjectFreeApi[]
  public declare headerColumns: HeaderColumn[]
  public declare data: DataTreeTable<any>[]
  public declare id: string
  public declare tableTitle: string
  public loading: boolean = true
  public declare scrollable: boolean
  public declare paginator: boolean
  public declare rowsScope: number

  // Form
  public declare formGroup: FormGroup;
  public declare formTitle: string;
  public declare dynamicIconForms: DynamicIconForm[];


  /** Manually Triggering Change Detection (Less Common): In specific scenarios where *ngIf or async pipe are not suitable, you can manually trigger change detection using ChangeDetectorRef. */
  constructor(private fakeApiService: FakeApiService) {} //  private changeDetectorRef: ChangeDetectorRef

  ngAfterViewInit(): void {
    setTimeout(() => { // have to wait data if i use data on out reloadData
      this.setupTable();
    }, 500)
  }

  ngOnInit() {
    this.setupForm()
    this.reloadData()
  }

  ngOnChanges(changes: SimpleChanges) {}


  private setupTable() {
    this.tableTitle = 'Object Table'
    this.id = 'object-tree-table'
    this.scrollable = true
    this.paginator = true
    this.rowsScope = 7
    this.loading = false
    let objectsFormat: { data: ObjectFreeApi, subData: ObjectFreeApi [] | null }[] = []
    this.objects.forEach(object => {
      objectsFormat.push({data: object, subData: null})
    })
    this.data = this.convertModelToDataTreeTable(objectsFormat)
    this.headerColumns = this.convertObjectToHeaderColumns(this.data[0].data, ["data"])
  }

  private reloadData() {
    this.fakeApiService.getObjects().subscribe((data) => (this.objects = data))
  }

  private setupForm() {
    this.formGroup = new FormGroup({})
    this.formTitle = "Object Form"
    this.dynamicIconForms = [
      new DynamicIconForm('Name', 'name', new FormControl(null, Validators.required), 'object-name', false).setInputText(true).setPKeyFilter(null).setPlaceholder('Name...')
    ]
  }




  protected setInitialData($event: DataTreeTable<any>[]) {
    this.data = $event;
  }

  protected setEditEventTreeTable($event: any) {
    const objectEdit = new ObjectFreeApi($event.id, "Edited success")
    this.fakeApiService.updateObject(objectEdit,objectEdit.id).subscribe((data: any) => {
      // just for testing api
      let objectsFormat: { data: ObjectFreeApi, subData: ObjectFreeApi [] | null }[] = []
      this.objects.forEach(object => {
        objectsFormat.push({data: object, subData: null})
      })
      data.name = objectEdit.name
      objectsFormat.push({data: data, subData: null})
      this.data = this.convertModelToDataTreeTable(objectsFormat)
    },(responseError) => {
      alert(responseError.error.error)
    })

  }

  protected setRemoveEventTreeTable($event: any) {
    this.fakeApiService.deleteObjectByID($event['id']).subscribe((data: any) => {
      // just for testing api
      let objectsFormat: { data: ObjectFreeApi, subData: ObjectFreeApi [] | null }[] = []
      this.objects.forEach(object => {
        objectsFormat.push({data: object, subData: null})
      })
      this.data = this.convertModelToDataTreeTable(objectsFormat)
    },(responseError) => {
      alert(responseError.error.error)
    })
  }

  private convertObjectToHeaderColumns(object: any, ignoreKeys: string[]): HeaderColumn[] {
    let headerColumns = []
    const objectKeys = Object.keys(object)
    for (let key of objectKeys) {
      if (ignoreKeys.indexOf(key) === -1) {
        headerColumns.push({field: key, header: key.toUpperCase()})
      }
    }
    headerColumns.push({field: 'action', header: 'action'.toUpperCase()})
    return headerColumns
  }

  private convertModelToDataTreeTable(model: { data: any, subData: any[] | null } []): DataTreeTable<any>[] {
    let data: DataTreeTable<any>[] = []
    let subData: TreeNode<any>[] = []
    for (let i = 0; i < model.length!; i++) { // loop for subData
      if (model[i].subData?.length! > 0 && model[i].subData !== null) {
        for (let data of model[i].subData!) {
          subData.push({data: data})
        }
      }
      data.push({data: model[i].data, children: subData})
      subData = []
    }
    return data
  }




  protected setInitialFormGroup($event: FormGroup) {
    this.formGroup = $event
  }

  protected setSubmitEventFormGroup() {
    const object = new ObjectFreeApi(0, this.formGroup.get('name')?.value)
    this.fakeApiService.createObject(object).subscribe((data: any) => {
      // just for testing api
      let objectsFormat: { data: ObjectFreeApi, subData: ObjectFreeApi [] | null }[] = []
      this.objects.forEach(object => {
        objectsFormat.push({data: object, subData: null})
      })
      objectsFormat.push({data: data, subData: null})
      this.data = this.convertModelToDataTreeTable(objectsFormat)
    })
    this.setClearEventFormGroup()
  }

  protected setClearEventFormGroup() {
    this.formGroup.reset()
  }
}
