import React, { useState } from "react";
import {
  Slide,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const styles = {
  appBar: {
    position: "relative",
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: "relative",
    flex: 1,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ImgDialog = ({ img, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={!!img}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar style={styles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseOutlined />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={styles.flex}
          >
            Cropped image
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={styles.imgContainer}>
        <img src={img} alt="Cropped" style={styles.img} />
      </div>
    </Dialog>
  );
};

export default ImgDialog;
