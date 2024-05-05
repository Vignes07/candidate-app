import PropTypes from "prop-types";

import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";

function LoadMore({ loadMore }) {
  return (
    <Button variant="text" onClick={loadMore}>
      <ReplayIcon />
      Load More
    </Button>
  );
}

LoadMore.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default LoadMore;
