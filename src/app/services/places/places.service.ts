import { Injectable, EventEmitter } from '@angular/core';
import 'firebase/database'
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Observable, Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  DownloadUrl = new Subject
  placesUpdated = new EventEmitter()
  filePath: any

  places = [
    {
      id: 1,
      title: 'My Garden',
      description: 'near earth',
      imgUrl: '',
      price: '300',
      a_from: new Date('2020-03-17'),
      a_to: new Date('2020-03-30'),
      userId: 'abc'
    },
    {
      id: 2,
      title: 'My Garden1',
      description: 'near mars',
      imgUrl: '',
      price: '200',
      a_from: new Date('2020-03-17'),
      a_to: new Date('2020-03-30'),
      userId: 'abc'
    },
    {
      id: 3,
      title: 'My Garden3',
      description: 'near pluto',
      imgUrl: '',
      price: '500',
      a_from: new Date('2020-03-17'),
      a_to: new Date('2020-03-30'),
      userId: 'abc'


    },
    {
      id: 4,
      title: 'My Garden4',
      description: 'near sun',
      imgUrl: '',
      price: '900',
      a_from: new Date('2020-03-17'),
      a_to: new Date('2020-03-30'),
      userId: 'abc'
    },

  ]

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  getPlaces() {

    // return this.places
    return this.db.list('offered-places').snapshotChanges()
  }

  findPlaceById(id) {
    // return this.places.find(pl => {
    //   return pl.id == id
    // })
    return this.db.object('offered-places/' + id).snapshotChanges()
  }

  AddPlaces(data, file) {
    const newPlace = {
      id: Math.random(),
      title: data.title,
      description: data.description,
      price: data.price,
      imgUrl: "",
      a_from: data.available_from,
      a_to: data.available_to,
      location: { ...data.location },
      userId: 'abc',
    }
    this.uploadFile(file).then(() => {
      this.storage.ref(this.filePath).getDownloadURL().subscribe(url => {
        newPlace.imgUrl = url
        this.db.list('offered-places').push(newPlace).then((data) => {
          console.log('pshefd')
          this.placesUpdated.emit(data)
        })
      })
    })
    //  this.DownloadUrl.subscribe((url: any) => {
    //   newPlace.imgUrl = url
    //   this.db.list('offered-places').push(newPlace).then((data) => {
    //     console.log('pshefd')
    //     this.placesUpdated.emit(data)
    //   })

    // })


    // let task = this.storage.upload('/path', id)
    // const newPlace = { id: 5, ...data, userId: 'abc' }
    // return this.db.list('offered-places').push(newPlace)
    // this.places.push(newPlace)
    // this.placesUpdated.emit(this.places)
  }


  uploadFile(file) {
    console.log(file)
    const filePath = '/app/' + `${new Date().getTime()}.${file.name.split('.').pop()}`;
    this.filePath = filePath
    return this.storage.upload(filePath, file)
  }

  updateOffer(data, file) {
    const updatedData = { ...data }


    // const index = this.places.findIndex(pl => pl.id == data.id)
    // const updatedData = data
    delete updatedData.key


    if (file) {
      return this.uploadFile(file).then(() => {
        this.storage.ref(this.filePath).getDownloadURL().subscribe(url => {
          this.db.object('offered-places/' + data.key).update({ imgUrl: url, ...updatedData }).then((data: any) => {
            console.log(data)
            this.placesUpdated.emit(data)
          })
        })
      })
    }

    this.db.object('offered-places/' + data.key).update(updatedData).then((data: any) => {
      this.placesUpdated.emit(data)
    })



    //  this.db.object('offered-places/' + data.key).update(updatedData)
    // this.places[index] = updatedData
  }

}
