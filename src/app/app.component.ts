import {Component} from '@angular/core';
import {MenuItem, MenuItemCommandEvent, TreeNode} from "primeng/api";
import {DataTreeTable} from "./entities/data-tree-table";
import {HeaderColumn} from "./entities/header-column";
import {File} from "./entities/crud/file";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicIconForm, OptionDropdown} from "./entities/dynamic-icon-form";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Menu
  protected menuItems: MenuItem[]

  // Table
  private readonly demoDynamicTreeTable: DemoDynamicTreeTable
  public headerColumns: HeaderColumn[]
  public data: DataTreeTable<any>[]
  public id: string
  public tableTitle: string
  public scrollable: boolean
  public paginator: boolean
  public rowsScope: number

  // Form
  private readonly demoDynamicIconForm: DemoDynamicIconForm
  public formGroup: FormGroup;
  public formTitle: string;
  public dynamicIconForms: DynamicIconForm[];

  constructor(private router: Router,) {
    // Menu
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        // Url works when you clicked it will go to url this case will be :4200/
        url: '/'
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        // url: '/', // Url works when you clicked it will go to url but default it works on main app as http://localhost:4200/ **** And it will refresh page
        // command(...) works after clicked
        command: function (event: MenuItemCommandEvent) {
          // AppComponent.onMenuItemClicked(event)
          router.navigate(['/']);
        },
        items: [
          {
            label: 'Crud Free API',
            icon: 'pi pi-server',
            // url: '/crud-free-api',
            command: function (event: MenuItemCommandEvent) {
              router.navigate(['crud-free-api']);
            }
          },
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        items: [
          {
            label: 'Github',
            // Url works when you clicked it will go to url
            url: 'https://github.com/thitikorn-nupan'
          },
          {
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/thitikorn-nupan/'
          }
        ]

      }
    ]

    // Table
    this.demoDynamicTreeTable = new DemoDynamicTreeTable()
    this.tableTitle = this.demoDynamicTreeTable.tableTitle
    this.id = this.demoDynamicTreeTable.id
    this.scrollable = this.demoDynamicTreeTable.scrollable
    this.paginator = this.demoDynamicTreeTable.paginator
    this.rowsScope = this.demoDynamicTreeTable.rowsScope
    this.data = this.demoDynamicTreeTable.data
    this.headerColumns = this.demoDynamicTreeTable.headerColumns

    // Form
    this.demoDynamicIconForm = new DemoDynamicIconForm()
    this.formGroup = this.demoDynamicIconForm.formGroup
    this.formTitle = this.demoDynamicIconForm.formTitle
    this.dynamicIconForms = this.demoDynamicIconForm.dynamicIconForms
  }

  private static onMenuItemClicked(event: MenuItemCommandEvent) {
    const menu: MenuItem = event.item!
    switch (menu?.label) {
      case 'Home':
        console.log('Home clicked')
        break;
      case 'Crud Free API':
        console.log('Crud Free API clicked')
        break;
    }
  }

  protected setInitialData($event: DataTreeTable<any>[]) {
    this.data = $event // bind data
  }

  protected setEditEventTreeTable($even: any) {
    console.log('get edit')
  }

  protected setRemoveEventTreeTable($even: any) {
    console.log('get remove')
    // this.data = this.data.filter((item) => item.data.id !== $even.id)
  }


  protected setInitialFormGroup($event: FormGroup) {
    this.formGroup = $event  // bind form
  }

  protected setSubmitEventFormGroup() {
    console.log('get submit ',this.formGroup)
  }

  protected setClearEventFormGroup() {
    this.formGroup.reset()
  }
}


class DemoDynamicTreeTable {

