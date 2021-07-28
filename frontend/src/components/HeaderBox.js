//  영화, TV, 마이페이지에서 헤더의 영역을 만들어주고 헤더를 이용할 수 있게끔 하는 박스입니다.

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    appBarBox: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        opacity: 1,
      },
      toolbarBox: {
        flexWrap: 'wrap',
      },
}))

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


export default function Headerbox() {
    const classes = useStyles();
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

    useEffect(() => {
        documentRef.current.addEventListener('scroll', throttleScroll);
        return () => documentRef.current.removeEventListener('scroll', throttleScroll);
    }, [pageY]);

    return (
        <React.Fragment>
            <CssBaseline />
            <HeaderArea>
                <HeaderWrap className={hide && 'hide'}>
                    <AppBar position="static" color="default" elevation={0} className={classes.appBarBox}>
                        <Toolbar className={classes.toolbarBox}>
                        </Toolbar>
                    </AppBar>
                </HeaderWrap>
            </HeaderArea>
        </React.Fragment>
    )
}