import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { MenubarModule } from 'primeng/menubar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicTreeTableComponent } from './components/dynamic-tree-table/dynamic-tree-table.component';
import {CardModule} from "primeng/card";
import {TreeTableModule } from "primeng/treetable";
import {Button, ButtonDirective} from "primeng/button";
import { DynamicIconFormComponent } from './components/dynamic-icon-form/dynamic-icon-form.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {ReactiveFormsModule} from "@angular/forms";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {TreeSelectModule} from "primeng/treeselect";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import { CrudFreeApiComponent } from './crud/crud-free-api/crud-free-api.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    DynamicTreeTableComponent,
    DynamicIconFormComponent,
    CrudFreeApiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    CardModule,
    TreeTableModule,
    Button,
    SelectButtonModule,
    ReactiveFormsModule,
    KeyFilterModule,
    InputGroupModule,
    InputGroupAddonModule,
    CheckboxModule,
    RadioButtonModule,
    CascadeSelectModule,
    TreeSelectModule,
    ButtonDirective,
    Ripple,
    InputTextModule,
    InputTextareaModule,
  ],
  providers: [
    // for http client
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
