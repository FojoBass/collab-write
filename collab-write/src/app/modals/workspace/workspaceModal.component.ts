import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import {
  createDocReq,
  DocumentInt,
  FormErrorInt,
  validateName,
  validatTitle,
} from '@collab-write/firebase';
import { Subscription } from 'rxjs';
import { serverTimestamp } from 'firebase/firestore';
import ShortUniqueId from 'short-unique-id';

@Component({
  selector: 'app-workspace-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workspaceModal.component.html',
})
export class WorkspaceModalComponent {
  private subscription: Subscription = new Subscription();
  @Input() uid!: string;
  @Input() setDocs!: (docs: DocumentInt[]) => void;
  @Input() getDocs!: () => DocumentInt[];
  @Input() setModal!: (state: boolean) => void;
  newDocForm = new FormGroup({
    title: new FormControl(''),
  });
  formError!: FormErrorInt;
  loading = false;

  constructor(private globalService: GlobalService) {
    this.subscription.add(
      this.globalService.formErrorSub.subscribe((error) => {
        this.formError = error;
      })
    );
  }

  async createDoc() {
    const title = this.newDocForm.value.title?.trim() ?? '';
    const msg = validatTitle(title);
    const data: DocumentInt = {
      createdAt: serverTimestamp(),
      id: new ShortUniqueId().rnd(6),
      title,
      uid: this.uid,
      updateAt: serverTimestamp(),
      collborators: [],
      content: '',
    };

    if (!msg) {
      try {
        this.loading = true;
        await createDocReq(data);
        const iniDocs = this.getDocs();
        const finalDocs = [
          ...iniDocs,
          {
            ...data,
            createdAt: new Date().toDateString(),
            updateAt: new Date().toDateString(),
          },
        ];
        this.setDocs(finalDocs);
        this.setModal(false);
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
        targetId: 'title',
        msg,
      });
    }
  }
}
