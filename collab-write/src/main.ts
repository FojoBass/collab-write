import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { GlobalService } from './app/services/global.service';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    const injector = appRef.injector;
    const globalService = injector.get(GlobalService);

    (window as any).globalService = globalService;
  })
  .catch((err) => console.error(err));
