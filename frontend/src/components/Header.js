import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserUtils from "../service/user/UserUtils";
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SearchContents from "./contents/search/SearchContents";
import styled from "styled-components";
import { ACCESS_TOKEN } from "../service/oauth2/OAuth";
import { grey, yellow } from "@material-ui/core/colors";

const HeaderArea = styled.div`
  position: relative;
  width: 100%;
  height: 65px;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.87);
`;
//  height 값을

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 80px;
  transition: 0.7s ease;
  &.hide {
    transform: translateY(-80px);
  }
`;

const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: grey[900],
    color: grey[100],
    boxShadow: theme.shadows[5],
    display: "flex",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    paddingRight: 20,
    // flexGrow: 1,
  },
  toolbarList: {},
  link: {
    margin: theme.spacing(1, 1.5),
    color: grey[300],
  },
  menu: {
    flexShrink: 0,
  },
  menuPaper: {
    padding: "auto",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  shade: {
    color: yellow[700],
  },
  search: {
    flexGrow: 1,
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const open = Boolean(anchorEl);
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  const loadCurrentlyLoggedInUser = () => {
    UserUtils.getCurrentUser().then((res) => {
      setCurrentUser(res);
    });
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
    documentRef.current.addEventListener("scroll", throttleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", throttleScroll);
  }, [pageY]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderArea>
        <HeaderWrap className={hide && "hide"}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            className={classes.appBar}
          >
            <Toolbar>
              <Typography
                variant="h3"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                {currentUser ? (
                  <Link
                    color="textPrimary"
                    href="/recommend"
                    className={classes.shade}
                  >
                    SHADE
                  </Link>
                ) : (
                  <Link color="textPrimary" href="/" className={classes.shade}>
                    SHADE
                  </Link>
                )}
              </Typography>
              <div className={classes.toolbarList}>
                <Typography
                  variant="p"
                  color="inherit"
                  className={classes.toolbar}
                >
                  {currentUser ? (
                    <Link
                      variant="button"
                      color="textPrimary"
                      href="/recommend"
                      className={classes.link}
                    >
                      추천
                    </Link>
                  ) : (
                    <Link
                      variant="button"
                      color="textPrimary"
                      href="/login"
                      className={classes.link}
                    >
                      추천
                    </Link>
                  )}
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  className={classes.toolbar}
                >
                  <Link
                    variant="button"
                    color="textPrimary"
                    href="/faq"
                    className={classes.link}
                  >
                    FAQ
                  </Link>
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  className={classes.toolbar}
                >
                  <Link
                    variant="button"
                    color="textPrimary"
                    href="/movielist"
                    className={classes.link}
                  >
                    영화
                  </Link>
                </Typography>
                <Typography
                  variant="p"
                  color="inherit"
                  className={classes.toolbar}
                >
                  <Link
                    variant="button"
                    color="textPrimary"
                    href="/tvlist"
                    className={classes.link}
                  >
                    TV
                  </Link>
                </Typography>
              </div>
              <div className={classes.search}>
                <SearchContents />
              </div>
              {currentUser ? (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {currentUser.nickname}
                  </IconButton>
                  <Menu
                    className={classes.menu}
                    getContentAnchorEl={null}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button href={"/mypage"} className={classes.menuPaper}>
                        마이페이지
                      </Button>
                    </MenuItem>
                    {showAdminBoard && (
                      <MenuItem onClick={handleClose}>
                        <Button href={"/admin"}>관리자페이지</Button>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleClose}>
                      <Button type="button" href={"/login"} onClick={logOut}>
                        로그아웃
                      </Button>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  href="/login"
                  color="primary"
                  variant="outlined"
                  className={classes.link}
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </HeaderWrap>
      </HeaderArea>
    </React.Fragment>
  );
}
