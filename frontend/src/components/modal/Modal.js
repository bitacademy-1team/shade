import React, { useState, useRef, useEffect } from "react";
import { ACCESS_TOKEN, API_BASE_URL } from "../../service/oauth2/OAuth";
import reviewService from "../../service/review/reviewService"
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Form from "react-validation/build/form";
import { useStyles } from "../../service/css/css";
import {
    Container, Card, Grid, CardMedia, Toolbar, Modal, Backdrop, Fade,
    Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from "@material-ui/core";
import axios from "axios";
import LikeDislikes from "../movie/featrue/likedislikes/LIkeDislikes";
import ReviewComponnent from "../review/ReviewComponnent";
import MovieDetailService from "../../service/MovieDetailService";
import Google from "../../img/google.jpeg"
import Naver from "../../img/naver.jpeg";
import Wavve from "../../img/wavve.jpeg";
import Netflix from "../../img/netflix.jpeg";
import Watcha from "../../img/watcha.jpeg";

export default function ModalComponent({contents_id},props) {
    const classes = useStyles();
    const [open, setOpen] = useState(props.open);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [movieDetail, setMovieDetail] = useState({})

    useEffect(() => {
        ax(contents_id)
        setOpen(props.open)
        alert(open)
    },[contents_id, open, props])
    
    function createData(naver, google, wavve, netflix, watcha) {
        return { naver, google, wavve, netflix, watcha }
    };

    const ax = (contents_id) =>{
        setMovieDetail({});
        if(contents_id !== ''&&contents_id!==undefined){
            MovieDetailService.getMovieDetail(contents_id).then(res => {
                setMovieDetail(res.data)
              });
        }
        
    }

    const rows = [
        createData("SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
        createData("SD HD 4K", "SD HD 4K", "SD HD 4K", "", ""),
        createData("", "", "정액제", "정액제", "정액제"),
    ];
    const handleClose = () => {
        setOpen(false);
    };
    const menuHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
    };
    return (
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
                                src={"https://www.youtube.com/embed/" + movieDetail.video + "?autoplay=1"}
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
                                        <LikeDislikes check_like={movieDetail.like} contents_id={contents_id} />
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
                        <ReviewComponnent contents_id={contents_id} />
                    </Grid>
                </Card>
            </Container>
        </Fade>
    </Modal>
    )
}