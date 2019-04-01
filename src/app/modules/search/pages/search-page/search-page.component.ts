import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, startWith, debounceTime } from 'rxjs/operators';
import { NamesService } from 'src/app/api/services';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  constructor(
    private names: NamesService
  ) { }

  public displayedColumns = ['_id', 'name'];
  public search = new FormControl('');
  public data$ = this.search.valueChanges
    .pipe(startWith(''))
    .pipe(debounceTime(500))
    .pipe(switchMap(value => {
      return this.names.getNames(value);
    }));

}
