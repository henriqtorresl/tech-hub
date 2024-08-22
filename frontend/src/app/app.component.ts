import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private webSocketService: WebSocketService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      input: ['']
    })
  }

  emitEvent(): void {
    const msg = this.form.value.input;
    this.webSocketService.messageEvent(msg);
    this.form.setValue({
      input: ''
    });
  }

}
