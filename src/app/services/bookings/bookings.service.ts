import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'firebase/database'
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  bookingsUpdate = new Subject
  bookings = []
  constructor(private db :  AngularFireDatabase) { }

  getBookings() {
    // return this.db.list('bookings').snapshotChanges()
   return  this.db.list('bookings', ref => ref.orderByChild('userId').equalTo('zyz')).snapshotChanges()
  }

  addBookings(data) {
    return this.db.list('bookings').push({ id: Math.random(), ...data, userId : 'abc' })
    // this.bookings.push({ id: Math.random(), ...data })
    // console.log(this.bookings)

  }

  cancelBooking(id) {
    return this.db.list('bookings/'+id).remove()
    // this.bookings = this.bookings.filter(bo => {
    //   return bo.id != id
    // })
    // this.bookingsUpdate.next(this.bookings)
  }

}
