import React, { useEffect, useState, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AuthService from "../service/user/AuthService";
import { AppBar, Button, CssBaseline, Toolbar, Typography, Link, InputBase, IconButton, Menu, MenuItem, Paper, Popper, Grow, MenuList, ClickAwayListener } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

const HeaderArea = styled.div`
    position: relative;
    width: 100%;
    height: 65px;
    overflow: auto;
`;
//  height 값을

const HeaderWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 80px;
    transition: 0.4s ease;
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

const menuWidth = 130;

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    paddingRight: 20,
  },
  toolbarList: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  menu: {
    width: menuWidth,
    flexShrink: 0
  },
  menuPaper: {
    padding: "auto"
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  // const anchorRef = React.useRef(null);
  // const [opan, setOpen] = React.useState(false);
  //  open, opan은 메뉴의 중복을 피하기 위해서 입니다.

  const handleScroll = () => {
      const { pageYOffset } = window;
      const deltaY = pageYOffset - pageY;
      const hide = pageYOffset !== 0 && deltaY >= 0;
      setHide(hide);
      setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
      documentRef.current.addEventListener('scroll', throttleScroll);
      return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE-ADMIN"));
    }

  },[]);

  // 목록메뉴
  // const handleToggle = () => {
  //   setOpen((prevOpan) => !prevOpan);
  // };

  // const handleListClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // function handleListKeyDown(event) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // };

  // const prevOpan = React.useRef(opan);
  // React.useEffect(() => {
  //   if (prevOpan.current === true && opan === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpan.current = opan;
  // }, [opan]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <React.Fragment>
      <CssBaseline />
        <HeaderArea>
        <HeaderWrap className={hide && 'hide'}>
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h3" color="inherit" noWrap className={classes.toolbarTitle}>
            {currentUser ? (
              <Link color="textPrimary" href="/recommend" className={classes.link}>
                SHADE
              </Link>
            ) : (
              <Link color="textPrimary" href="/movielist" className={classes.link}>
                SHADE
              </Link>
            )}
            </Typography>
            <div className={classes.toolbarList}>
              <Typography variant="p" color="inherit" className={classes.toolbar}>
                {currentUser ? (
                  <Link variant="button" color="textPrimary" href="/recommend" className={classes.link}>
                    추천
                  </Link>
                ) : (
                  <Link variant="button" color="textPrimary" href="/login" className={classes.link}>
                    추천
                  </Link>
                )}
              </Typography>
              <Typography variant="p" color="inherit" className={classes.toolbar}>
                <Link variant="button" color="textPrimary" href="/faq" className={classes.link}>
                  FAQ
                </Link>
              </Typography>
              <Typography variant="p" color="inherit" className={classes.toolbar}>
                <Link variant="button" color="textPrimary" href="/movielist" className={classes.link}>
                  영화
                </Link>
              </Typography>
              <Typography variant="p" color="inherit" className={classes.toolbar}>
                <Link variant="button" color="textPrimary" href="/tvlist" className={classes.link}>
                  TV
                </Link>
              </Typography>
              {/* 목록메뉴 */}
              {/* <Typography variant="p" color="inherit" className={classes.toolbar}>
                <Button
                  ref={anchorRef}
                  aria-controls={opan ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  목록
                </Button>
                <Popper open={opan} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleListClose}>
                          <MenuList autoFocusItem={opan} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleListClose}>
                              <Button href={"/movielist"}>
                                영화
                              </Button>
                            </MenuItem>
                            <MenuItem onClick={handleListClose}>
                              <Button href={"/dramalist"}>
                                드라마
                              </Button>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Typography> */}
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색어를 입력해주세요."
                variant="outlined"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
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
                  {currentUser.username}
                </IconButton>
                <Menu
                  className={classes.menu}
                  getContentAnchorEl={null}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
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
                      <Button href={"/admin"}>
                        관리자페이지
                      </Button>
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
              <Button href="/login" color="primary" variant="outlined" className={classes.link}>
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

