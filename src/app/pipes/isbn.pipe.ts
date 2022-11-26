import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  transform(value: string): string {
    const isbn = value.replace(
      /(\d{3})(\d{1})(\d{2})(\d{6})(\d{1})/,
      '$3-$1-$2-$6-$1'
    )
    return isbn;
  }
}
