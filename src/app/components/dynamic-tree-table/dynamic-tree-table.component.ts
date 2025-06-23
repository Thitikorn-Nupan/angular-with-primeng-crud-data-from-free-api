import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataTreeTable} from "../../entities/data-tree-table";
import {HeaderColumn} from "../../entities/header-column";

@Component({
  selector: 'dynamic-tree-table',
  templateUrl: './dynamic-tree-table.component.html',
  styleUrl: './dynamic-tree-table.component.css'
})
export class DynamicTreeTableComponent {
  @Input()
  public data!: DataTreeTable<any>[] // data for map api to p tree table
  @Input()
  public tableTitle!: string;
  // @Input()
  // public models!: { data: any, subData: any[] | null } []
  @Input()
  public headerColumns!: HeaderColumn[]
  @Input()
  public id!: string
  @Input()
  public scrollable!: boolean
  @Input()
  public loading!: boolean
  @Input()
  public paginator!: boolean
  @Input()
  public rowsScope!: number
  @Output()
  public editEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public removeEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public getData: EventEmitter<DataTreeTable<any>[]> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.getData.emit(this.data)
  }

  public reloadData(data:DataTreeTable<any>[]): void {
    this.data = data
    console.log(this.data)
  }
  /**
   public prepareData(models: { data: any, subData: any[] | null } []) {
   // this.convertModelToDataTreeTable(models)
   }

   private loadHeaderColumns(object: any): void {
   this.headerColumns = []
   const objectKeys = UsefulService.getObjectKeys(object)
   for (let key of objectKeys) {
   this.headerColumns.push({field: key, header: key.toUpperCase()})
   }
   this.headerColumns.push({field: 'action', header: 'action'.toUpperCase()})
   }

   private convertModelToDataTreeTable(models: { data: any, subData: any[] | null } []): void {
   this.data = []
   let subData: any[] = []
   for (let i = 0; i < models.length!; i++) {
   if (models[i].subData?.length! > 0 && models[i].subData !== null) {
   for (let data of models[i].subData!) {
   // console.log(data)
   subData.push({data: data})
   }
   }
   this.data.push({data: models[i].data, children: subData})
   subData = []
   }
   }
   */

  protected getEditEventTreeTable(data: any) {
    this.editEvent.emit(data)
  }

  protected getRemoveEventTreeTable(data: any) {
    this.removeEvent.emit(data)
  }
}
