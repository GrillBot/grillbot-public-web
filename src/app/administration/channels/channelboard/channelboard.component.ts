import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/core/services/channel.service';
import { ChannelboardItem } from 'src/app/core/models/channels';

@Component({
    selector: 'app-channelboard',
    templateUrl: './channelboard.component.html'
})
export class ChannelboardComponent implements OnInit {
    data: ChannelboardItem[];

    constructor(
        private channelService: ChannelService
    ) { }

    ngOnInit(): void {
        this.channelService.getChannelboard().subscribe(data => this.data = data);
    }

}
