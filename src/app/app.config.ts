import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideQuillConfig, QuillModules } from 'ngx-quill/config';
import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';

import Quill from 'quill';

const FontAttributor = Quill.import('attributors/class/font');
// @ts-ignore
FontAttributor.whitelist = [
  'Roboto'
];
// @ts-ignore
Quill.register(FontAttributor, true);
import ImageResize from 'quill-image-resize';
 

Quill.register('modules/imageHandler', ImageHandler)
Quill.register('modules/videoHandler', VideoHandler)
Quill.register('modules/imageResize', ImageResize);
const modules : QuillModules = {
  imageResize: {
    displaySize: true
  },
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': ['Arial'] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image', 'video']                         // link and image, video
  ]
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ 
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: ''
          }
        }
    }),
    provideHttpClient(withFetch()),
    provideQuillConfig({
      // modules: modules,
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    })
  ]
};
