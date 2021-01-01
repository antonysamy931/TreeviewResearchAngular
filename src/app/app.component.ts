import { Component, OnInit, ViewChild } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatMenuTrigger } from '@angular/material/menu';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { 
            name: 'Brussels sprouts',
            children: [
              { name: "test" },
              {
                name: "1",
                children: [
                  {name: "test1"}
                ]
              }
            ]
          },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      },
    ]
  },
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  ngOnInit(): void {
  }

  onContextMenuClick(event: MouseEvent, node: FoodNode) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': node };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  contextMenuActionClick(node: FoodNode, menu: Number) {
    console.log(node);
    console.log(menu);
  }

}
