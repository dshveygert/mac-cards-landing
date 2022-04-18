import {SubscriptionLike} from 'rxjs';

export function fullUnsubscribe(list: SubscriptionLike[]): void {
  let i = list.length;
  do {
    list[i]?.unsubscribe();
    i--;
    console.log(i);
  } while (i > 0);
}
