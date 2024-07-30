import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from '@collab-write/editor';
import { GlobalService } from '../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getUser, UserInfoInt } from '@collab-write/firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('reactRoot') reactRoot!: ElementRef<HTMLDivElement>;
  paramId = '';
  userInfo!: UserInfoInt;
  private subscription: Subscription = new Subscription();
  isLoading = true;

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const storeUid = this.globalService.getStorageId();
    const paramUid = this.route.snapshot.paramMap.get('id');
    this.globalService.setIsAuth(storeUid === paramUid);
    storeUid === paramUid && this.fetchUser(storeUid);
  }

  async fetchUser(id: string): Promise<void> {
    try {
      this.isLoading = true;
      const userInfo = (await getUser(id)).data() as UserInfoInt;

      this.globalService.setIsAuth(true);
      this.globalService.setUserInfo(userInfo);
    } catch (err) {
      this.globalService.setIsAuth(false);
      this.router.navigateByUrl('/');
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  ngAfterViewInit(): void {
    const root = createRoot(this.reactRoot.nativeElement);
    root.render(React.createElement(App));
  }
}
