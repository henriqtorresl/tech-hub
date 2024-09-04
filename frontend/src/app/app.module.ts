import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MaskCpfPipe } from './pipes/mask-cpf.pipe';
import { PostComponent } from './components/post/post.component';
import { FormatCpfPipe } from './pipes/format-cpf.pipe';
import { FormatPhonePipe } from './pipes/format-phone.pipe';
import { ConversationComponent } from './components/conversation/conversation.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    MenuBarComponent,
    ChatComponent,
    ProfileComponent,
    MaskCpfPipe,
    PostComponent,
    FormatCpfPipe,
    FormatPhonePipe,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
