import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, styled } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { v4 as uuidv4 } from "uuid";
import { blue, green, purple, red } from "@mui/material/colors";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "500px",
      },

      color: "black",
      display: "flex",
      justifyContent: "center",
    },
    listItems: {
      width: "100%",
      maxWidth: 360,
      //  boxShadow: "1px 2px 9px #3f282d",
      //borderRadius: "5px",
    },
    input: {
      //   width: "20rem",
      width: "276px",
      //   maxWidth: "300px",
    },
  };
});

const Responsive = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    color: "#d50000",
    fontSize: "25px",
  },
  [theme.breakpoints.up("md")]: {
    color: "#aa00ff",
    fontSize: "40px",
  },
  [theme.breakpoints.up("lg")]: {
    color: "#2962ff",
    fontSize: "50px",
  },
}));

interface Props {}

const Todo: React.FC<Props> = (props) => {
  const [w, setW] = useState(window.innerWidth);

  const { classes } = useStyles();
  const [listData, setListData] = useState<any>([]);
  const [checked, setChecked] = React.useState([0]);
  const [inputChange, setInputChange] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setW(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (inputChange) {
      setListData([
        ...listData,
        {
          id: uuidv4(),
          text: inputChange,
        },
      ]);
    }
  };

  const deleteTodo = (id: string) => {
    console.log(id);
    const index = listData.findIndex((items: any) => items.id === id);
    listData.splice(index, 1);
    setListData([...listData]);
  };

  return (
    <Responsive
      style={{
        backgroundColor: "#dadae4",
        height: "100vh",
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      <Grid container spacing={3} style={{ flexDirection: "column" }}>
        <Grid item lg={12}>
          <Typography
            variant="h3"
            align="center"
            paddingTop="40px"
            color="#1942b6"
          >
            Grocery List
          </Typography>
          <Typography variant="h6">ScreenSize: {w} px</Typography>
        </Grid>
        <Grid
          item
          lg={12}
          //   style={{ display: "flex", justifyContent: "center" }}
        >
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField
              id="outlined-basic"
              label="Enter Text"
              variant="outlined"
              className={classes.input}
              onChange={(e) => setInputChange(e.target.value)}
              value={inputChange}
            />
            <Button
              variant="contained"
              color="secondary"
              style={{
                maxWidth: "5rem",
                // height: "55px",
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid
          item
          lg={12}
          container
          justifyContent="center"
          component="span"
          style={{ fontSize: "1.5rem" }}
        >
          <List
            className={classes.listItems}
            style={{
              boxShadow: listData.length ? "1px 1px 1px 1px #3f282d" : "none",
              borderRadius: listData.length ? "5px" : "none",
              backgroundColor: listData.length ? "rgb(203 199 216)" : "none",
            }}
          >
            {listData.length
              ? listData.map((value: any) => {
                  const labelId = `checkbox-list-label-${value.id}`;

                  return (
                    <ListItem key={value.id} role={undefined}>
                      <ListItemText id={labelId} primary={value.text} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => {
                            deleteTodo(value.id);
                          }}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })
              : ""}
          </List>
        </Grid>
      </Grid>
    </Responsive>
  );
};

export default Todo;
