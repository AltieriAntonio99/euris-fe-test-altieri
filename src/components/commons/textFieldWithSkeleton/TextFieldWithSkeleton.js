import { Skeleton, TextField } from "@mui/material";
import React from "react";

const TextFieldWithSkeleton = (props) => {
  return (
    <>
      {props.isLoading ? (
        <Skeleton animation="wave" height={"40px"} variant="text" />
      ) : (
        <TextField
          className={props.className}
          size={props.size}
          id={props.id}
          label={props.label}
          variant={props.variant}
          multiline={props.multiline}
          rows={props.rows}
          value={props.value}
          onChange={props.onChange}
          InputProps={props.InputProps}
          type={props.type}
          InputLabelProps={props.InputLabelProps}
          error={props.error}
          required={props.required}
          helperText={props.helperText || ""}
        />
      )}
    </>
  );
};

export default TextFieldWithSkeleton;
