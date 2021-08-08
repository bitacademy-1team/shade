import React, { useState,useRef, useEffect } from "react";
import { ACCESS_TOKEN, API_BASE_URL } from "../../service/oauth2/OAuth";
import reviewService from "../../service/review/reviewService"
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Form from "react-validation/build/form";
import {
    Grid, Typography,
    Button, TextField, InputAdornment,
    List, ListItem, ListItemText, IconButton, Menu, MenuItem
} from "@material-ui/core";
import axios from "axios";

export default function ReviewComponnent({contents_id},props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [list,setList] = useState([]);
    const [list2,setList2] = useState([]);
    const [re_id,setRe_id] = useState('');
    const menuopen = Boolean(anchorEl);
    const [state,setState] = useState(0);
    const form = useRef();
    const ax = (contents_id) =>{
        if(contents_id !== ''){
            axios({
                method : 'GET',
                url : API_BASE_URL + '/review/list',
                params : {contents_id : contents_id}
            }).then(res => {
                setList(res.data)
            })
        }
        
    }
    useEffect(() => {
        ax(contents_id)
    },[contents_id,state])

    const options = [
        "신고", "수정", "삭제"
    ];

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

    const [comment, setComment] = useState('');
    const inputRef = useRef(null);
    const [v,setV] = useState('');
    const onChangeComment = (e) => {
        const comment = e.target.value;
        setV(e.target)
        setComment(comment);
    };

    const createReview = (e) => {
        let i = reviewService.createReview(contents_id, comment);
        v.value="";
        axios({
            method : 'GET',
            url : API_BASE_URL + '/review/list',
            params : {contents_id : contents_id}
        }).then(res => {
            setList(res.data)
            setState(state+1);
        })
        
    }

    const modifyReview = (e) => {
        let i = reviewService.modifyReview(re_id, comment);
        axios({
            method : 'GET',
            url : API_BASE_URL + '/review/list',
            params : {contents_id : contents_id}
        }).then(res => {
            setList2(prevList => {
                return [...new Set([...prevList, ...res.data.map(l => l)])]
            })
            
            setList(list2)
            setList2([])
            setState(1);
        })
    }

    const deleteReview = (e) => {
        let i = reviewService.deleteReview(re_id);
        axios({
            method : 'GET',
            url : API_BASE_URL + '/review/list',
            params : {contents_id : contents_id}
        }).then(res => {
            setList(res.data)
            setState(state+1);
        })
    }

    const classes = useStyles();

    const menuHandleClick = (event) => {
        setRe_id(event.currentTarget.getAttribute('data-msg'));
        setAnchorEl(event.currentTarget);
    };

    const menuHandleClose = () => {
        setAnchorEl(null);
    };


    
    return (
        <Grid item xs={12} sm={12}>
            <h2>리뷰</h2>
            <Form className={classes.form} ref={form} onsubmit={createReview}>
            <TextField
                ref={inputRef}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="댓글을 작성해 주세요"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={createReview} className={classes.submit}>
                                등록
                            </Button>
                        </InputAdornment>
                    ),
                }}
                onChange={onChangeComment}
            />
            </Form>
            <Grid>
                <List className={classes.commentList} id="re">
                {list&&list.map((l) => {
                    return <div key={l.review_id}>                    
                    <ListItem key={l.review_id} alignItems="flex-start">
                        <ListItemText
                            primary={l.review_id}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                    </Typography>
                                    {l.comment}
                                </React.Fragment>
                            }
                        />
                        <div>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                data-msg={l.review_id}
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
                                <MenuItem onClick={modifyReview}>
                                    수정
                                </MenuItem>
                                <MenuItem onClick={deleteReview}>
                                    삭제
                                </MenuItem>
                            </Menu>
                        </div>
                    </ListItem>
                    </div>
                })}
                    
                </List>
            </Grid>
        </Grid>
    );

}