import { Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { EditorComponent } from './editor/editor.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Create or Join',
  },
  {
    path: 'w/:id',
    title: 'Workspace',
    component: WorkspaceComponent,
  },
  {
    path: 'w/:id/:projectId',
    title: 'Editor',
    component: EditorComponent,
  },
  {
    path: '**',
    title: '404',
    component: NotFoundComponent,
  },
];
