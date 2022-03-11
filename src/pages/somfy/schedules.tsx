import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../components/auth/auth-context';
import { Layout } from '../../components/layout/layout';
import { FixedTimeScheduleCard } from '../../components/shutter/fixed-time-schedule-card';
import { SunCalcScheduleCard } from '../../components/shutter/suncalc-schedule-card copy';
import { DeviceGroup, Schedule } from './types';

export const Schedules = () => {
  const apiUrl = window._env_.SOMFY_API_URL;

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { username, password } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${apiUrl}/shutter/schedules`, {
        auth: {
          username: username ?? '',
          password: password ?? '',
        },
      })
      .then((response) => setSchedules(response.data));
  }, [apiUrl, username, password]);

  const sendCommand = (deviceGroups: DeviceGroup[], command: string) => {
    const devices = Array.from(new Set(deviceGroups.flatMap((dg) => dg.devices)));

    axios.post(
      `${apiUrl}/shutter/${command}`,
      {
        devices: devices.map((device) => device.uid),
      },
      {
        auth: {
          username: username ?? '',
          password: password ?? '',
        },
      }
    );
  };

  return (
    <Layout>
      <Grid container spacing={2} direction="row" alignItems="flex-start">
        {schedules.map((schedule) => (
          <>
            {schedule.type === 'fixed_time' && (
              <FixedTimeScheduleCard schedule={schedule} sendCommand={sendCommand} key={schedule.uid} />
            )}
            {schedule.type === 'suncalc' && (
              <SunCalcScheduleCard schedule={schedule} sendCommand={sendCommand} key={schedule.uid} />
            )}
          </>
        ))}
      </Grid>
    </Layout>
  );
};
