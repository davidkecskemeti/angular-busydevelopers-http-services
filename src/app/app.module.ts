import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PostComponent} from './post/post.component';
import {HttpClientModule} from '@angular/common/http';
import {PostService} from './service/post.service';
import {AppErrorHandler} from './common/app-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
