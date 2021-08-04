import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  IconButton,
  Modal,
  Grid,
  Fade,
  Card,
  TextField,
  Button,
  Backdrop,
  Toolbar,
  Divider,
} from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import SettingsIcon from "@material-ui/icons/Settings";
import ListIcon from "@material-ui/icons/List";
import { grey } from "@material-ui/core/colors";

import UserUtils from "../service/user/UserUtils";
import { ACCESS_TOKEN } from "../service/oauth2/OAuth";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    // backgroundColor: grey[900],
  },
  nickname: {
    backgroundColor: grey[100],
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  usernickname: {
    position: "static",
    flexWrap: "wrap",
  },
  user: {
    flexGrow: 1,
  },
  tabitem: {
    backgroundColor: grey[100],
    height: "100%",
  },
  cancel: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(5),
    paddingLeft: "22%",
    paddingRight: "22%",
    float: "right",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(5),
    paddingLeft: "22%",
    paddingRight: "22%",
    float: "left",
  },
  modal: {
    display: "block",
    alignItems: "center",
    justifyContent: "center",
    disableScrollLock: "true",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    position: "absolute",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[15],
    padding: theme.spacing(2),
    marginWidth: "auto",
    marginHeight: "auto",
    marginTop: "5%",
  },
  array: {
    backgroundColor: grey[100],
    boxShadow: "none",
  },
  page: {
    boxShadow: theme.shadows[3],
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function Mypage2(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const currentUser = UserUtils.getCurrentUser();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reviseOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.main}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.page}>
          <div className={classes.nickname}>
            <Toolbar className={classes.usernickname}>
              <div className={classes.user}>
                <Typography variant="p">닉네임</Typography>
                <Typography variant="h2">
                  UserNickName
                  {currentUser.nickname}
                </Typography>
              </div>
              <div>
                <IconButton onClick={reviseOpen}>
                  <SettingsIcon />
                </IconButton>
              </div>
            </Toolbar>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Container maxWidth="sm">
                  <Card className={classes.paper}>
                    <Grid>
                      {/* 쿼리문 수정 이후에 username nickname으로 변경 */}
                      <Typography variant="h4">개인정보수정</Typography>
                      <h4>닉네임</h4>
                      <TextField
                        variant="outlined"
                        fullWidth
                        readonly
                        defaultValue={currentUser.nickname}
                        name="username"
                        id="username"
                        className="form-control"
                      >
                        {currentUser.username}
                      </TextField>
                      <h4>비밀번호</h4>
                      <TextField
                        variant="outlined"
                        fullWidth
                        readonly
                        name="username"
                        label="변경할 비밀번호를 입력해주세요."
                        id="username"
                        className="form-control"
                      ></TextField>
                      <h4>비밀번호 확인</h4>
                      <TextField
                        variant="outlined"
                        fullWidth
                        readonly
                        name="username"
                        label="비밀번호 확인"
                        id="username"
                        className="form-control"
                      ></TextField>
                      <Grid>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick
                        >
                          수정
                        </Button>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.cancel}
                          onClick={handleClose}
                        >
                          취소
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Container>
              </Fade>
            </Modal>
          </div>
          <div>
            <AppBar position="static" color="default" className={classes.array}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
              >
                <Tab
                  label="내 정보 보기"
                  icon={<PersonPinIcon />}
                  {...a11yProps(0)}
                />
                <Tab label="내가 쓴 글" icon={<ListIcon />} {...a11yProps(1)} />
                <Tab label="좋아요 목록" icon={<ThumbUp />} {...a11yProps(2)} />
                <Tab
                  label="싫어요 목록"
                  icon={<ThumbDown />}
                  {...a11yProps(3)}
                />
              </Tabs>
            </AppBar>
            <Divider />
            <TabPanel className={classes.tabitem} value={value} index={0}>
              <div>
                <Typography variant="h6">
                  이름 : {currentUser.username}
                </Typography>
                <Typography variant="h6">
                  email : {currentUser.email}
                </Typography>
                <Typography variant="h6">비밀번호 : ******</Typography>
                <Typography variant="h6">
                  닉네임 : {currentUser.nickname}
                </Typography>
                <Typography variant="h6">
                  생년월일 : {currentUser.birthday}
                </Typography>
                <Typography variant="h6">
                  성별 : {currentUser.gender}
                </Typography>
              </div>
            </TabPanel>
            <TabPanel className={classes.tabitem} value={value} index={1}>
              Item two
            </TabPanel>
            <TabPanel className={classes.tabitem} value={value} index={2}>
              Item three
            </TabPanel>
            <TabPanel className={classes.tabitem} value={value} index={3}>
              Item four
            </TabPanel>
          </div>
        </div>
      </Container>
    </div>
  );
}
