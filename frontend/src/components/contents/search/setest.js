import { makeStyles, fade } from "@material-ui/core";
import React, { useState, useRef, useCallback } from "react";
import { InputBase, Container } from "@material-ui/core";
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
          width: '100%',
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
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
        [theme.breakpoints.up('lg')]: {
            width: '70ch',
        },
        [theme.breakpoints.up('xl')]: {
            width: '120ch',
        },
      },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            width: theme.spacing(30),
        }
    },
    main: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '95vh',
    }

}))

export default function SearchContents() {
    const classes = useStyles();
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const {list} = SearchService(query, pageNumber)

    // const observer = useRef()
    // const lastBookElementRef = useCallback(node => {
    //   if (loading) return 
    //   if (observer.current) observer.current.disconnect()
    //   observer.current = new IntersectionObserver(entries => {
    //     if (entries[0].isIntersecting && hasMore) {
    //       setPageNumber(prevPageNumber => prevPageNumber + 1)
    //     }
    //   })
    //   if (node) observer.current.observe(node) 
    // }, [loading, hasMore])

    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    return (
        <div>
            <Container className={classes.main} variant="xl">
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
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
                    type="text"
                />
            </div>
            <div>
                {list.map((l, index) => {
                    if (list.length === index + 1){
                        return (
                            <div  key={l.title}>{l.title}</div>
                        )
                    } else {
                        return (
                            <div key={l.title}>{l.title}</div>
                        )
                    }

                })}
            {/* <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error...'}</div> */}
            </div>
            </Container>
        </div>
    );
}
