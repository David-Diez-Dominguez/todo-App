import {Component, Inject, OnInit} from '@angular/core';
import {ApiService, Group} from '../api.service';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['../popup-data.component.scss']
})
export class NewGroupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public oldGroup: Group, private apiService: ApiService, public dialog: MatDialog) { }

  submitPressed: boolean;

  ngOnInit() {
    this.submitPressed = false;
    if (this.oldGroup != null) {
      (document.getElementById('title-text') as HTMLInputElement).innerHTML = "Update this group";
      (document.getElementById('name-input') as HTMLInputElement).value = this.oldGroup.name;
      (document.getElementById('selectedColor') as HTMLInputElement).value = this.oldGroup.color;
    }
  }


  submit() {
    if (this.submitPressed) { return; }
    const name = (document.getElementById('name-input') as HTMLInputElement).value;
    if (name === '') {
      const label = document.getElementById('newNameLabel');
      label.style.color = 'red';
      return;
    }

    const color = (document.getElementById('selectedColor') as HTMLInputElement).value;

    this.submitPressed = true;
    if(this.oldGroup === null) {
      this.apiService.createGroup(name, color);
      window.location.href = 'http://localhost:4200';
    } else {
      this.oldGroup.name = name;
      this.oldGroup.color = color;
      this.apiService.saveGroup(this.oldGroup)
      this.dialog.ngOnDestroy();
    }
  }

  deleteGroup() {
    this.apiService.deleteGroup(this.oldGroup);
    window.location.href = 'http://localhost:4200';
  }
}
