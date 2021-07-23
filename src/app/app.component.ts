import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRM';
  currentRoute :string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    Feather.replace();
    this.router.events
      .pipe(
        filter( (event: RouterEvent) => event instanceof NavigationEnd),
      ).subscribe( (event: RouterEvent) => {
        this.currentRoute = event.url;
        debugger
      })
  }

  ngAfterViewInit() {
    Feather.replace();
 
  }


}
