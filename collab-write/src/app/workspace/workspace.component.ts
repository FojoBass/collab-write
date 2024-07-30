import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentInt, getUserDocs, UserInfoInt } from '@collab-write/firebase';
import { LoadingComponent } from './loading.component';
import { GlobalService } from '../services/global.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkspaceModalComponent } from '../modals/workspace/workspaceModal.component';
import { ModalLayoutComponent } from '../modals/layout/modalLayout.component';
import { getUser } from '@collab-write/firebase';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    WorkspaceModalComponent,
    ModalLayoutComponent,
    RouterModule,
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  isUserLoading = true;
  isLoading = true;
  isModalOpen = false;
  paramId = '';
  userInfo!: UserInfoInt;
  documents: DocumentInt[] = [];

  documentsSubject = new BehaviorSubject<DocumentInt[]>([]);
  documentsSub = this.documentsSubject.asObservable();

  private subscription: Subscription = new Subscription();

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscription.add(
      this.globalService.userInfoSub.subscribe((newInfo) => {
        this.userInfo = newInfo;
      })
    );
    this.subscription.add(
      this.documentsSub.subscribe((newDocs) => {
        this.documents = newDocs;
      })
    );
    this.paramId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  async ngOnInit(): Promise<void> {
    await this.fetchUser(this.paramId);
    await this.fetchDocs(this.paramId);
  }

  setIsLoading = (state: boolean) => {
    this.setIsLoading(state);
  };

  setIsModalOpen = (state: boolean) => {
    this.isModalOpen = state;
  };

  async fetchDocs(uid: string): Promise<void> {
    try {
      this.isLoading = true;
      let docs: any[] = [];
      (await getUserDocs(uid)).docs.forEach((doc) => {
        docs.push(doc.data());
      });

      docs = docs.map((doc) => ({
        ...doc,
        createdAt: doc.createdAt.toDate().toDateString(),
        updateAt: doc.updateAt.toDate().toDateString(),
      }));
      this.setDocuments(docs);
    } catch (err) {
      this.setDocuments([]);
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  getDocuments = (): DocumentInt[] => {
    return this.documentsSubject.getValue();
  };

  setDocuments = (docs: DocumentInt[]) => {
    this.documentsSubject.next(docs);
  };

  async fetchUser(id: string): Promise<void> {
    try {
      this.isUserLoading = true;
      const userInfo = (await getUser(id)).data() as UserInfoInt;
      if (userInfo) {
        this.globalService.setIsAuth(true);
        this.globalService.setUserInfo(userInfo);
      } else this.router.navigateByUrl('/');
    } catch (err) {
      this.router.navigateByUrl('/');
      console.error(err);
    } finally {
      this.isUserLoading = false;
    }
  }

  handleOpenModal() {
    this.isModalOpen = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
