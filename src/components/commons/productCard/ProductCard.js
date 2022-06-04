import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Skeleton,
  Typography,
  Tooltip,
} from "@mui/material";
import React from "react";
import "./ProductCard.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductCard = (props) => {
  return (
    <Box sx={{ width: "280px", minHeight: "280px" }}>
      <Card className="ce-productCard" variant="outlined">
        <CardContent className="ce-productCard-content">
          <Tooltip title={props.employee || ""}>
            <Typography
              height={"30px"}
              className="ce-noWrap"
              color="text.secondary"
            >
              {props.isLoading ? (
                <Skeleton animation="wave" height={"40px"} variant="text" />
              ) : (
                props.employee
              )}
            </Typography>
          </Tooltip>
          <Tooltip title={props.title || ""}>
            <Typography
              variant="h6"
              className="ce-noWrap"
              height={"30px"}
              component="div"
            >
              {props.isLoading ? (
                <Skeleton animation="wave" height={"40px"} variant="text" />
              ) : (
                props.title
              )}
            </Typography>
          </Tooltip>
          <Tooltip title={props.category || ""}>
            <Typography
              height={"30px"}
              className="ce-noWrap"
              color="text.secondary"
            >
              {props.isLoading ? (
                <Skeleton animation="wave" height={"40px"} variant="text" />
              ) : (
                props.category
              )}
            </Typography>
          </Tooltip>
          <Typography variant="body2" height={"100px"} overflow="auto">
            {props.isLoading ? (
              <Skeleton animation="wave" height={"40px"} variant="text" />
            ) : (
              props.description
            )}
          </Typography>
        </CardContent>
        <CardActions className="ce-productCard-actions">
          {props.isLoading ? (
            <Skeleton
              animation="wave"
              width={"100%"}
              height={"40px"}
              variant="text"
            />
          ) : (
            <>
              <Typography color="text.secondary">{props.price}</Typography>
              <div>
                <IconButton
                  aria-label="View product"
                  onClick={() => props.onClickView(props.id)}
                  color="secondary"
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="Delete product"
                  onClick={() => props.onClickDelete(props.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
