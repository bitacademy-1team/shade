import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { grey } from "@material-ui/core/colors"


const useStyles = makeStyles((theme) => ({
  arrayMenu: {
    flexGrow: 1,
  },
  formControl: {
    padding: theme.spacing(1),
    minWidth: 120,
    boxShadow: theme.shadows[5], 
    borderRadius: "10px" 
  },
  selectEmpty: {
    color: grey[100]
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.arrayMenu}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          name="age"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
        >
          <option value="">최신순</option>
          <option value="10">조회수 올림차순</option>
          <option value="20">조회수 내림차순</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}