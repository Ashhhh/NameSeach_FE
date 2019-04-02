import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, startWith, debounceTime } from 'rxjs/operators';
import { NamesService } from '../../../../../app/api/services';
import { AuthService } from '../../../../../app/core/services/auth.service';

/**
 * A page for searching the APIs names database
 */
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  constructor(
    private names: NamesService,
    private auth: AuthService
  ) { }

  /**
   * Currently visible columns
   */
  public displayedColumns = ['_id', 'name'];

  /**
   * Search Input
   */
  public search = new FormControl('');

  /**
   * Observable data stream for the last known result from the API
   */
  public data$ = this.search.valueChanges
    .pipe(startWith(''))
    .pipe(debounceTime(500)) // Have mercy on the API
    .pipe(switchMap(value => {
      return this.names.getNames(value);
    }));

  /**
   * Log out of the app
   */
  logout() {
    this.auth.logout();
  }
}
