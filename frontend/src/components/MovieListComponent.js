import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Card, Grid, CardMedia, CardActionArea, AppBar, Toolbar, Typography, CssBaseline } from "@material-ui/core";
import ContentsService from "../service/ContentsService";
import MovieDetailService from "../service/MovieDetailService";
import MovieDetailComponent from "./MovieDetailComponent";
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
    backgroundColor : "black",
    padding: "5px",
    position: "sticky",
    margin: 0,
    overflow: "auto",
    opacity: 0.7,
    float: "none",
  },
}));

export default function ContentList() {
  const classes = useStyles();
  const [query] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [open, setOpen] = React.useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  // const openModal = (contents_id) => {
  //  setOpen(true);
  // }
  // const onClick = openModal(l.contents_id) {
  //  MovieDetailService.getMovieDetail(contents_id).then(res => {
  //   setMovieDetail(res.data)
  //  })
  // }
  return (
    <React.Fragment>
      <CssBaseline/>
      <AppBar className={classes.dt}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            영화
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={1}>
            {list.map((l, index) => {
                if (list.length === index + 1) {
                return <div ref={lastPageElementRef} key={l.contents_id}>
                  <Link to={'/moviedetail/'+l.contents_id}><img src={'https://images.justwatch.com'+l.poster} alt="moviePoster"/></Link>
                </div>
                } else {
                return (
                  <Grid item key={l.contents_id} xs={6} sm={3} md={2}>
                    <Card className={classes.card} >
                      <CardActionArea type="button" onClick={handleOpen}>
                        <Link to={'/moviedetail/'+l.contents_id}>
                          <CardMedia
                            className={classes.media}
                            title="contents_id"
                            image={'https://images.justwatch.com'+l.poster}
                          >
                          </CardMedia>
                        </Link>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )}
            })}
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'End...'}</div>  {/* 페이징이 모두 끝나게 되면 Loading과 End가 동시에 출력된다 */}

          </Grid>
        </Container>
      </main>

    </React.Fragment>
  );
}