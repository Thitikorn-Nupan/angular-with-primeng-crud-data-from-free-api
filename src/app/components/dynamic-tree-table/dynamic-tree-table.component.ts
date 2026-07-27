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
  // public crud!: { data: any, subData: any[] | null } []
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
    // console.log(this.data)
  }
  /**
   public prepareData(crud: { data: any, subData: any[] | null } []) {
   // this.convertModelToDataTreeTable(crud)
   }

   private loadHeaderColumns(object: any): void {
   this.headerColumns = []
   const objectKeys = UsefulService.getObjectKeys(object)
   for (let key of objectKeys) {
   this.headerColumns.push({field: key, header: key.toUpperCase()})
   }
   this.headerColumns.push({field: 'action', header: 'action'.toUpperCase()})
   }

   private convertModelToDataTreeTable(crud: { data: any, subData: any[] | null } []): void {
   this.data = []
   let subData: any[] = []
   for (let i = 0; i < crud.length!; i++) {
   if (crud[i].subData?.length! > 0 && crud[i].subData !== null) {
   for (let data of crud[i].subData!) {
   // console.log(data)
   subData.push({data: data})
   }
   }
   this.data.push({data: crud[i].data, children: subData})
   subData = []
   }
   }
   */

  protected getEditEventTreeTable(data: any) : void {
    this.editEvent.emit(data)
  }

  protected getRemoveEventTreeTable(data: any) : void {
    this.removeEvent.emit(data)
  }
}
