export interface Device {
  uid: string;
  name: string;
}

export interface DeviceGroup {
  uid: string;
  name: string;
  devices: Device[];
}

export type CommandName =
  | "up"
  | "down"
  | "setDeployment"
  | "wink"
  | "stop"
  | "my";

export interface Command {
  name: CommandName;
  parameters: string[];
}
