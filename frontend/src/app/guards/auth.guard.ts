import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // // Injeção de dependências:
  const authService = inject(AuthService);
  const router = inject(Router);

  // // Se o usuário estiver logado:
  if (authService.isAuthenticated()) return true;

  // Se o usuário não estiver logado:
  router.navigate(['/auth']); // navego para a página de autenticação
  return false;
};
