import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

export default function ShowMore({ open, handleClose, aboutUs }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle id="alert-dialog-title">About Us</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            <CloseIcon sx={{ color: "#000000" }} />
          </Button>
        </DialogActions>
      </Box>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {aboutUs}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

ShowMore.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  aboutUs: PropTypes.string.isRequired,
};
