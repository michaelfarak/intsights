import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { Intsights } from './interfaces/intsights.interface';
import { IntsightsService } from './services/intsights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  defaultSource: string = 'BlackMarkets';
  intsights$: Observable<Intsights>;
  sourcesListObject = {};
  form = new FormGroup({
    source: new FormControl(this.defaultSource, Validators.required)
  });

  constructor(private intsightsService: IntsightsService) {}

  ngOnInit(): void {
    this.intsights$ = this.intsightsService.getIntsightsBySourceType(this.defaultSource).pipe(
      tap(data => {
        for (let key of data.uniqueSourceTypes){
          this.sourcesListObject[key] = this.camelCaseToWords(key);
        }
      })
    )
  }

  changeSource(source){
    this.intsights$ = this.intsightsService.getIntsightsBySourceType(source.target.value)
  }

  private camelCaseToWords(str) {
    return str
      .replace(/^[a-z]/g, char => ` ${char.toUpperCase()}`)
      .replace(/[A-Z]|[0-9]+/g, ' $&')
      .replace(/(?:\s+)/, char => '');
  };


}
