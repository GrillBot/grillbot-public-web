import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChannelsRoutingModule } from './channels-routing.module';
import { ChannelboardComponent } from './channelboard/channelboard.component';

@NgModule({
    declarations: [
        ChannelboardComponent
    ],
    imports: [
        SharedModule,
        ChannelsRoutingModule
    ]
})
export class ChannelsModule { }
