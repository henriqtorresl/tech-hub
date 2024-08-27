import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginBody, RegisterBody } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: string = '<TechHub />';
  @ViewChild('loginRef') loginRef!: ElementRef;
  @ViewChild('registerRef') registerRef!: ElementRef;
  @ViewChild('loginPassword') loginPasswordRef!: ElementRef;
  @ViewChild('registerPassword') registerPassword!: ElementRef;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      cpf: [''],
      password: ['']
    });
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      cpf: [''],
      email: [''],
      phone: [''],
      password: ['']
    });
  }

  switchToRegister(): void {
    this.loginRef.nativeElement.style.display = 'none';
    this.registerRef.nativeElement.style.display = 'flex';

    this.registerRef.nativeElement.classList.add('slide-in');
    this.loginForm.reset();
  }

  switchToLogin(): void {
    this.registerRef.nativeElement.style.display = 'none';
    this.loginRef.nativeElement.style.display = 'flex';

    this.loginRef.nativeElement.classList.add('slide-in');
    this.registerForm.reset();
  }

  visibleLoginPassword(): void {
    const inputType = this.loginPasswordRef.nativeElement.getAttribute("type");
    this.loginPasswordRef.nativeElement.setAttribute("type", inputType === "password" ? "text" : "password");
  }

  visibleRegisterPassword(): void {
    const inputType = this.registerPassword.nativeElement.getAttribute("type");
    this.registerPassword.nativeElement.setAttribute("type", inputType === "password" ? "text" : "password");
  }

  login(): void {
    const user: LoginBody = {
      cpf: this.loginForm.value.cpf,
      password: this.loginForm.value.password
    }

    // Implementar a lógica dos validadores de formulario, pra validar o formato do cpf

    this.authService.login(user).subscribe((response) => {

      localStorage.setItem('token', response.token);
      localStorage.setItem('idUser', response.usuario.id_usuario.toString());

      this.snackbar.open(response.msg, 'OK', {
        duration: 2500
      });

      this.router.navigate(['/home']);
    },
    (err) => {
      const response = err.error;

      this.snackbar.open(response.msg, 'OK', {
        duration: 2500
      });
    });
  }

  register(): void {
    const newUser: RegisterBody = {
      name: this.registerForm.value.name,
      cpf: this.registerForm.value.cpf,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password
    }

    this.authService.register(newUser).subscribe((response) => {
      this.snackbar.open(response.msg, 'OK', {
        duration: 2500
      });
      this.switchToLogin();
    },
    (err) => {
      const response = err.error;

      this.snackbar.open(response.msg, 'OK', {
        duration: 2500
      });
    });
  }

}