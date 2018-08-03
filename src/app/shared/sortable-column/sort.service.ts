import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SortService {

  constructor() {}

  private columnSortedService = new Subject<ColumnSortedEvent>();

  columnSorted$ = this.columnSortedService.asObservable();

  columnSorted(event: ColumnSortedEvent) {
    this.columnSortedService.next(event);
  }
}

export interface ColumnSortedEvent {
  sortColumn: string;
  sortDirection: string;
}
