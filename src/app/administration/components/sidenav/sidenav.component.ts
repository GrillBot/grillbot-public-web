import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    activeRoute: string;

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {
        this.activeRoute = this.router.url;
        this.router.events
            .pipe(filter(o => o instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.activeRoute = e.url);
    }
}
