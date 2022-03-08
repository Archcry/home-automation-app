import {
  Box,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  Grid,
  Link,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../components/auth/auth-context";
import { Layout } from "../../components/layout/layout";
import { DeviceGroup, Device } from "./types";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link as RouterLink, useParams } from "react-router-dom";

export const Devices = () => {
  const apiUrl = window._env_.SOMFY_API_URL;

  const { uid } = useParams<string>();

  const [devices, setDevices] = useState<Device[]>([]);
  const { username, password } = useAuthContext();

  useEffect(() => {
    axios
      .get<void, AxiosResponse<DeviceGroup[], any>>(
        `${apiUrl}/shutter/deviceGroups`,
        {
          auth: {
            username: username ?? "",
            password: password ?? "",
          },
        }
      )
      .then((response) => response.data)
      .then((deviceGroups) => deviceGroups.find((dg) => dg.uid === uid))
      .then((deviceGroup) => deviceGroup?.devices ?? [])
      .then((devices) => setDevices(devices));
  }, [apiUrl, username, password, uid]);

  const sendCommand = (device: string, command: string) => {
    axios.post(
      `${apiUrl}/shutter/${command}`,
      {
        devices: [device],
      },
      {
        auth: {
          username: username ?? "",
          password: password ?? "",
        },
      }
    );
  };

  return (
    <Layout>
      <>
        <Grid container spacing={2} direction="row" alignItems="flex-start">
          {devices.map(({ uid, name }) => (
            <Grid item lg={4} xs={12} key={uid}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="div" variant="h5">
                      {name}
                    </Typography>
                    <ButtonGroup
                      size="small"
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={() => sendCommand(uid, "up")}>
                        <ArrowDropUpIcon />
                      </Button>
                      <Button onClick={() => sendCommand(uid, "my")}>My</Button>
                      <Button onClick={() => sendCommand(uid, "down")}>
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