  // assume this from api i have to convert to data as format as DataTreeTable
  private files: { data: File, subData: File[] | null }[] = [
    {
      data: new File("Applications", "200mb", "Folder"),
      subData: [
        new File("Angular App", "25mb", "Folder"),
        new File("React App", "35mb", "Folder"),
        new File("Spring Boot App", "75mb", "Folder"),
      ]
    },
    {
      data: new File("Cloud", "20mb", "Folder"),
      subData: [
        new File("Angular App", "25mb", "Folder"),
        new File("React App", "35mb", "Folder"),
        new File("Spring Boot App", "75mb", "Folder"),
      ]
    },
    {
      data: new File("Documents", "72kb", "Folder"),
      subData: null
    },
    {
      data: new File("Word", "1200mb", "Folder"),
      subData: null
    },
    {
      data: new File("Excel", "950mb", "Folder"),
      subData: null
    },
    {
      data: new File("PDF", "740mb", "Folder"),
      subData: [
        new File("Angular App", "25mb", "Folder"),
        new File("React App", "35mb", "Folder"),
      ]
    },
  ]
  /**private students: { data: Student, subData: Student[] | null }[] = [
   {
   data: new Student('ef326394-66a6-47ef-903c-68eb101be665', 'alex slider', 'alex@hotmail.com', 3),
   subData: [
   new Student('', 'alun slider', 'alun@hotmail.com', 2),
   new Student('', 'ajax slider', 'ajax@hotmail.com', 1),
   ]
   },
   {
   data: new Student('65169241-762c-4a69-87eb-48a697420fe6', 'max runner', 'max@hotmail.com', 4),
   subData: null
   },
   {
   data: new Student('445fd31a-4327-4c76-83c1-4a9dc5892202', 'slam runner', 'slam@hotmail.com', 2),
   subData: [
   new Student('', 'jacky runner', 'jacky@hotmail.com', 1),
   new Student('', 'frok runner', 'frok@hotmail.com', 1),
   new Student('', 'austin runner', 'austin@hotmail.com', 1),
   ]
   },
   {
   data: new Student('65169241-762c-4a69-87eb-41a697420fe1', 'ood slider', 'ood@hotmail.com', 1),
   subData: null
   },
   {
   data: new Student('65169241-762c-4a61-82eb-41a697220fe1', 'kevin nash', 'kevin@hotmail.com', 2),
   subData: null
   },
   {
   data: new Student('61169211-662c-4e61-82eb-41a697210fe1', 'max helloway', 'max@hotmail.com', 3),
   subData: null
   },
   ]
   private users: { data: User, subData: User[] | null } [] = [
   {
   data: new User(1, 'a@hotmail.com', '12345', 'a', 'slider'),
   subData: [
   new User(null, 'a@hotmail.com', '32134', 'a', 'slider'),
   new User(null, 'a@hotmail.com', '98712', 'a', 'slider')
   ]
   },
   {
   data: new User(2, 'b@hotmail.com', '12345', 'b', 'owner'),
   subData: null
   },
   {
   data: new User(3, 'c@hotmail.com', '12345', 'c', 'chap'),
   subData: null
   }
   ,
   {
   data: new User(4, 'k@hotmail.com', '12345', 'k', 'kevin'),
   subData: null
   },
   {
   data: new User(5, 'm@hotmail.com', '12345', 'm', 'maxky'),
   subData: null
   },
   {
   data: new User(6, 'i@hotmail.com', '12345', 'i', 'ice'),
   subData: null
   }
   ]
   private products: { data: Product, subData: Product[] | null } [] = [
   {
   data: new Product('ef326394-66a6-47ef-903c-68eb101be661', 1, 'A/C Drink', '/a-c-drink.png', 250.00),
   subData: null
   },
   {
   data: new Product('ef326394-62a6-47ef-903c-68eb101be665', 2, 'PP Energy', '/pp-energy.png', 50.00),
   subData: null
   },
   {
   data: new Product('ef126394-66a6-47ef-903c-68eb101be665', 3, 'ABC Drink', '/abc-drink.png', 70.00),
   subData: null
   }
   ,
   {
   data: new Product('ef426394-66a6-47ef-903c-68eb101be665', 4, 'Aj Shirt', '/aj-shirt.png', 150.00),
   subData: null
   },
   {
   data: new Product('ef326354-66a6-47ef-903c-68eb101be665', 5, 'CnC Shirt', '/c-n-c-shirt.png', 170.00),
   subData: null
   },
   {
   data: new Product('ef326774-66a6-47ef-903c-68eb101be665', 6, 'Li Energy', '/li-energy.png', 110.00),
   subData: null
   }
   ]
   // if you don't need to convert to data as format as DataTreeTable  your api should return like below
   private clients: DataTreeTable<Client>[] = [
   {
   data: new Client(1, 'a@hotmail.com', '12345', 'a', 'slider'),
   children: []
   },
   {
   data: new Client(2, 'b@hotmail.com', '12345', 'b', 'owner'),
   children: []
   },
   {
   data: new Client(3, 'c@hotmail.com', '12345', 'c', 'chap'),
   children: [
   {
   data: new Client(3, 'e@hotmail.com', '12345', 'e', 'express')
   },
   {
   data: new Client(3, 'f@hotmail.com', '12345', 'f', 'frank')
   },
   {
   data: new Client(3, 'g@hotmail.com', '12345', 'g', 'gang')
   }
   ]
   }
   ,
   {
   data: new Client(4, 'k@hotmail.com', '12345', 'k', 'kevin'),
   children: []
   },
   {
   data: new Client(5, 'm@hotmail.com', '12345', 'm', 'maxky'),
   children: []
   },
   {
   data: new Client(6, 'i@hotmail.com', '12345', 'i', 'ice'),
   children: []
   }
   ]
   private software: DataTreeTable<Software>[] = [
   {
   data: new Software("The Weather", "1.5GB", "Folder"),
   children: []
   },
   {
   data: new Software("Car Shop", "3.1GB", "Folder"),
   children: []
   },
   {
   data: new Software("Gadgets House", "1GB", "Folder"),
   children: [
   {
   data: new Software("Gadgets House", "800MB", "Folder")
   },
   {
   data: new Software("Gadgets House", "600MB", "Folder")
   }
   ]
   },
   {
   data: new Software("Books Shop", "8GB", "Folder"),
   children: []
   },
   {
   data: new Software("Podcast House", "10GB", "Folder"),
   children: [
   {
   data: new Software("Podcast House", "9GB", "Folder"),
   children: [
   {
   data: new Software("Podcast & JJ House", "9GB", "Folder"),
   },
   {
   data: new Software("Podcast with me", "9GB", "Folder"),
   },
   ] // end children
   }
   ]
   }
   ]*/

