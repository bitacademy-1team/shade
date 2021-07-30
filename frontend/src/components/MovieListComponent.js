import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container, Card, Grid, CardMedia, CardActionArea, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Fab, Zoom,
  Button, Modal, Backdrop, Fade,
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, InputAdornment,
  List, ListItem, ListItemText, IconButton, Menu, MenuItem
} from "@material-ui/core";
import ContentsService from "../service/ContentsService";
import MovieDetailService from "../service/MovieDetailService";
import MovieDetailComponent from "./MovieDetailComponent";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import reviewService from "../service/review/reviewService";

import MovielistPlatform from "./movie/featrue/movielistplatform/MovielistPlatform"
import LikeDislikes from "./movie/featrue/likedislikes/LIkeDislikes";

import Google from "../img/google.jpeg";
import Naver from "../img/naver.jpeg";
import Wavve from "../img/wavve.jpeg";
import Netflix from "../img/netflix.jpeg";
import Watcha from "../img/watcha.jpeg";
import { ACCESS_TOKEN } from "../service/oauth2/OAuth";
import ReviewComponnent from "./review/ReviewComponnent";
// import Google from "../img/google";
// import Naver from "../img/naver";
// import Netflix from "../img/netflix";
// import Watcha from "../img/watcha";
// import Wavve from "../img/wavve";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  media: {
    height: 285,
    width: "100%",
  },
  dt: {
    backgroundColor: "black",
    padding: "5px",
    position: "sticky",
    margin: 0,
    overflow: "auto",
    opacity: 0.7,
    float: "none",
  },
}));

