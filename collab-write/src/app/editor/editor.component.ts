import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Editor } from '@collab-write/editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('reactRoot') reactRoot!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const root = createRoot(this.reactRoot.nativeElement);
    root.render(React.createElement(Editor));
  }
}
