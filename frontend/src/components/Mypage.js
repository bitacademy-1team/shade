import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import UserUtils from "../service/user/UserUtils";
import { Button, CardMedia, Avatar, Tabs, Tab, Box, Typography, Toolbar, AppBar, CssBaseline, Drawer, Modal, Fade, Container, Grid, Backdrop, Card, TextField } from "@material-ui/core";
import { ACCESS_TOKEN, API_BASE_URL } from "../service/oauth2/OAuth";
import axios from "axios";

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    marginTop: 65,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 65
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(22),
    paddingRight: theme.spacing(3)
  },
  mypageavatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    marginBottom: "30%"
  },
  reviseavatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    marginBottom: "10%"
  },
  modal: {
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    disableScrollLock: 'true',
    top: '10%',
    left: '10%',
    overflow: 'scroll',
    position: 'absolute',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[15],
    padding: theme.spacing(2),
    marginWidth: "auto",
    marginHeight: "auto",
    marginTop: "5%",
  },
  submit1: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(5),
    paddingLeft: "15%",
    paddingRight: "15%",
    float: "left",
  },
  submit2: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(5),
    paddingLeft: "15%",
    paddingRight: "15%",
    float: "right",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Mypage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const currentUser = UserUtils.getCurrentUser();
  const [likeList,setLikeList] = useState([]);
  const [disLikeList,setDisLikeList] = useState([]);
  useEffect(() => {
    let token
        if(localStorage.getItem(ACCESS_TOKEN)) {
            token =localStorage.getItem(ACCESS_TOKEN);
        }
    axios({
      method:'GET',
      url: API_BASE_URL+'/likeList?like=like',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    }).then(res =>{
      setLikeList(prevList => {
        return [...new Set([...prevList, ...res.data.map(l => l)])]
      })
    })
    axios({
      method:'GET',
      url: API_BASE_URL+'/likeList?like=unlike',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    }).then(res =>{
      setDisLikeList(prevList => {
        return [...new Set([...prevList, ...res.data.map(l => l)])]
      })
    })
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reviewOpen = () => {
    setOpen1(true);
  };

  const reviseOpen = () => {
    setOpen2(true);
  };

  const settingOpen = () => {
    setOpen3(true);
  }

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };

  return (
    <div className={classes.all}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        {/* <Avatar
          alt="UserProfile"
          src="/static/images/avatar/1.jpg"
          className={classes.mypageavatar}
        /> */}


        {/* <Button >?????? ??? ???</Button>
        {/* onClick={reviewOpen} /}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open1}
            onClose={handleClose1}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open1}>
                <Container maxWidth="sm" >
                        <Card className={classes.paper}>
                            <Grid>
                            </Grid>
                        </Card>
                </Container>
            </Fade>
        </Modal> */}


        <Button >??????????????????</Button>
        {/* onClick={reviseOpen} */}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open2}
            onClose={handleClose2}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open2}>
                <Container maxWidth="sm" >
                    <Card className={classes.paper}>
                        <Grid>
                            <Avatar
                                alt="UserProfile"
                                src="/static/images/avatar/1.jpg"
                                className={classes.reviseavatar}
                            />
                            {/* ????????? ?????? ????????? username nickname?????? ?????? */}
                            <h4>?????????</h4>
                            <TextField
                                variant="outlined"
                                fullWidth
                                readonly
                                name="username"
                                label={currentUser.username}
                                id="username"
                                className="form-control"
                                >
                            </TextField>
                            <h4>?????????</h4>
                            <TextField
                                variant="outlined"
                                fullWidth
                                readonly
                                name="username"
                                label={currentUser.username}
                                id="username"
                                className="form-control"
                                >
                            </TextField>
                            <h4>?????????</h4>
                            <TextField
                                variant="outlined"
                                fullWidth
                                readonly
                                name="username"
                                label={currentUser.email}
                                id="username"
                                className="form-control"
                                >
                            </TextField>
                            <Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit1}
                                >
                                    ??????
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit2}
                                >
                                    ??????
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
            </Fade>
        </Modal>


        <Button >??????</Button>
        {/* onClick={settingOpen} */}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open3}
            onClose={handleClose3}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open3}>
                <Container maxWidth="sm" >
                        <Card className={classes.paper}>
                            <Grid>
                            </Grid>
                        </Card>
                </Container>
            </Fade>
        </Modal>


        <Button href={"/login"} >????????????</Button>
        {/* onClick={logOut} */}
      </Drawer>
      <div>
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="mypage tabs"
              noWrap
            >
              <Tab label="?????????" {...a11yProps(0)} />
              <Tab label="?????????" {...a11yProps(1)} />
            </Tabs>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <TabPanel value={value} index={0}>
            {likeList.map((l,index) => {
              return <img src = {'https://images.justwatch.com' + l.poster}></img>
                      
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
          {disLikeList.map((l,index) => {
              return <img src = {'https://images.justwatch.com' + l.poster}></img>
            })}
          </TabPanel>
        </main>
      </div>
    </div>
  );
}