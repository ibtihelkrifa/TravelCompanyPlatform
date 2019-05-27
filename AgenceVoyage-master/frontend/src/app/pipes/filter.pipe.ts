import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/flight';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Flight[], searchText: string): any {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter(item => item.city.name.toLowerCase().includes(searchText.toLowerCase()))
  }

}
