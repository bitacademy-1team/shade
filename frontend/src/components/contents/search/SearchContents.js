import { makeStyles, fade } from "@material-ui/core";
import React, { useState } from "react";
import { InputBase, Container, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import SearchService from "../../../service/contents/SearchService";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40ch",
    },
    [theme.breakpoints.up("xl")]: {
      width: "60ch",
    },
    color: grey[100],
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(30),
    },
  },
  page: {
    flexGrow: 1,
    marginRight: 30,
    marginLeft: 30,
  },
  closeicon: {
    cursor: "pointer",
  },
  img: {
    width: 50,
    borderRadius: "8%",
  },
  searchitem: {
    float: "left",
  },
  searchbox: {
    marginTop: 5,
    marginLeft: 10,
    padding: "2%",
    boxShadow: theme.shadows[5],
    borderRadius: "5%",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "80ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100ch",
    },
    [theme.breakpoints.up("xl")]: {
      width: "120ch",
    },
    height: "auto",
    backgroundColor: "white",
    overFlow: "hidden",
    overflowY: "auto",
    // display: "flex",
    position: "absolute",
    alignItems: "center",
    color: "black",
  },
}));

export default function SearchContents() {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { list, setList } = SearchService(query, pageNumber);

  function handleSearch(e) {
    const searchWord = e.target.value;
    setQuery(searchWord);
    const newFilter = list.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setPageNumber(1);

    if (searchWord === "") {
      setList([]);
    } else {
      setList(newFilter);
    }
  }

  const clearInput = () => {
    setList([]);
    setQuery("");
  };

  return (
    <div>
      <Container className={classes.main} variant="xl">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            {query.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon
                type="button"
                className={classes.closeicon}
                onClick={clearInput}
              />
            )}
          </div>
          <InputBase
            placeholder="검색어를 입력해주세요."
            variant="outlined"
            classes={{
              input: classes.inputInput,
            }}
            // inputProps={{ "aria-label": "search" }}
            onChange={handleSearch}
            value={query}
            type="text"
          />
        </div>

        {query.length !== 0 && (
          <div className={classes.searchbox}>
            {list.slice(0, 15).map((l, key) => {
              return (
                <div key={l.contents_id}>
                  <img
                    className={classes.img}
                    src={"https://images.justwatch.com" + l.poster}
                  />
                  <p>{l.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
