import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone'
})
export class FormatPhonePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return '';

    // Remove qualquer caractere que não seja dígito
    const cleanedValue = value.replace(/\D/g, '');

    // Verifica o comprimento e aplica o formato adequado
    if (cleanedValue.length === 10) {
      // Formato (61) 8444-1480
      return cleanedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (cleanedValue.length === 11) {
      // Formato (61) 98444-1480
      return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
      // Retorna o valor original se o comprimento não corresponder a um número de telefone
      return value;
    }
  }

}
