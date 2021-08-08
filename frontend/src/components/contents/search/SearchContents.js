import { makeStyles, fade } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import SearchService from "../../../service/contents/SearchService";

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
    },        
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '60%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            width: theme.spacing(30),
        }
    }

}))

export default function SearchContents() {
    const classes = useStyles();
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const {
        list,
    } = SearchService(query, pageNumber)

    function handleSearch(e) {
        setQuery(e.target.value)
        
        setPageNumber(1)
    }

    const clearInput = () => {
        query([]);
        setQuery("");
        console.log("test")
    };

    return (
        <div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    {list.length !== 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id='clearBtn' onClick={clearInput} />
                    )}
                    {/* <SearchIcon /> */}
                </div>
                <InputBase
                    placeholder="검색어를 입력해주세요."
                    variant="outlined"
                    classes={{
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                    value={query}
                />
            </div>
            <div>
                {list.map((l, index) => {
                    if (list.length === index + 1)
                    return (
                        <div key={l.contents_id}>{l.title}</div>
                    ) 
                })}
            </div>
        </div>
    );
}