  public id: string
  public tableTitle: string
  public scrollable: boolean
  public paginator: boolean
  public rowsScope: number
  public headerColumns: HeaderColumn[]
  public data: DataTreeTable<any>[]

  constructor() {
    this.tableTitle = 'File Tree Table'
    this.id = 'dynamic-tree-table'
    this.scrollable = true
    this.paginator = true
    this.rowsScope = 5
    // convert api to format
    this.data = this.convertModelToDataTreeTable(this.files)
    this.headerColumns = this.convertObjectToHeaderColumns(this.data[0].data)
    console.log(this.headerColumns)
    // api is correct format
    /*
     this.data = this.software
     this.headerColumns = this.convertObjectToHeaderColumns(this.data[0].data)
    */
  }

  private convertObjectToHeaderColumns(object: any): HeaderColumn[] {
    let headerColumns = []
    const objectKeys = Object.keys(object)
    console.log(objectKeys)
    for (let key of objectKeys) {
      headerColumns.push({field: key, header: key.toUpperCase()})
    }
    headerColumns.push({field: 'action', header: 'action'.toUpperCase()})
    return headerColumns
  }

  private convertModelToDataTreeTable(model: { data: any, subData: any[] | null } []): DataTreeTable<any>[] {
    let data: DataTreeTable<any>[] = []
    let subData: TreeNode<any>[] = []
    for (let i = 0; i < model.length!; i++) {
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
}

class DemoDynamicIconForm {
  public formGroup: FormGroup;
  public formTitle: string;
  public dynamicIconForms: DynamicIconForm[];

  constructor() {
    this.formGroup = new FormGroup({})
    this.formTitle = "Dynamic Icon Form Group Key Filter"
    this.dynamicIconForms = []
    // dropdown primeng 19
    // const cities = [
    //   {name: 'New York', code: 'NY'},
    //   {name: 'Rome', code: 'RM'},
    //   {name: 'London', code: 'LDN'},
    //   {name: 'Istanbul', code: 'IST'},
    // ];

    //  dropdown primeng 17
    const cities : OptionDropdown[] = [
      {
        key: '0',
        label: 'Documents paper',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-inbox',
        children: [
          {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children:[]
          },
          {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children:[]
          }
        ]
      },
      {
        key: '1',
        label: 'Documents cloud',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-cloud',
        children:[]
      },
      {
        key: '2',
        label: 'Documents database',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-database',
        children:[]
      }
    ]


    // checkbox
    const skills = [
      {name: "Java", key: "J"},
      {name: "Kotlin", key: "K"},
      {name: "Spring Boot", key: "SB"},
      {name: "Spring", key: "S"},
      {name: "C#", key: "CS"},
      {name: ".Net", key: "DN"},
    ]
    // radio button
    const categories = [
      {name: 'Accounting', key: 'A'},
      {name: 'Marketing', key: 'M'},
      {name: 'Production', key: 'P'},
      {name: 'Research', key: 'R'}
    ];

    //** ref on primeng.org/keyfilter
    // int = only integer as number as 123
    const cashFieldAsNumber = new DynamicIconForm('$', 'cash', new FormControl(10, Validators.required), 'cash-id', false).setInputText(true).setPKeyFilter('int')
    // alpha = only char as abc... (without all sign and space)
    const usernameFieldAsString = new DynamicIconForm('Username', 'username', new FormControl(null, Validators.required), 'username-id', false).setInputText(true).setPKeyFilter('alpha').setPlaceholder('Username or nickname...')
    // null = any char
    const messageFieldAsString = new DynamicIconForm('Message', 'message', new FormControl(null, Validators.required), 'message-id', false).setInputText(true).setPKeyFilter(null).setPlaceholder('Message...')
    // money = only decimal and comma as 1,000.00 or 1000 , 1000.00
    const transferFieldAsFloat = new DynamicIconForm('pi pi-building-columns', 'transfer', new FormControl(0, Validators.required), 'transfer-id', true).setInputText(true).setPKeyFilter('money')
    // ** num = only decimal and dot as 1000.00 or 1000
    const ratingFieldAsDecimal = new DynamicIconForm('pi pi-star-fill', 'rating', new FormControl(null, Validators.required), 'rating-id', true).setInputText(true).setPlaceholder('0.0').setPKeyFilter('num')
    // ** email = type email but more validate then default email
    const emailFieldAsStringAsEmail = new DynamicIconForm('@', 'email', new FormControl(null, Validators.required), 'email-id', false).setInputText(true).setPlaceholder('xxx@hotmail.com').setPKeyFilter('email')
    // ** new
    /*const cityFieldAsDropdown = new DynamicIconForm('pi pi-map', 'map', new FormControl(null, Validators.required), 'map-id', true).setPlaceholder('Select one').setDropdown({
      status: true,
      options: cities
    })*/
    const cityFieldAsDropdown = new DynamicIconForm(null, 'map', new FormControl(null, Validators.required), 'map-id', null)
      .setPlaceholder('Select one')
      .setDropdown(cities)
    const addressFieldAsTextarea = new DynamicIconForm('Address', 'address', new FormControl(null, Validators.required), 'address-id', false).setPlaceholder('(Optional)').setTextarea(true)
    const skillFieldAsCheckbox = new DynamicIconForm(null, 'skills', new FormControl(null, Validators.required), 'skills-id', null).setCheckbox({
      status: true,
      options: skills
    })
    const categoryFieldAsRadio = new DynamicIconForm(null, 'categories', new FormControl(null, Validators.required), 'categories-id', null).setRadio({
      status: true,
      options: categories
    })
    // ** int = integer
    const weightFieldAsDecimal = new DynamicIconForm('pi pi-gauge', 'weight', new FormControl(0, Validators.required), 'weight-id', true).setInputText(true).setPKeyFilter('int')

    this.dynamicIconForms.push(cashFieldAsNumber)
    this.dynamicIconForms.push(usernameFieldAsString)
    this.dynamicIconForms.push(messageFieldAsString)
    this.dynamicIconForms.push(transferFieldAsFloat)
    this.dynamicIconForms.push(ratingFieldAsDecimal)
    this.dynamicIconForms.push(emailFieldAsStringAsEmail)
    this.dynamicIconForms.push(cityFieldAsDropdown)
    this.dynamicIconForms.push(addressFieldAsTextarea)
    this.dynamicIconForms.push(skillFieldAsCheckbox)
    this.dynamicIconForms.push(categoryFieldAsRadio)
    this.dynamicIconForms.push(weightFieldAsDecimal)

    /*for (let i = 0; i < this.dynamicIconFormsKeyFilter.length; i++) {
      this.formGroup.addControl(this.dynamicIconFormsKeyFilter[i].formControlName!, this.dynamicIconFormsKeyFilter[i].formControl)
    }
    console.log(this.formGroup)*/
  }
}
