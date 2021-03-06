// import React from 'react'
// // import { Link } from 'react-router-dom';
// import MovieRecommendListService from '../service/MovieRecommendListService';

// export default function MovieRecommendListComponent() {

//   const {
//       list,
//       loading,
//       error
//   } = MovieRecommendListService()


//   return (
//     <>
//       {list.map((l,index) => {
//         return (
//           <div key={l.contents_id}>
//               <img src  ={'https://images.justwatch.com'+l.poster} alt="moviePoster"/>
//           </div>
//         );
//       })}
//       <div>{loading && 'Loading...'}</div>
//       <div>{error && 'Error...'}</div>
//     </> 
//   )
// }


import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import { Container } from "@material-ui/core";
import { Grid, Card, CardActionArea, Link, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MovieRecommendListService from "../service/MovieRecommendListService";
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
  media: {
    height: 225,
    width: "100%",
  },
}));

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ background: "black" }}
      onClick={onClick}
    />
  );
}

export default function MovieRecommendComponent(props) {
  
  const classes = useStyles();
  const {
    list,
    loading,
    error,
    msg
  } = MovieRecommendListService()
  let contents = useState();

  useEffect(() =>{
    if(msg==='데이터가 부족합니다!'){
      alert('영화 관심 설정을 10개이상 해주세요.')
      props.history.push("/movieList")
    }
  },[msg, props.history])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    
    <div>
      <Container className={classes.cardGrid} maxWidth="lg">
      
        {list.map((l) => {
          contents = l.contents
          
          return <div key={l.title}>
            <h3>{l.title}</h3>
            <Slider {...settings}>
              {contents.map(k => (
                <CardMedia
                className={classes.media}
                title={l.title}
                image={'https://images.justwatch.com' + k.poster}
              />
              ))}
              <Grid >
                <Card className={classes.card} >
                  <CardActionArea type="button">
                    <Link to={'/moviedetail/'}>
                      <CardMedia
                        className={classes.media}
                        title="contents_id"
                        // image={'https://images.justwatch.com/poster/204867081/s332'}
                      >
                      </CardMedia>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            </Slider>
            
          </div>
        }
        )}
        {msg !== '' ? (
          <div>{msg}</div>
        ):(
          <div></div>
        )}


        {/* <br /><br /><br /><br /><br /><br />
        <div>
          <h3>TV 추천</h3>
          <Slider {...settings}>
            <div>
              <h3>1</h3>
              <Grid item xs={6} sm={3} md={2}>
              <Card className={classes.card} >
                <CardActionArea type="button">
                  <Link to={'/moviedetail/'}>
                    <CardMedia
                      className={classes.media}
                      title="contents_id"
                      image={'https://images.justwatch.com/poster/204867081/s332'}
                    >
                    </CardMedia>
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
            <div>
              <h3>7</h3>
            </div>
            <div>
              <h3>8</h3>
            </div>
            <Grid item xs={6} sm={3} md={2}>
              <Card className={classes.card} >
                <CardActionArea type="button">
                  <Link to={'/moviedetail/'}>
                    <CardMedia
                      className={classes.media}
                      title="contents_id"
                      image={'https://images.justwatch.com/poster/204867081/s332'}
                    >
                    </CardMedia>
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
          </Slider>
        </div> */}
      </Container>
    </div>
  );
}