export default function ContentList(props) {

  const useStyles = makeStyles((theme) => ({
    //  리스트 페이지
    cardGrid: {
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
    },
    cardMedia: {
      paddingTop: "56.25%" // 16:9
    },
    cardContent: {
      flexGrow: 1
    },
    media: {
      height: 285,
      width: "100%",
    },
    pageup: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },


    //  디테일 페이지
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
      width: 'auto',
      height: 'auto',
    },
    video: {
      overflow: 'hidden',
      paddingBottom: '56.25%',
      position: 'relative',
      height: 0,
    },
    iframe: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    detail: {
      flexGrow: 1,
      paddingRight: 0,
      paddingLeft: 0,
      justify: "top"
    },
    peoplegenre: {
      width: 150,
      overflow: "visible",
    },
    table: {
      minWidth: 320,
    },
    caption: {
      float: 'left',
    },
    platformimg: {
      width: "20%",
    },
  }));

  //  디테일 페이지 요금정보 데이터 (CreateData, rows, options)
  function createData(naver, google, wavve, netflix, watcha) {
    return { naver, google, wavve, netflix, watcha }
  };

  const rows = [
    createData("SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
    createData("SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
    createData("", "", "정액제", "정액제", "정액제"),
  ];

  const options = [
    "신고", "수정", "삭제"
  ];

  //  스크롤 맨위로 올리기
  function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100
    });

    const pageupClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={pageupClick} role="presentation" className={classes.pageup}>
          {children}
        </div>
      </Zoom>
    );
  }

  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func
  };


  const classes = useStyles();
  const [query] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [movieDetail, setMovieDetail] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);
  const [content_id,setContent_id] = useState('');

  //  리스트 무한스크롤 (ContentsService, lastPageElementRef)
  const {
    list,
    hasMore,
    loading,
    error
  } = ContentsService(query, pageNumber)

  const observer = useRef()
  const lastPageElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  //  리뷰 메뉴 (HandleClick, HandleClose)
  const menuHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuHandleClose = () => {
    setAnchorEl(null);
  };

  //  모달 (HandleOpen, HandleClose)
  const handleOpen = (contents_id) => {
    MovieDetailService.getMovieDetail(contents_id).then(res => {
      // alert(res.data.check_like)
      // alert(res.data.title)
      setMovieDetail(res.data)
      setContent_id(res.data.contents_id)
    });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const createReview = (contents_id,comment) => {
    let token = localStorage.getItem(ACCESS_TOKEN)
    let result = reviewService.createReview(contents_id,comment,token)

    alert(result)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <MovielistPlatform />
      <main>
        <Toolbar id="back-to-top-anchor" />
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={1}>
            {list.map((l, index) => {
              if (list.length === index + 1) {
                return <div ref={lastPageElementRef} key={l.contents_id}>
                  <Link to={'/moviedetail/' + l.contents_id}><img src={'https://images.justwatch.com' + l.poster} alt="moviePoster" /></Link>

                  {/* -- 디테일 페이지 시작 -- */}
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Container maxWidth="md">
                        <Card className={classes.paper}>
                          <Grid item xs={12}>
                            <CardMedia className={classes.video}>
                              {/* 유튜브 영상 */}
                              <iframe
                                className={classes.iframe}
                                // src={"https://www.youtube.com/embed/"+movieDetail.video+"?autoplay=1"}
                                src={"https://www.youtube.com/embed/yC62Q_qAdgY?autoplay=1"}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                              >
                              </iframe>
                            </CardMedia>
                          </Grid>
                          <Grid>
                            {/* 영화 정보 */}
                            <Toolbar className={classes.detail}>
                              <Grid>
                                <div>
                                  <h1>{movieDetail.title}</h1>
                                  <Box className={classes.like}>
                                  <LikeDislikes check_like={movieDetail.check_like} contents_id={movieDetail.contents_id} />
                                    {/* <IconButton><ThumbUpIcon/></IconButton>
                                      <IconButton><ThumbDownIcon  color="secondary"/></IconButton> */}
                                  </Box>
                                </div>
                                <div>
                                  <Box>
                                    <p>{movieDetail.playtime}분 &nbsp;&nbsp;&nbsp; {movieDetail.opendate}</p>
                                    <p>{movieDetail.director_name}</p>
                                  </Box>
                                  <Box>
                                    <h4>장르</h4>
                                    <p>{movieDetail.genre_names}</p>
                                  </Box>
                                  <Box>
                                    <h4>출연진</h4>
                                    <p>{movieDetail.people}</p>
                                  </Box>
                                  <p>{movieDetail.summary}</p>
                                </div>
                              </Grid>
                            </Toolbar>
                            <Grid item xs={12} sm={12}>
                              <h2>이용정보 </h2>
                              <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="Flat rate" >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="center">
                                        <img className={classes.platformimg} src={Naver} alt="네이버" />
                                      </TableCell>
                                      <TableCell align="center">
                                        <img className={classes.platformimg} src={Google} alt="구글" />
                                      </TableCell>
                                      <TableCell align="center">
                                        <img className={classes.platformimg} src={Wavve} alt="웨이브" />
                                      </TableCell>
                                      <TableCell align="center">
                                        <img className={classes.platformimg} src={Netflix} alt="넷플릭스" />
                                      </TableCell>
                                      <TableCell align="center">
                                        <img className={classes.platformimg} src={Watcha} alt="왓챠" />
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {rows.map((row) => (
                                      <TableRow key={row.name}>
                                        <TableCell align="center">{row.naver}</TableCell>
                                        <TableCell align="center">{row.google}</TableCell>
                                        <TableCell align="center">{row.wavve}</TableCell>
                                        <TableCell align="center">{row.netflix}</TableCell>
                                        <TableCell align="center">{row.watcha}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <caption className={classes.caption}>* 이미지 클릭시 해당 사이트로 이동됩니다.</caption> <br />
                              <caption className={classes.caption}>* SD, HD, 4K는 해상도를 의미합니다.</caption> <br /><br />
                            </Grid>
                            <ReviewComponnent contents_id = {content_id} />
                          </Grid>
                        </Card>
                      </Container>
                    </Fade>
                  </Modal>
                  {/* -- 디테일 페이지 종료 -- */}

                </div>
              } else {
                return (

                  // -- 리스트 페이지 시작 --
                  <Grid item key={l.contents_id} xs={6} sm={3} md={2}>
                    <Card className={classes.card} >
                      <CardActionArea onClick={() => handleOpen(l.contents_id)}>
                        <CardMedia
                          className={classes.media}
                          title={l.title}
                          image={'https://images.justwatch.com' + l.poster}
                        />
                      </CardActionArea>
                      <Grid>
                        <LikeDislikes check_like={l.check_like} contents_id={l.contents_id} />
                      </Grid>
                    </Card>
                  </Grid>
                  // -- 리스트 페이지 종료 --

                )
              }
            })}
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'End...'}</div>  {/* 페이징이 모두 끝나게 되면 Loading과 End가 동시에 출력된다 */}
          </Grid>
        </Container>
      </main>
      <ScrollTop {...props}>
        <Fab color="grey" size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}