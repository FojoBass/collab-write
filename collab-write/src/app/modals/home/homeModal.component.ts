import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import {
  CollaboInt,
  DocumentInt,
  FormErrorInt,
  getDocReq,
  isEmpty,
  updateDocReq,
  UserInfoInt,
  validateName,
} from '@collab-write/firebase';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import ShortUniqueId from 'short-unique-id';
import { Subscription } from 'rxjs';
import { createWorkspaceReq } from '@collab-write/firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './homeModal.component.html',
})
export class HomeModalComponent {
  private subscription: Subscription = new Subscription();
  @Input() target: string = '';
  userWorkspaceInfo: UserInfoInt | null = null;
  userEditInfo: UserInfoInt | null = null;
  authForm = new FormGroup({
    fullName: new FormControl(''),
    docId: new FormControl(''),
  });
  formError!: FormErrorInt;
  loading = false;

  constructor(private globalService: GlobalService, private router: Router) {
    this.userWorkspaceInfo = this.globalService.userWorkspaceInfo;
    this.userEditInfo = this.globalService.userEditInfo;
    this.subscription.add(
      this.globalService.formErrorSub.subscribe((error) => {
        this.formError = error;
      })
    );
  }

  async createWorkspace() {
    const fullName = this.authForm.value.fullName?.trim() ?? '';
    const docId = this.authForm.value.docId?.trim() ?? '';

    if (this.target !== 'edit') {
      if (fullName && validateName(fullName)) {
        const uid = new ShortUniqueId().rnd(6);
        const data: UserInfoInt = { name: fullName, uid };

        try {
          this.loading = true;
          await createWorkspaceReq(data);
          this.globalService.setIsAuth(true);
          this.globalService.setStorageId(uid);
          this.router.navigateByUrl(`w/${uid}`);
        } catch (err) {
          this.globalService.setFormErr({
            targetId: 'failed',
            msg: 'Failed!',
          });
          console.error(err);
        } finally {
          this.loading = false;
        }
      } else {
        this.globalService.setFormErr({
          targetId: 'fullName',
          msg: 'Enter full name',
        });
      }
    } else {
      if (validateName(fullName) && !isEmpty(docId)) {
        try {
          this.loading = true;
          const doc = (await getDocReq(docId)).data() as
            | DocumentInt
            | undefined;

          if (doc) {
            const collab: CollaboInt = {
              isGranted: false,
              isRequest: false,
              name: fullName,
              uid: new ShortUniqueId().rnd(6),
            };
            const data: Partial<DocumentInt> = {
              collborators: [...doc.collborators, collab],
              id: doc.id,
            };
            await updateDocReq(data);
            this.globalService.setCollabId(collab.uid);
            this.router.navigateByUrl(`w/${doc.uid}/${doc.id}`);
          } else
            this.globalService.setFormErr({
              targetId: 'docId',
              msg: 'Enter valid id',
            });
        } catch (err) {
          this.globalService.setFormErr({
            targetId: 'failed',
            msg: 'Failed!',
          });
          console.error(err);
        } finally {
          this.loading = false;
        }
      } else {
        if (!validateName(fullName))
          this.globalService.setFormErr({
            targetId: 'fullName',
            msg: 'Enter full name',
          });
        else
          this.globalService.setFormErr({
            targetId: 'docId',
            msg: 'Enter valid id',
          });
      }
    }
  }
}
