import { Component, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserInfoInt } from '@collab-write/firebase';
import { GlobalService } from './services/global.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  userInfo: UserInfoInt | null = null;
  userEditInfo: UserInfoInt | null = null;
  isAuth!: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private globalService: GlobalService) {
    this.userEditInfo = this.globalService.userEditInfo;
    this.subscription.add(
      this.globalService.isAuthSub.subscribe((val) => {
        this.isAuth = val;
      })
    );
    this.subscription.add(
      this.globalService.userInfoSub.subscribe((newInfo) => {
        this.userInfo = newInfo;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
