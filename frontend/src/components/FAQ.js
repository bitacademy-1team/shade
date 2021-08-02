import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom>
          FAQ
        </Typography>
        <br/><br/><br/>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Q. SHADE 웹 사이트는 어떤 사이트 인가요?'}
        </Typography>
        <Typography variant="body1">
            A. 넷플릭스, 왓챠, 웨이브, 네이버, 구글플레이무비에서 제공하는 영화, 드라마를 추천받을 수 있으며 SHADE 웹 사이트를 이용하는 고객님들과 소통을 할수있는 사이트입니다
        </Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Q. 영상 추천은 어떤 방법으로 받게되는 건가요?'}
        </Typography>
        <Typography variant="body1">
            A. 저희 사이트를 이용해 주시는 고객님들의 좋아요, 리뷰, 조회수 등의 여러가지 요소들을 이용하여 해당이용자에게 맞춤추천을 해주고 있습니다.
        </Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Q. 제가 쓴 글을 다른사람에게도 보여줄 수 있나요?'}
        </Typography>
        <Typography variant="body1">
            A. 마이페이지-공개여부(우측상단) 를 설정하시면 다른 이용자가 자신의 마이페이지에서 좋아요, 싫어요, 남긴 글을 보여줄 수 있습니다.
        </Typography>
      </Container>
    </div>
  );
}