import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { ObservableList } from "../models/common";
import { UserPointsItem } from "../models/users";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class PointsService {
    constructor(private base: BaseService) { }

    getPointsLeaderboard(): ObservableList<UserPointsItem> {
        const url = this.base.createUrl('user/points/board');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UserPointsItem[]>(url, { headers }).pipe(
            map(data => data.map(o => UserPointsItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
