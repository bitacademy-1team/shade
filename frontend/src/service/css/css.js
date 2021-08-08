import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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