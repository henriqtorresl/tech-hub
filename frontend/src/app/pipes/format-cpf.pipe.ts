import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCpf'
})
export class FormatCpfPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return '';
    
    // Remove qualquer caractere que não seja dígito
    value = value.replace(/\D/g, '');
    
    // Adiciona a máscara do CPF
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length <= 9) {
      return value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
  }

}
