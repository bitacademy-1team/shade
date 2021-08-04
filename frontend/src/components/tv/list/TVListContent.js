import React, { useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  Grid,
  CardMedia,
  CardActionArea,
  CssBaseline,
  useScrollTrigger,
  Fab,
  Zoom,
  Toolbar,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  NativeSelect,
  FormControl,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import { grey } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ContentsService from "../../../service/contents/ContentsService";
import MovielistPlatform from "../../movie/featrue/movielistplatform/MovielistPlatform";
import MovieDetailService from "../../../service/movie/MovieDetailService";
import LikeDislikes from "../../movie/featrue/likedislikes/LikeDislikes";

import Google from "../../../img/platform/on/google.jpeg";
import Naver from "../../../img/platform/on/naver.jpeg";
import Wavve from "../../../img/platform/on/wavve.jpeg";
import Netflix from "../../../img/platform/on/netflix.jpeg";
import Watcha from "../../../img/platform/on/watcha.jpeg";

const useStyles = makeStyles((theme) => ({
  //  리스트 페이지
  page: {
    backgroundColor: grey[900],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "90vh",
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    flexDirection: "column",
    backgroundColor: grey[900],
    boxShadow: theme.shadows[5],
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  media: {
    height: 285,
    width: "100%",
  },
  pageup: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  //  디테일 페이지
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
    boxShadow: theme.shadows[20],
    padding: theme.spacing(2),
    width: "auto",
    height: "auto",
    backgroundColor: grey[900],
    color: grey[100],
  },
  video: {
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: 0,
  },
  iframe: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  detail: {
    display: "flex",
    paddingRight: 0,
    paddingLeft: 0,
    justify: "center",
  },
  peoplegenre: {
    width: 150,
    overflow: "visible",
  },
  table: {
    minWidth: 320,
    backgroundColor: grey[100],
    color: "white",
    boxShadow: theme.shadows[5],
  },
  caption: {
    float: "left",
  },
  platformimg: {
    width: 40,
  },
  tilike: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  like: {
    paddingTop: 15,
    float: "right",
  },
  close: {
    color: grey[100],
  },
  arrayMenu: {
    flexGrow: 1,
  },
  formControl: {
    padding: theme.spacing(1),
    minWidth: 120,
    boxShadow: theme.shadows[5],
    borderRadius: "10px",
  },
  selectEmpty: {
    color: grey[100],
  },
  episodepage: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  episode: {
    backgroundColor: grey[900],
    color: grey[100],
  },
}));

//  디테일 페이지 요금정보 데이터 (CreateData, rows, options)
function createData(구매정보, naver, google, wavve, netflix, watcha) {
  return { 구매정보, naver, google, wavve, netflix, watcha };
}

const rows = [
  createData("구매", "", "SD HD 4K", "SD HD 4K", "", ""),
  createData("대여", "SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
  createData("정액제", "", "", "정액제", "정액제", "정액제"),
];

// 에피소드 요금정보 데이터
function episodeData(구매정보, naver, google, wavve, netflix, watcha) {
  return { 구매정보, naver, google, wavve, netflix, watcha };
}

const episoderows = [
  episodeData("구매", "", "SD HD 4K", "SD HD 4K", "", ""),
  episodeData("대여", "SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
  episodeData("정액제", "", "", "정액제", "정액제", "정액제"),
];

const options = ["신고", "수정", "삭제"];

//  스크롤 맨위로 올리기
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
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
  window: PropTypes.func,
};

export default function ContentList(props) {
  const classes = useStyles();
  const [query] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);
  const [expanded, setExpanded] = React.useState(false);
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //  리스트 무한스크롤 (ContentsService, lastPageElementRef)
  const { list, hasMore, loading, error } = ContentsService(query, pageNumber);

  const observer = useRef();
  const lastPageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //  리뷰 메뉴 (HandleClick, HandleClose)
  const menuHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuHandleClose = () => {
    setAnchorEl(null);
  };

  //  모달 (HandleOpen, HandleClose)
  const handleOpen = (contents_id) => {
    MovieDetailService.getMovieDetail(contents_id).then((res) => {
      setMovieDetail(res.data);
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <MovielistPlatform />
      <main className={classes.page}>
        <Toolbar id="back-to-top-anchor" />
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={1}>
            {list.map((l, index) => {
              if (list.length === index + 1) {
                return (
                  <div ref={lastPageElementRef} key={l.contents_id}>
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
                          <Button
                            className={classes.close}
                            onClick={handleClose}
                          >
                            <CloseIcon />
                          </Button>
                          <Card className={classes.paper}>
                            <Grid item xs={12}>
                              <CardMedia className={classes.video}>
                                {/* 유튜브 영상 */}
                                <iframe
                                  className={classes.iframe}
                                  src={
                                    "https://www.youtube.com/embed/" +
                                    movieDetail.video +
                                    "?autoplay=1"
                                  }
                                  title="YouTube video player"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </CardMedia>
                            </Grid>
                            <Grid>
                              {/* 영화 정보 */}
                              <Toolbar className={classes.detail}>
                                <Grid>
                                  <div className={classes.tilike}>
                                    <div className={classes.title}>
                                      <h1>{movieDetail.title}</h1>
                                    </div>
                                    <div>
                                      <Box className={classes.like}>
                                        <LikeDislikes />
                                      </Box>
                                    </div>
                                  </div>
                                  <div>
                                    <Box>
                                      <p>
                                        {movieDetail.playtime}분
                                        &nbsp;&nbsp;&nbsp;{" "}
                                        {movieDetail.opendate}
                                      </p>
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
                                <Toolbar>
                                  <h2>이용정보 </h2>
                                  <div className={classes.arrayMenu}>
                                    <FormControl
                                      className={classes.formControl}
                                    >
                                      <NativeSelect
                                        value={state.age}
                                        onChange={handleChange}
                                        name="age"
                                        className={classes.selectEmpty}
                                        inputProps={{ "aria-label": "age" }}
                                      >
                                        <option value="">최신순</option>
                                        <option value="10">
                                          조회수 올림차순
                                        </option>
                                        <option value="20">
                                          조회수 내림차순
                                        </option>
                                      </NativeSelect>
                                    </FormControl>
                                  </div>
                                </Toolbar>
                                <TableContainer component={Paper}>
                                  <Table
                                    className={classes.table}
                                    aria-label="Flat rate"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="center">
                                          <h3 color="white">구매정보</h3>
                                        </TableCell>
                                        <TableCell align="center">
                                          <img
                                            className={classes.platformimg}
                                            src={Naver}
                                            alt="네이버"
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <img
                                            className={classes.platformimg}
                                            src={Google}
                                            alt="구글"
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <img
                                            className={classes.platformimg}
                                            src={Wavve}
                                            alt="웨이브"
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <img
                                            className={classes.platformimg}
                                            src={Netflix}
                                            alt="넷플릭스"
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <img
                                            className={classes.platformimg}
                                            src={Watcha}
                                            alt="왓챠"
                                          />
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {rows.map((row) => (
                                        <TableRow key={row.name}>
                                          <TableCell align="center">
                                            {row.구매정보}
                                          </TableCell>
                                          <TableCell align="center">
                                            {row.naver}
                                          </TableCell>
                                          <TableCell align="center">
                                            {row.google}
                                          </TableCell>
                                          <TableCell align="center">
                                            {row.wavve}
                                          </TableCell>
                                          <TableCell align="center">
                                            {row.netflix}
                                          </TableCell>
                                          <TableCell align="center">
                                            {row.watcha}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                                <caption className={classes.caption}>
                                  * 이미지 클릭시 해당 사이트로 이동됩니다.
                                </caption>{" "}
                                <br />
                                <caption className={classes.caption}>
                                  * SD, HD, 4K는 해상도를 의미합니다.
                                </caption>{" "}
                                <br />
                                <br />
                              </Grid>

                              {/* 에피소드 리스트 시작 */}
                              {/* 에피소드를 맵핑해서 인덱스 0 일때 아무것도안나오고 1이상일떄는 리스트를 보여준다 */}
                              {list.map((l, index) => {
                                if (list.length === index) {
                                  return (
                                    <h4>** 에피소드가 존재하지 않습니다 **</h4>
                                  );
                                } else {
                                  return (
                                    <div className={classes.episodepage}>
                                      <Accordion
                                        //  ****  panel1 의 값이 증가해야 에피소드클릭했을때 한번에 열리지 않고 한개씩 열리게 돱니다 ****
                                        expanded={expanded === "panel1"}
                                        onChange={handleChange1("panel1")}
                                      >
                                        <AccordionSummary
                                          expandIcon={
                                            <ExpandMoreIcon
                                              className={classes.close}
                                            />
                                          }
                                          aria-controls="panel1bh-content"
                                          id="panel1bh-header"
                                          className={classes.episode}
                                        >
                                          <Typography
                                            className={classes.heading}
                                          >
                                            {movieDetail.episodeNumvber}
                                          </Typography>
                                          <Typography
                                            className={classes.secondaryHeading}
                                          >
                                            {movieDetail.episodeStory}
                                          </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                          className={classes.episode}
                                        >
                                          <Typography>
                                            <h2>이용정보 </h2>
                                            <TableContainer component={Paper}>
                                              <Table
                                                className={classes.table}
                                                aria-label="Flat rate"
                                              >
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell align="center">
                                                      <h3 color="white">
                                                        구매정보
                                                      </h3>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      <img
                                                        className={
                                                          classes.platformimg
                                                        }
                                                        src={Naver}
                                                        alt="네이버"
                                                      />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      <img
                                                        className={
                                                          classes.platformimg
                                                        }
                                                        src={Google}
                                                        alt="구글"
                                                      />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      <img
                                                        className={
                                                          classes.platformimg
                                                        }
                                                        src={Wavve}
                                                        alt="웨이브"
                                                      />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      <img
                                                        className={
                                                          classes.platformimg
                                                        }
                                                        src={Netflix}
                                                        alt="넷플릭스"
                                                      />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      <img
                                                        className={
                                                          classes.platformimg
                                                        }
                                                        src={Watcha}
                                                        alt="왓챠"
                                                      />
                                                    </TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  {episoderows.map((erow) => (
                                                    <TableRow key={erow.name}>
                                                      <TableCell align="center">
                                                        {erow.구매정보}
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        {erow.naver}
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        {erow.google}
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        {erow.wavve}
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        {erow.netflix}
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        {erow.watcha}
                                                      </TableCell>
                                                    </TableRow>
                                                  ))}
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          </Typography>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  );
                                }
                              })}
                              {/* 에피소드 종료 */}

                              <Grid item xs={12} sm={12}>
                                <h2>리뷰</h2>
                                <TextField
                                  className={classes.margin}
                                  id="input-with-icon-textfield"
                                  label="댓글을 작성해 주세요"
                                  fullWidth
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Button>등록</Button>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <Grid>
                                  <List className={classes.commentList}>
                                    <ListItem alignItems="flex-start">
                                      <ListItemText
                                        primary="username"
                                        secondary={
                                          <React.Fragment>
                                            <Typography
                                              component="span"
                                              variant="body2"
                                              className={classes.inline}
                                              color="textPrimary"
                                            ></Typography>
                                            {
                                              "avndklsafnkldsnaklfdnskalfnkdlsafnklsa"
                                            }
                                          </React.Fragment>
                                        }
                                      />
                                      <div>
                                        <IconButton
                                          aria-label="more"
                                          aria-controls="long-menu"
                                          aria-haspopup="true"
                                          onClick={menuHandleClick}
                                        >
                                          <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                          id="long-menu"
                                          anchorEl={anchorEl}
                                          keepMounted
                                          open={menuopen}
                                          onClose={menuHandleClose}
                                          anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                          }}
                                        >
                                          {options.map((option) => (
                                            <MenuItem
                                              key={option}
                                              selected={option === "Pyxis"}
                                              onClick={menuHandleClose}
                                            >
                                              {option}
                                            </MenuItem>
                                          ))}
                                        </Menu>
                                      </div>
                                    </ListItem>
                                  </List>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Card>
                        </Container>
                      </Fade>
                    </Modal>
                    {/* -- 디테일 페이지 종료 -- */}
                  </div>
                );
              } else {
                return (
                  // -- 리스트 페이지 시작 --
                  <Grid item key={l.contents_id} xs={6} sm={3} md={2}>
                    <Card className={classes.card}>
                      <CardActionArea onClick={() => handleOpen(l.contents_id)}>
                        <CardMedia
                          className={classes.media}
                          title="contents_id"
                          image={"https://images.justwatch.com" + l.poster}
                        />
                      </CardActionArea>
                      <Grid>
                        <LikeDislikes />
                      </Grid>
                    </Card>
                  </Grid>
                  // -- 리스트 페이지 종료 --
                );
              }
            })}
            <div>{loading && "잠시만 기다려주세요"}</div>
            <div>{error && "End"}</div>
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
