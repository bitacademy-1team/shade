import React, { useState, useEffect } from "react";
import { Modal, Backdrop, Fade, Card, CardMedia, Grid, Container, 
  Toolbar, Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, TextField, InputAdornment, Button, List, ListItem, 
  ListItemAvatar, Avatar, ListItemText, Typography, IconButton, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import MovieDetailService from "../service/movie/MovieDetailService"
import Google from "../img/platform/on/google.jpeg";
import Naver from "../img/platform/on/naver.jpeg";
import Wavve from "../img/platform/on/wavve.jpeg";
import Netflix from "../img/platform/on/netflix.jpeg";
import Watcha from "../img/platform/on/watcha.jpeg";

const useStyles = makeStyles((theme) => ({
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
    overflow:'hidden', 
    paddingBottom:'56.25%',
    position:'relative', 
    height: 0,
  },
  iframe: { 
    top:0, 
    left:0, 
    width:'100%', 
    height:'100%', 
    position: 'absolute',
  },
  detail: {
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
  },
  peoplegenre: {
    width: 150,
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

function createData(플랫폼, 구매, 대여, 정액제) {
  return { 플랫폼, 구매, 대여, 정액제  };
}

const rows = [
  createData("네이버", "SD HD 4K", "SD HD 4K", "", ""),
  createData("SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
  createData("", "", "정액제", "정액제", "정액제"),
];

const options = [
  "신고", "수정", "삭제"
];

export default function MovieDetailComponent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const {contents_id} = useParams()
  const [movieDetail,setMovieDetail] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);

  const menuHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuHandleClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }
  // useEffect(() => {
  //   MovieDetailService.getMovieDetail(contents_id).then( res =>{
  //       setMovieDetail(res.data)
  //   });
  //   },[])
    
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Modal
      </button>
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
                <Toolbar className={classes.detail}>
                  <Grid className={classes.detail}>
                    <h1>{movieDetail.title}</h1>
                    <p>{movieDetail.opendate} &nbsp;&nbsp;&nbsp; {movieDetail.playtime}분</p>
                    <p>{movieDetail.summary}</p>
                  </Grid>
                  <Grid className={classes.peoplegenre}>
                    <Box borderBottom={1} >
                      <h4>감독</h4>
                      <p>{movieDetail.director_name}</p>
                    </Box>
                    <Box borderBottom={1} >
                      <h4>출연진</h4>
                      <p>{movieDetail.people}</p>
                    </Box>
                    <Box>
                      <h4>장르</h4> 
                      <p>{movieDetail.genre_names}</p>
                    </Box>
                  </Grid>
                </Toolbar>
                <Grid item xs={12} sm={12}>
                  <h2>이용정보 </h2>
                  {/* 1. 1행에 5개의 플랫폼 이미지가 나와야 한다
                      2. 1열에 "구매, 대여, 플렛폼"이 나오면서 표를 건드리면 안된다 (대기)
                      3. sd, hd, 4k밑에 가격표가 붙어야한다
                      4. 각 플렛폼에 맞는 가격 정보를 정확하게 알려주어야 한다.*/}
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label ="Flat rate" >
                      
                    <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Naver} alt="네이버"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Google} alt="구글"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Wavve} alt="웨이브"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Netflix} alt="넷플릭스"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Watcha} alt="왓챠"/>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            {/* <TableCell component="th" scope="row">
                              {movieDetail.platform_names}
                            </TableCell> */}
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
                  <caption className={classes.caption}>* 이미지 클릭시 해당 사이트로 이동됩니다.</caption> <br/>
                  <caption className={classes.caption}>* SD, HD, 4K는 해상도를 의미합니다.</caption> <br/><br/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <h2>리뷰</h2>  
                  <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="댓글을 작성해 주세요"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>

                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button>
                            등록
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid>
                  <List className={classes.commentList}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="User Profile" src="/src/icons/hd.png" />
                      </ListItemAvatar>
                      <ListItemText
                      primary="username"
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                            </Typography>
                            {"avndklsafnkldsnaklfdnskalfnkdlsafnklsa"}
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
                            vertical: 'bottom',
                            horizontal: 'right',
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
    </div>
  );
}
