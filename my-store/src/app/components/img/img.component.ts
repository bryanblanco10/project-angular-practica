import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  img = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') set changeImg(newImg: string) {
    this.img = newImg;
    console.log('Just change', this.img);
  }
  @Output() loaded = new EventEmitter<string>();
  imgDefault =
    'https://media.istockphoto.com/id/1367855191/es/vector/galer%C3%ADa-de-im%C3%A1genes-icono-s%C3%B3lido.jpg?s=612x612&w=0&k=20&c=KoMnLf8b5nFpOR4F4mM8JwJkRKn2HN9QQlt-xXroxmc=';
  counter = 0;
  counterFn: number | undefined;
  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('loaded');
    this.loaded.emit(this.img);
  }

  constructor() {
    //before render
    //No async -- once time
    console.log('contructor', 'imageValue=>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    //Before  - during render
    //changes input - times
    console.log('ngOnChanges', 'imageValue=>', this.img);
    console.log(changes);
  }

  ngOnInit() {
    //Before render
    //Async - fetch, promises -- once time
    console.log('ngOnInit', 'imageValue=>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter++;
    //   console.log(this.counter);
    // }, 1000);
  }

  ngAfterViewInit() {
    //After render
    //handler children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //Delete component
    window.clearInterval(this.counterFn);
    console.log('ngOnDestroy');
  }
}
