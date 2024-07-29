import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentInt, UserInfoInt } from '@collab-write/firebase';
import { dummyDocuments } from 'collab-write/src/data';
import { LoadingComponent } from './loading.component';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { WorkspaceModalComponent } from '../modals/workspace/workspaceModal.component';
import { ModalLayoutComponent } from '../modals/layout/modalLayout.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    WorkspaceModalComponent,
    ModalLayoutComponent,
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit {
  documents!: DocumentInt[];
  isLoading = true;
  isModalOpen = false;

  userWorkspaceInfo!: UserInfoInt;

  constructor(private globalService: GlobalService, private router: Router) {
    // if (this.globalService.isAuth)
    this.userWorkspaceInfo = this.globalService.userWorkspaceInfo! ?? {
      name: 'Dummy',
      uid: 'dummyId',
    };
    // else this.router.navigateByUrl('/', {replaceUrl: true});
  }

  ngOnInit(): void {
    // !This is dummy for now
    this.documents = dummyDocuments;
    this.isLoading = false;
  }

  setIsLoading = (state: boolean) => {
    this.setIsLoading(state);
  };

  setIsModalOpen = (state: boolean) => {
    this.isModalOpen = state;
  };

  handleOpenModal() {
    this.isModalOpen = true;
  }
}
