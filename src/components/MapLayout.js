import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LinearColor from "./LinearColor";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as api from "../auth.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import VisiteeCard from "./VisiteeCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
// import Link as muiLink from "@mui/material/Link";

const MapLayout = () => {
  const matches = useMediaQuery("(min-width:600px)");

  const [users, setUsers] = React.useState([]);
  const [clicked, setClicked] = React.useState(null);

  const configLeaflet = () => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  };
  configLeaflet();

  const filterUsers = (users) => {
    return users.filter(
      (user) => user.latitude && user.longitude && user.userRole === "visitee"
    );
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      await api.getUsers().then((fetchedUsers) => {
        setUsers(filterUsers(fetchedUsers));
      });
    };
    fetchUsers().catch((error) => console.log(error));
  }, []);
  const styles = matches
    ? {
        paddingTop: "50px",
        paddingLeft: "40px",
        width: "100%",
        boxShadow: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        margin: "0 auto",
      }
    : {
        paddingTop: "50px",
        paddingLeft: "0px",
        width: "100%",
        boxShadow: "none",
      };
  const stylesMap = matches
    ? {
        width: "100%",
        margin: "0 auto",
        paddingLeft: "50px",
        boxShadow: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }
    : {
        width: "100%",
        margin: "0 auto",
        height: "40vh",
        boxShadow: "none",
        overflow: "hidden",
      };
  const mapPaddingStyle = matches
    ? {
        overflow: "hidden",
        boxShadow: "none",
        paddingTop: "40px",
        marginBottom: "50px",
      }
    : {
        overflow: "hidden",
        boxShadow: "none",
        paddingTop: "0px",
        marginBottom: "50px",
      };

  return (
    <Grid
      container
      sx={styles}
      elevation={10}
      component={Paper}
      square
      bgcolor={"grey"}
    >
      {users.length === 0 ? (
        <LinearColor />
      ) : (
        <Grid
          item
          xs={100}
          sm={4}
          md={7}
          maxWidth="xl"
          elevation={10}
          component={Paper}
          square
          bgcolor={"grey"}
          sx={mapPaddingStyle}
        >
          <Box
            direction="row"
            justifyContent="end"
            display="flex"
            sx={stylesMap}
          >
            <MapContainer
              tap={Boolean(false)}
              center={[
                JSON.parse(users[0].latitude),
                JSON.parse(users[0].longitude),
              ]}
              style={{ width: "100%", height: "85vh" }}
              zoom={10}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {users.map((user, idx) => {
                return (
                  <Marker
                    key={idx}
                    position={[user.latitude, user.longitude]}
                    eventHandlers={{
                      click: (event) => {
                        setClicked(idx);
                      },
                    }}
                  >
                    <Popup>
                      <a
                        href={`#${idx}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        {user.firstName}
                        <br />
                        {user.lastName}
                        <br />
                        {user.postcode.toUpperCase()}
                      </a>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Box>
        </Grid>
      )}

      <Grid
        component={Paper}
        square
        bgcolor={"grey"}
        elevation={10}
        sx={{
          height: "85vh",
          scrollbarColor: "dark",
          overflow: "scrall",
          overflowX: "hidden",
          margin: "-30px auto 0 auto",
          boxShadow: "none",
        }}
      >
        {!users.length ? (
          <LinearColor />
        ) : (
          users.map((user, idx) => {
            return (
              <Box
                className="card"
                component={Link}
                to={`/users/${user._id}`}
                key={idx}
                name={idx}
                sx={{
                  textDecoration: "none",
                }}
              >
                <VisiteeCard
                  key={idx}
                  idx={idx}
                  user={user}
                  clicked={clicked}
                />
              </Box>
            );
          })
        )}
      </Grid>
    </Grid>
  );
};

export default MapLayout;
