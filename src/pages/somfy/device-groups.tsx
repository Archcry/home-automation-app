import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Button, ButtonGroup, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../../components/auth/auth-context';
import { Layout } from '../../components/layout/layout';
import { Device, DeviceGroup } from './types';

export const DeviceGroups = () => {
  const apiUrl = window._env_.SOMFY_API_URL;

  const [deviceGroups, setDeviceGroups] = useState<DeviceGroup[]>([]);
  const { username, password } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${apiUrl}/shutter/deviceGroups`, {
        auth: {
          username: username ?? '',
          password: password ?? '',
        },
      })
      .then((response) => setDeviceGroups(response.data));
  }, [apiUrl, username, password]);

  const sendCommand = (devices: Device[], command: string) => {
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
      <>
        <Grid container spacing={2} direction="row" alignItems="flex-start">
          {deviceGroups.map(({ uid, name, devices }) => (
            <Grid item lg={4} xs={12} key={uid}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography component="div" variant="h5">
                      <Link component={RouterLink} to={`/shutter/deviceGroup/${uid}`} underline="none">
                        {name}
                      </Link>
                    </Typography>
                    <ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
                      <Button onClick={() => sendCommand(devices, 'up')}>
                        <ArrowDropUpIcon />
                      </Button>
                      <Button onClick={() => sendCommand(devices, 'my')}>My</Button>
                      <Button onClick={() => sendCommand(devices, 'down')}>
                        <ArrowDropDownIcon />
                      </Button>
                    </ButtonGroup>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    </Layout>
  );
};
