import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Skeleton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import './../../../App.scss';

export default function StickyHeaderTable(props) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: "100%" }}>
      <TableContainer sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell key={column.id} align={column.align} className="primary-background white-text">
                  {column.label}
                </TableCell>
              ))}
              <TableCell key={"Actions"} align={"center"} className="primary-background white-text">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {props.columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {props.isLoading ? (
                          <Skeleton
                            animation="wave"
                            height={"40px"}
                            variant="text"
                          />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell key={"Actions"} align={"center"}>
                    {props.isLoading ? (
                      <Skeleton
                        animation="wave"
                        height={"40px"}
                        variant="text"
                      />
                    ) : (
                      <>
                        <IconButton
                          aria-label="View product"
                          onClick={() => props.onClickView(row.id)}
                          color="secondary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="Delete product"
                          onClick={() => props.onClickDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
