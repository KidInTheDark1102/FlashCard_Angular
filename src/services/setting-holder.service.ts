import {Injectable} from '@angular/core';

@Injectable()
export class SettingHolderService {
  private static setting: any;
  get Setting() {
    return SettingHolderService.setting;
  }

  set Setting(value) {
    SettingHolderService.setting = value;
  }
}
