import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { AppService } from './app.service';

export enum HttpRequestType {
    Get, Post, Put, Delete, Patch
}

@Injectable()
export class RequestService {
    public constructor(private appService: AppService, private http: Http) { }

    public createRequest(httpRequestType: HttpRequestType, url: string, body: any, headers: Headers = null, onSuccess: Function = null, onFail: Function = null): void {
        let requestType = this.determineRequestType(httpRequestType);

        setTimeout(() => {
            this.appService.showLoader();
        });
                requestType(url, body, { headers: headers })
                    .share().finally(() =>
                        setTimeout(() => {
                            this.appService.hideLoader();
                        })
                    ).subscribe(
                        response => {
                            if (onSuccess != null) {
                                if (response._body == "")
                                    onSuccess();
                                else
                                    onSuccess(response.json());
                            }
                        },
                        error => onFail != null ? onFail(error) : this.appService.handleError(error)
                    );
    }

    private determineRequestType(httpRequestType: HttpRequestType): Function {
        let requestType: Function;

        if (httpRequestType == HttpRequestType.Get)
            requestType = (url, body, headers) => this.http.get(url, headers);
        else if (httpRequestType == HttpRequestType.Post)
            requestType = (url, body, headers) => this.http.post(url, body, headers);
        else if (httpRequestType == HttpRequestType.Put)
            requestType = (url, body, headers) => this.http.put(url, body, headers);
        else if (httpRequestType == HttpRequestType.Delete)
            requestType = (url, body, headers) => this.http.delete(url, headers);
        else
            requestType = (url, body, headers) => this.http.patch(url, body, headers);

        return requestType;
    }
}