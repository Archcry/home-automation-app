export interface Device {
  uid: string;
  name: string;
}

export interface DeviceGroup {
  uid: string;
  name: string;
  devices: Device[];
}

export type CommandName = 'up' | 'down' | 'setDeployment' | 'wink' | 'stop' | 'my';

export interface Command {
  name: CommandName;
  parameters: string[];
}

export interface BaseSchedule {
  uid: string;
  dow: string[];
  deviceGroups: DeviceGroup[];
  command: Command;
}

export interface FixedTimeSchedule extends BaseSchedule {
  type: 'fixed_time';
  time: string;
  timezone: string;
}

export type SunCalcKind =
  | 'sunrise'
  | 'sunriseEnd'
  | 'goldenHourEnd'
  | 'solarNoon'
  | 'goldenHour'
  | 'sunsetStart'
  | 'sunset'
  | 'dusk'
  | 'nauticalDusk'
  | 'night'
  | 'nadir'
  | 'nightEnd'
  | 'nauticalDawn'
  | 'dawn';

export interface SunCalcSchedule extends BaseSchedule {
  type: 'suncalc';
  kind: SunCalcKind;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type Schedule = FixedTimeSchedule | SunCalcSchedule;
