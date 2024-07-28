import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserInfoInt } from '@collab-write/firebase';
import { GlobalService } from './services/global.service';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  userWorkspaceInfo: UserInfoInt | null = null;
  userEditInfo: UserInfoInt | null = null;

  constructor(private globalService: GlobalService) {
    this.userWorkspaceInfo = this.globalService.userWorkspaceInfo;
    this.userEditInfo = this.globalService.userEditInfo;
  }

  title = 'collab-write';
}
