import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspace-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  @Input() setIsLoading!: () => void;
}
