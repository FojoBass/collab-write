import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-workspace-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workspaceModal.component.html',
})
export class WorkspaceModalComponent {
  @Input() uid!: string;
  newDocForm = new FormGroup({
    title: new FormControl(''),
  });
}
