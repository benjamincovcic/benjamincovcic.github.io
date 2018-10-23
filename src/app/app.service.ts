import { Injectable } from '@angular/core';

declare let $, moment;

@Injectable()
export class AppService {
    private createdRequests: number = 0;
    private finishedRequests: number = 0;
    public isLoaderShown: boolean = false;

    private lastErrorTimeStamp: Date = new Date();
    private lastErrorMessage: string = '';

    public showLoader(): void {
        this.createdRequests++;
        this.isLoaderShown = true;
    }

    public hideLoader(): void {
        if (++this.finishedRequests == this.createdRequests)
            this.isLoaderShown = false;
    }

    public createDeepCopy(object: any): any {
        return $.extend(true, {}, object);
    }

    public handleError(error: any): void {
        let message: string = '';
        let now: Date = new Date();

        try {
            message = error.json().Message || error.json().ExceptionMessage;
        } catch (exception) {
            //message = this.messages.generalError;
        }

        if (message != this.lastErrorMessage || (now.getTime() - this.lastErrorTimeStamp.getTime()) > 1000) {
            //this.showNotification(message, NotificationType.Error);
            this.lastErrorTimeStamp = now;
            this.lastErrorMessage = message;
        }
    }

    public showNotification(message: string, type: string): void {
        /*$.notify({
            message: message
        },
        {
            type: type,
            newest_on_top: true,
            delay: 5000,
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close notify-custom" data-notify="dismiss"><span>&times;</span></button>' +
            '<span data-notify="title">{1}</span>' +
            '<span data-notify="message">{2}</span>' +
            '</div>'
        });*/
    }
}
