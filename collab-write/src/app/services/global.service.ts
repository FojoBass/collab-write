import { Injectable, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GlobalState, UserInfoInt } from '@collab-write/firebase';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormErrorInt } from '@collab-write/firebase';

@Injectable({
  providedIn: 'root',
})
export class GlobalService implements OnDestroy {
  private initialState: GlobalState = { id: '' };
  private globalStateSubject = new BehaviorSubject<GlobalState>(
    this.initialState
  );
  private formErrSubject = new BehaviorSubject<FormErrorInt>({
    msg: '',
    targetId: '',
  });
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  private userInfoSubject = new BehaviorSubject<UserInfoInt>({
    name: '',
    uid: '',
  });
  globalStateSub = this.globalStateSubject.asObservable();
  formErrorSub = this.formErrSubject.asObservable();
  isAuthSub = this.isAuthSubject.asObservable();
  userInfoSub = this.userInfoSubject.asObservable();
  private subscription: Subscription = new Subscription();
  uid = '';

  userWorkspaceInfo: UserInfoInt | null = null;
  userEditInfo: UserInfoInt | null = null;

  constructor() {
    this.subscription.add(
      this.formErrorSub.subscribe((error) => {
        if (error.msg && error.targetId) {
          setTimeout(() => {
            this.setFormErr({ msg: '', targetId: '' });
          }, 2500);
        }
      })
    );
  }

  changeGlobalState = (state: GlobalState) => {
    this.globalStateSubject.next(state);
  };

  getGlobalState() {
    return this.globalStateSubject.getValue();
  }

  setFormErr(obj: FormErrorInt) {
    this.formErrSubject.next(obj);
  }

  setIsAuth(val: boolean) {
    this.isAuthSubject.next(val);
  }

  setUserInfo(info: UserInfoInt) {
    this.userInfoSubject.next(info);
  }

  getFormErr(): FormErrorInt {
    return this.formErrSubject.getValue();
  }

  setStorageId(uid: string) {
    sessionStorage.setItem('collab-write-uid', JSON.stringify({ uid }));
  }

  getStorageId(): string {
    const store = sessionStorage.getItem('collab-write-uid')
      ? JSON.parse(sessionStorage.getItem('collab-write-uid')!)
      : { uid: '' };
    return store.uid;
  }

  setCollabId(uid: string) {
    sessionStorage.setItem('collab-write-co-id', JSON.stringify({ uid }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
