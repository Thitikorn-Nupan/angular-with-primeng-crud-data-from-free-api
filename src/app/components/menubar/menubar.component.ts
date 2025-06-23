import {Component ,Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent implements OnInit {

  @Input()
  public menuItems : MenuItem[] | undefined;

  ngOnInit() {

  }


}
