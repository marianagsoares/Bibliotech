import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'livro'
})
export class LivroPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (value == undefined || value == null || value == "") {
      return "assets/images/livro.jpg"
    }
    return value;
  }
}
