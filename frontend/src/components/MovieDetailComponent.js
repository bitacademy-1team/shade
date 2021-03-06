import React, { useState, useEffect } from "react";
import { Modal, Backdrop, Fade, Card, CardMedia, Grid, Container, Toolbar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, IconButton, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import MovieDetailService from "../service/MovieDetailService";
import Google from "../img/google.jpeg";
import Naver from "../img/naver.jpeg";
import Wavve from "../img/wavve.jpeg";
import Netflix from "../img/netflix.jpeg";
import Watcha from "../img/watcha.jpeg";
// import Hd from "../icons/hd.png";
// import Sd from "../icons/sd.png";
// import Kkkk from "../icons/kkkk.png";

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

function createData(naver, google, wavve, netflix, watcha) {
  return { naver, google, wavve, netflix, watcha };
}

const rows = [
  createData("SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
  createData("SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
  createData("", "", "?????????", "?????????", "?????????"),
];

const options = [
  "??????", "??????", "??????"
];

export default function MovieDetailComponent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {contents_id} = useParams()
  const [movieDetail,setMovieDetail] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);

  const menuHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuHandleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    MovieDetailService.getMovieDetail(contents_id).then( res =>{
        setMovieDetail(res.data)
    })
    },[])

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
                    <p>{movieDetail.opendate} &nbsp;&nbsp;&nbsp; {movieDetail.playtime}???</p>
                    <p>{movieDetail.summary}</p>
                  </Grid>
                  <Grid className={classes.peoplegenre}>
                    <Box borderBottom={1} >
                      <h4>??????</h4>
                      <p>{movieDetail.director_name}</p>
                    </Box>
                    <Box borderBottom={1} >
                      <h4>?????????</h4>
                      <p>{movieDetail.people}</p>
                    </Box>
                    <Box>
                      <h4>??????</h4>
                      <p>{movieDetail.genre_names}</p>
                    </Box>
                  </Grid>
                </Toolbar>
                <Grid item xs={12} sm={12}>
                  <h2>???????????? </h2>
                  {/* 1. 1?????? 5?????? ????????? ???????????? ????????? ??????
                      2. 1?????? "??????, ??????, ?????????"??? ???????????? ?????? ???????????? ????????? (??????)
                      3. sd, hd, 4k?????? ???????????? ???????????????
                      4. ??? ???????????? ?????? ?????? ????????? ???????????? ??????????????? ??????.*/}
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label ="Flat rate" >

                    <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Naver} alt="?????????"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Google} alt="??????"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Wavve} alt="?????????"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Netflix} alt="????????????"/>
                          </TableCell>
                          <TableCell align="center">
                            <img className={classes.platformimg} src={Watcha} alt="??????"/>
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
                  <caption className={classes.caption}>* ????????? ????????? ?????? ???????????? ???????????????.</caption> <br/>
                  <caption className={classes.caption}>* SD, HD, 4K??? ???????????? ???????????????.</caption> <br/><br/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <h2>??????</h2>
                  <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="????????? ????????? ?????????"
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
                            ??????
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
                              onClick={handleClose}
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
