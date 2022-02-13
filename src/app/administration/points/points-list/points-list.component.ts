import { Component, OnInit } from '@angular/core';
import { ObservableList } from 'src/app/core/models/common';
import { UserPointsItem } from 'src/app/core/models/users';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-points-list',
    templateUrl: './points-list.component.html'
})
export class PointsListComponent implements OnInit {
    points: ObservableList<UserPointsItem>;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.points = this.userService.getPointsLeaderboard();
    }

}
