// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string, duration: number = 3000): void {
    this.notificationSubject.next(message);
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, duration);
  }
}
