import {Directive, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SortService} from './sort.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appSortedTable]'
})
export class SortedTableDirective implements OnInit, OnDestroy {

  constructor(private sortService: SortService) { }

  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  ngOnInit() {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
