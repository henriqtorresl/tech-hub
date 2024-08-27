import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

  cpfValidator(cpf: string): boolean {
    // Remove qualquer caractere que não seja dígito
    const cleanedValue = cpf.replace(/\D/g, '');

    // Verifica se o valor está no formato correto '123.456.789-10'
    const isValidFormat = /^(\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(cpf);

    // Verifica se a entrada contém apenas números e se está no formato correto
    if (cleanedValue.length !== 11 || !isValidFormat) {
      return  false;
    }

    return true;
  }

  phoneValidator(phone: string): boolean {
    // Remove qualquer caractere que não seja dígito
    const cleanedValue = phone.replace(/\D/g, '');
  
    // Verifica se o valor está no formato correto '(61) 98444-1480' ou '(61) 8444-1480'
    const isValidFormat = /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
  
    // Verifica se a entrada contém 10 ou 11 dígitos
    const isValidLength = cleanedValue.length === 10 || cleanedValue.length === 11;
  
    // Verifica se a entrada contém apenas números e se está no formato correto
    if (!isValidLength || !isValidFormat) {
      return false;
    }
  
    return true;
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

    if (!this.cpfValidator(user.cpf) && user.cpf != '') {
      this.snackbar.open('CPF inválido', 'OK', {
        duration: 2500
      });

      return;
    }

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

    if (!this.cpfValidator(newUser.cpf) && newUser.cpf != '') {
      this.snackbar.open('CPF inválido', 'OK', {
        duration: 2500
      });

      return;
    }

    if (!this.phoneValidator(newUser.phone) && newUser.phone != '') {
      this.snackbar.open('Número de telefone inválido', 'OK', {
        duration: 2500
      });

      return;
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