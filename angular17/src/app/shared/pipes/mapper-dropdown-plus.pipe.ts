/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { DropdownPlus } from '@models/interfaces';

@Pipe({
  name: 'mapperDropdownPlus',
  standalone: true
})
export class MapperDropdownPlusPipe implements PipeTransform {

  transform(array: any, args: [string, string]): DropdownPlus[] {
    return array && array.length > 0
      ? array.map((item: { [x: string]: any; }) => ({ name: item[args[0]], value: item[args[1]] }))
      : array;
  }

}
