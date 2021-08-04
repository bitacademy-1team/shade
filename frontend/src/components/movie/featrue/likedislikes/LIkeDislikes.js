import React, { useState,useEffect } from "react";
import { IconButton } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { API_BASE_URL, ACCESS_TOKEN } from '../../../../service/oauth2/OAuth';
import axios from "axios";

export default function LikeDislikes({ check_like, contents_id },l) {
  const [Color,setColor] = useState(check_like);

  let url
  let token

  useEffect(() =>{
    setColor(check_like)
  },[check_like])

  if (localStorage.getItem(ACCESS_TOKEN)) {
    token = localStorage.getItem(ACCESS_TOKEN);
  }

  const onLike = (like) => {
    url = API_BASE_URL + "/like/checkLike?contents_id=" + contents_id + "&like="+like
    axios({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    }).then(res =>{
      setColor(like)
      console.log("hey!!" + JSON.stringify(res))
    }).catch(e => {
      if(axios.isCancel(e)) return console.log("error")
    })
  };

  return (
    <div>
      <span key="comment-basic-like">
        <IconButton title="Like">
          {Color === 'like' ? (
            <ThumbUpIcon color="primary" onClick={() => onLike("cancel")} />
          ) : (
            <ThumbUpIcon onClick={() => onLike("like")} />
          )}
        </IconButton>
      </span>

      <span key="comment-basic-dislike" style={{ marginLeft: '4px' }}>
        <IconButton title="Dislike">
          {Color === 'unlike' ? (
            <ThumbDownIcon color="secondary"  onClick={() => onLike("cancel")}/>
          ) : (
            <ThumbDownIcon onClick={() => onLike("unlike")}/>
          )}
        </IconButton>
      </span>
    </div>
  );
}