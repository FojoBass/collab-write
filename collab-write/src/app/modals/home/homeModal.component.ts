import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import { UserInfoInt } from '@collab-write/firebase';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './homeModal.component.html',
})
export class HomeModalComponent {
  userWorkspaceInfo: UserInfoInt | null = null;
  userEditInfo: UserInfoInt | null = null;
  authForm = new FormGroup({
    fullName: new FormControl(''),
    docId: new FormControl(''),
  });
  @Input() target: string = '';

  constructor(private globalService: GlobalService) {
    this.userWorkspaceInfo = this.globalService.userWorkspaceInfo;
    this.userEditInfo = this.globalService.userEditInfo;
  }
}
