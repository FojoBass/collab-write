import { Injectable } from '@angular/core';
import { GlobalState, UserInfoInt } from '@collab-write/firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private initialState: GlobalState = { id: '' };
  private globalState = new BehaviorSubject<GlobalState>(this.initialState);
  currGlobalState = this.globalState.asObservable();

  isAuth: boolean = false;
  userWorkspaceInfo: UserInfoInt | null = null;
  userEditInfo: UserInfoInt | null = null;

  changeGlobalState(state: GlobalState) {
    this.globalState.next(state);
  }

  getGlobalState() {
    return this.globalState.getValue();
  }

  setIsAuth(val: boolean) {
    this.isAuth = val;
  }
}
