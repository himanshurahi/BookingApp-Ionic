import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService } from 'src/app/services/places/places.service';
import { Subject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';



@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterViewInit {
  places = []
  isLoading = false
  _videoPlayer
  _url
  

  constructor(private placesService: PlacesService, private AuthService: AuthService, private loadingController: LoadingController, private http: HttpClient, private alertController: AlertController) { }


  ngOnInit() {

    Plugins.StatusBar.setBackgroundColor({
      color: '#3880ff'
    })

    console.log('search Page init')

    
    // Plugins.Network.addListener('networkStatusChange', (status:any) => {
    //   console.log(status);
    //   this.alertController.create({
    //     header: 'Alert',
    //     subHeader: 'Subtitle',
    //     message: `${status.connected} And ${status.connected}`,
    //     buttons: ['OK']
    //   }).then(el => {
    //     el.present()
    //   })
    // });

    Plugins.Network.getStatus().then((data: any) => {
      if (data.connected == false) {
        this.alertController.create({
          header: 'Alert',
          message: 'No Internet Connection.',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Exit',
              handler: () => {
                navigator['app'].exitApp()
              }
            }
          ]
        }).then(el => {
          el.present()
        })
      } else {
        this.isLoading = true;
        this.presentLoading().then(el => {
          el.present()
          this.placesService.getPlaces().pipe(map(d => {
            return d.map((p: any) => {
              return { key: p.key, ...p.payload.val() }
            })
          })).subscribe(data => {
            console.log(data)
            this.isLoading = false;
            this.places = data;
            el.dismiss()
          })
        })

        console.log(this.places)
      }
    })



    // console.log(new Date('3-3-2020'))
  }

  segmentChanged(event) {
    console.log(event.detail)
    if (event.detail.value == "all") {
      this.placesService.getPlaces().pipe(map(d => {
        return d.map((p: any) => {
          return { key: p.key, ...p.payload.val() }
        })
      })).subscribe(data => {
        this.places = data
      })
    } else {
      this.placesService.getPlaces().pipe(map(d => {
        return d.map((p: any) => {
          return { key: p.key, ...p.payload.val() }
        })
      })).subscribe(data => {
        this.places = data
      })
      console.log(this.places)
    }
  }

  

  presentLoading() {
    const loading = this.loadingController.create({
      message: 'Please wait...',
    });
    return loading
  }

   ngAfterViewInit() {
    
      // this.vgPlayer.fsAPI.toggleFullscreen(this.vgPlayer)
   

  }

  toggleFullscreen(event){
    console.log(event)
  }






}
