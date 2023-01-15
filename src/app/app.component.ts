import { ThisReceiver } from '@angular/compiler';
import {Component, HostListener} from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  });

  // carsData = [
  //   {
  //     img: 'car_1.jpg',
  //     name: 'Lamborghini Huracan Spyder',
  //     transmission: 'автомат',
  //     engine: 5.2,
  //     year: 2019,
  //   },
  //   {
  //     img: 'car_2.jpg',
  //     name: 'Chevrolet Corvette',
  //     transmission: 'автомат',
  //     engine: 6.2,
  //     year: 2017,
  //   },
  //   {
  //     img: 'car_3.jpg',
  //     name: 'Ferrari California',
  //     transmission: 'автомат',
  //     engine: 3.9,
  //     year: 2010,
  //   },
  //   {
  //     img: 'car_4.jpg',
  //     name: 'Lamborghini Huracan Spyder',
  //     transmission: 'автомат',
  //     engine: 4.0,
  //     year: 2019,
  //   },
  //   {
  //     img: 'car_5.jpg',
  //     name: 'Audi R8r',
  //     transmission: 'автомат',
  //     engine: 5.2,
  //     year: 2018,
  //   },
  //   {
  //     img: 'car_6.jpg',
  //     name: 'Аренда Chevrolet Camaro',
  //     transmission: 'автомат',
  //     engine: 2.0,
  //     year: 2019,
  //   },
  //   {
  //     img: '7.png',
  //     name: 'Maserati Quattroporte',
  //     transmission: 'автомат',
  //     engine: 3.0,
  //     year: 2018,
  //   },
  //   {
  //     img: '8.png',
  //     name: 'Dodge Challenger',
  //     transmission: 'автомат',
  //     engine: 6.4,
  //     year: 2019,
  //   },
  //   {
  //     img: '9.png',
  //     name: 'Nissan GT-R',
  //     transmission: 'автомат',
  //     engine: 3.8,
  //     year: 2019,
  //   },
  // ];
  
  carsData: any;

  constructor (private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData().subscribe(carsData => this.carsData = carsData);
  }


  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForm.patchValue({car: car.name});
    }
  }

  trans: any;
@HostListener('document:mousemove', ['$event'])
onMouseMove(e: MouseEvent) {
  this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
}

bgPos: any;
@HostListener('document:scroll', ['$event'])
onScroll() {
  this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
}

  onSubmit() {
    if (this.priceForm.valid) {

      this.appService.sendQuery(this.priceForm.value)
      .subscribe(
        {
          next: (response: any) => {
            alert(response.message);
            this.priceForm.reset();
          },
          error: (response) => {
            alert(response.error.message);
          }
        }
      );
    }
  }
}
