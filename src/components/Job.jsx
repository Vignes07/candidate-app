import * as React from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, Link, styled } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import ShowMore from "./ShowMore.jsx";

function capitalizeFirstLetterOfEachWord(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Job({
  companyName,
  logoUrl,
  jobRole,
  location,
  minJdSalary,
  maxJdSalary,
  jobDetailsFromCompany,
  minExp,
}) {
  // Custom Typography for Gradient blur of text
  const StyledTypography = styled(Typography)(() => ({
    maxWidth: 300,
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "50%",
      background: "linear-gradient(transparent, white)",
    },
  }));

  // Custom Button
  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#55EFC4",
    color: "#000000",
    fontWeight: [600],
    borderRadius: 7,
    width: "100%",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#55EFC4",
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: 3,
        padding: 1,
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
      }}
    >
      <CardHeader
        avatar={<Avatar alt="company-logo" src={logoUrl} />}
        title={
          <Typography
            sx={{ color: "#8b8b8b", fontSize: 14, fontWeight: "bold" }}
          >
            {companyName}
          </Typography>
        }
        subheader={
          <>
            <Typography sx={{ color: "#000000", fontSize: 16 }}>
              {capitalizeFirstLetterOfEachWord(jobRole)}
            </Typography>
            <Typography sx={{ color: "#000000", fontSize: 12 }}>
              {capitalizeFirstLetterOfEachWord(location)}
            </Typography>
          </>
        }
      />
      <CardContent sx={{ paddingY: 0 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Estimated Salary: &#8377;
          {minJdSalary ? `${minJdSalary} - ${maxJdSalary}` : maxJdSalary} LPA
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          paddingY: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: [600] }}>About Company:</Typography>
        <Typography sx={{ fontWeight: [800] }}>About us</Typography>
        <StyledTypography
          sx={{ maxWidth: [300], maxHeight: [200] }}
          variant="body2"
        >
          {jobDetailsFromCompany}
        </StyledTypography>
        <Link
          sx={{ fontSize: 12, alignSelf: "center", cursor: "pointer" }}
          underline="none"
          onClick={handleClickOpen}
        >
          Show More
        </Link>
        <ShowMore
          open={open}
          handleClose={handleClose}
          aboutUs={jobDetailsFromCompany}
        />
      </CardContent>
      <CardContent sx={{ paddingY: 0 }}>
        <>
          <Typography
            sx={{ fontSize: 14, color: "#8b8b8b", fontWeight: [600] }}
          >
            Minimum Experience
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {minExp ? minExp + " Years" : "Fresher"}
          </Typography>
        </>
      </CardContent>
      <CardActions>
        <ColorButton variant="contained">
          <BoltIcon sx={{ color: "#ff822d" }} />
          Easy Apply
        </ColorButton>
      </CardActions>
    </Card>
  );
}

Job.propTypes = {
  logoUrl: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  jobRole: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  minJdSalary: PropTypes.number,
  maxJdSalary: PropTypes.number.isRequired,
  jobDetailsFromCompany: PropTypes.string.isRequired,
  minExp: PropTypes.number,
};

export default Job;
