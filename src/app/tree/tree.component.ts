import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() nodeData: any;
  @Input() rootData: any;

  showMenu: boolean = false;
  xPosition: number = 0;
  yPosition: number = 0;
  currentSelect: any;

  constructor() { }

  ngOnInit() {
    
  }

  toggleNode(node: any) {
    node.showChildren = !node.showChildren;
    this.showMenu = false;
  }

  openContext(event, node): void {
    event.preventDefault();
    this.xPosition = event.clientX + 10;
    this.yPosition = event.clientY + 10;
    this.showMenu = true;
    this.currentSelect = node;
  }

  updateData(): void {
    console.log(this.currentSelect);
  }

  @HostListener("document:click",["$event"])
  onClick(event) {
    if(this.showMenu) {
      this.showMenu = !this.showMenu;
    }
  }
}
