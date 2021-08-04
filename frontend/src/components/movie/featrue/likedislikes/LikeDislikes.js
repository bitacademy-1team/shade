import React, {useState, useEffect} from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  likebox: {
    display: "flex",
    justifyContent: "space-around",
  },
  page: {
    backgroundColor: grey[900]
  },
  like: {
    color: grey[500]
  }
}))

export default function LikeDislikes(props) {
  const classes = useStyles();
  const [Likes, setLikes] = useState(0)
  const [Dislikes, setDislikes] = useState(0)
  const [LikeAction, setLikeAction] = useState(null)
  const [DisLikeAction, setDisLikeAction] = useState(null)
  
  let variable = {};
  
  if (props.contents_id) {
    variable = { contents_id: props.contents_id, user_id: props.user_id };
  }
  
  useEffect(() => {
    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        setLikes(response.data.likes.length);
        //내가 좋아요를 이미 눌렀는지
        response.data.likes.map((like) => {
          if (like.user_id === props.user_id) {
            //pros.userId는 로그인한 사용자의 Id이기때문
            setLikeAction('liked');
          }
        });
      } else {
        alert('Like에 대한 정보를 가져오지 못했습니다.');
      }
    });

    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 싫어요를 받았는지
        setDislikes(response.data.dislikes.length); 
        //내가 싫어요를 이미 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.user_id === props.user_id) {
            //pros.userId는 로그인한 사용자의 Id이기때문
            setDisLikeAction('disliked');
          }
        });
      } else {
        alert('DisLike에 대한 정보를 가져오지 못했습니다.');
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === '') {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction('liked');
          console.log("Like");

          if (DisLikeAction !== '') {
            setDisLikeAction('');
            setDislikes(Dislikes - 1);
            console.log("Dislike");
          }
        } else {
          // alert('Like를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/downLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes === '');
          setLikeAction('');
        } else {
          // alert('Like를 내리지 못했습니다.');
        }
      });
    }
  };

  const onDislike = () => {
    if (DisLikeAction !== '') {
      Axios.post('/api/like/downDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDisLikeAction('');
        } else {
          // alert('dislike를 지우지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDisLikeAction('disliked');

          if (LikeAction !== '') {
            setLikeAction('');
            setLikes(Likes - 1);
          }
        } else {
          // alert('dislike를 올리지 못했습니다.');
        }
      });
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.likebox}>
        <IconButton title="Like" onClick={onLike}>
          {LikeAction === '' ? (
            <ThumbUpIcon color="primary"  />
            ) : (
            <ThumbUpIcon className={classes.like} />
          )}
        </IconButton>
      
      

        <IconButton title="Dislike" onClick={onDislike}>
          {DisLikeAction === '' ? (
            <ThumbDownIcon color="secondary"  />
          ) : (
            <ThumbDownIcon className={classes.like}/>
          )}
        </IconButton>
      </div>
    </div>
  );
}


