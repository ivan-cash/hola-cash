import { v4 as uuidv4 } from 'uuid';

import { createDateOffset } from '.';
import base64 from './base64';
import { METADATA_KEYS } from '../constants';

export const generateAntiFraudHeaders = async () => {
  let batteryData = {};
    try {
      const BatteryManager = await window.navigator.getBattery();
      batteryData = {
        [METADATA_KEYS.BATTERY_LEVEL]: BatteryManager.level,
        [METADATA_KEYS.IS_BATTERY_CHARGING]: BatteryManager.charging,
      };
    } catch (e) {
      // TODO: handle error
    }

    const res = await fetch('https://api.ipify.org/?format=json').then(response => response.json());

    const timeZoneData = createDateOffset(new Date());

    const fraudMetadata = {
        [METADATA_KEYS.DEVICE_ID]: MediaDeviceInfo.deviceId || uuidv4(),
        [METADATA_KEYS.IP_ADDRESS]: res?.ip,
        [METADATA_KEYS.USER_AGENT]: navigator.userAgent,
        [METADATA_KEYS.IS_CONNECTED_TO_WIFI]: navigator.onLine,
        [METADATA_KEYS.TIME_ZONE]: timeZoneData,
        ...batteryData,
    };

    return base64.encode(JSON.stringify(fraudMetadata));
};