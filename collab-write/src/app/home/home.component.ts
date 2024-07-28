import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModalComponent } from '../modals/home/homeModal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeModalComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isModalOpen = { state: false, target: '' };

  openModal(target: string) {
    this.isModalOpen = { state: true, target };
  }

  closeModal = (state: boolean) => {
    this.isModalOpen = { state, target: '' };
  };
}
