import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class ShareService {
  private static userInfoSource = new Subject<any>();
  public static userInfo = {
    isSigned: false,
    id: null,
    username:null
  };

  constructor() {}

  public static setUserInfo(userInfo){
    ShareService.userInfo=userInfo;
    ShareService.userInfoSource.next(userInfo);
  }
  public static getUserInfo(){
    return ShareService.userInfoSource.asObservable();
  }
}
