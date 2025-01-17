import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventMessage } from '../models/events';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  readonly eventSubject = new BehaviorSubject<EventMessage>({type:"", data:""});

  emit(msg: EventMessage) {
    this.eventSubject.next(msg);
  }

  changes() {
    return this.eventSubject.asObservable();
  }
}

