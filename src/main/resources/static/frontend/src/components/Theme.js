import { createMuiTheme } from "@material-ui/core/styles";
import { blue, blueGrey, grey } from "@material-ui/core/colors"
//  theme는 기초디자인 이후 진행될 예정입니다
const theme = createMuiTheme({
  palette: {
    // primary: {
    //     main: grey[400],
    // },
    secondary: {
        main: blueGrey[200],
    },
  },
  // status: {
  //     danger: "orange"
  // }
});

export default theme;