import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modalLayout.component.html',
})
export class ModalLayoutComponent {
  @Input() closeModal!: (state: boolean) => void;

  handleModalClose(evt: MouseEvent) {
    if (evt.target === evt.currentTarget) {
      this.closeModal(false);
    }
  }
}
