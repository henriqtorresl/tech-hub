import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCpf'
})
export class MaskCpfPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return '***.***' + value.slice(7);
  }

}
