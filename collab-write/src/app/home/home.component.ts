import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModalComponent } from '../modals/home/homeModal.component';
import { ModalLayoutComponent } from '../modals/layout/modalLayout.component';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeModalComponent,
    ModalLayoutComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isModalOpen = { state: false, target: '' };

  constructor(private globalService: GlobalService) {}

  openModal(target: string) {
    this.isModalOpen = { state: true, target };
  }

  closeModal = (state: boolean) => {
    this.isModalOpen = { state, target: '' };
  };
}
