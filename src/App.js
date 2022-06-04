import "./App.scss";
import CrudModal from "./components/crudModal/CrudModal";
import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Skeleton,
  TablePagination,
  Toolbar,
} from "@mui/material";
import StickyHeaderTable from "./components/table/stickyHeaderTable/StickyHeaderTable";
import { productAPI, storeAPI } from "./components/helpers/api/api";
import AddIcon from "@mui/icons-material/Add";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import PolarAreaChart from "./components/charts/PolarAreaChart";
import ProductCard from "./components/commons/productCard/ProductCard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import PieChartIcon from "@mui/icons-material/PieChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#193f78",
    },
    secondary: {
      main: "#83c986",
    },
  },
});

const fakeRowsForSkeleton = [
  {
    category: "",
    description: "",
    employee: "",
    id: 0,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 1,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 2,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 3,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 4,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 5,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 6,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 7,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 8,
    price: "",
    reviews: [],
    title: "",
  },
  {
    category: "",
    description: "",
    employee: "",
    id: 9,
    price: "",
    reviews: [],
    title: "",
  },
];

const columns = [
  {
    id: "title",
    label: "Title",
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
  },
  {
    id: "employee",
    label: "Employee",
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    align: "center",
  },
];

function App() {
  //#region General
  const getStore = async () => {
    const result = await storeAPI.get("ijpxNJLM732vm8AeajMR");
    setStoreName(result.data.name);
  };

  useEffect(() => {
    getProducts();
    getStore();
  }, []);
  //#endregion

  //#region Tab
  const [tabIndex, setTabIndex] = useState("products");

  const handleTabChange = (event, value) => {
    setTabIndex(value);
  };

  //#endregion

  //#region Pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    getProducts();
  }, [page, pageSize]);
  //#endregion

  //#region Modal
  const [productId, setProductId] = useState(null);
  const [headerModalLabel, setHeaderModalLabel] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [open, setOpen] = useState(false);

  const setClose = () => {
    setOpen(false);
    setProductId(null);
    setIsDelete(false);
    setIsView(false);
    setIsNew(false);
    getProducts();
  };
  //#endregion

  //#region Table
  const [storeName, setStoreName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    setIsLoading(true);
    const result = await productAPI.getAll(
      "ijpxNJLM732vm8AeajMR",
      page + 1,
      pageSize
    );
    let data = [];
    result?.data?.list.forEach((item) => {
      data.push({
        id: item.id,
        ...item.data,
      });
    });
    setRowCount(result.data.length);
    setData(data);
    setIsLoading(false);
  };
  //#endregion

  //#region ViewProducts
  const ViewProducts = (
    <>
      <Box sx={{ height: "calc(100% - 77px)", padding: "1rem" }}>
        <StickyHeaderTable
          isLoading={isLoading}
          columns={columns || []}
          rows={isLoading ? fakeRowsForSkeleton : data}
          rowsPerPage={pageSize}
          page={page}
          onClickDelete={(e) => {
            setProductId(e);
            setOpen(true);
            setHeaderModalLabel("Delete Product");
            setIsDelete(true);
          }}
          onClickView={(e) => {
            setProductId(e);
            setOpen(true);
            setHeaderModalLabel("View Product");
            setIsView(true);
          }}
        ></StickyHeaderTable>
      </Box>
      <Box
        className="secondary-background"
        sx={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          justifyContent: "center",
          display: "flex",
          height: "52px",
        }}
      >
        <TablePagination
          className="black-text"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowCount}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={(e, page) => {
            setPage(page || 0);
          }}
          onRowsPerPageChange={(e) => {
            setPageSize(e.target.value || 10);
          }}
        />
      </Box>
    </>
  );
  //#endregion

  //#region ViewProductsCard
  const ViewProductsCard = (
    <>
      <Box
        sx={{
          height: "calc(100% - 77px)",
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div className="responsive-Grid">
          {isLoading
            ? fakeRowsForSkeleton?.map((item) => (
                <ProductCard
                  key={item.id}
                  isLoading={isLoading}
                  id={item.id}
                  employee={item.employee}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  price={item.price}
                />
              ))
            : data?.map((item) => (
                <ProductCard
                  key={item.id}
                  isLoading={isLoading}
                  id={item.id}
                  employee={item.employee}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  price={item.price}
                  onClickDelete={(e) => {
                    setProductId(e);
                    setOpen(true);
                    setHeaderModalLabel("Delete Product");
                    setIsDelete(true);
                  }}
                  onClickView={(e) => {
                    setProductId(e);
                    setOpen(true);
                    setHeaderModalLabel("View Product");
                    setIsView(true);
                  }}
                />
              ))}
        </div>

        {/* <StickyHeaderTable
          isLoading={isLoading}
          columns={columns || []}
          rows={isLoading ? fakeRowsForSkeleton : data}
          rowsPerPage={pageSize}
          page={page}
          
        ></StickyHeaderTable> */}
      </Box>
      <Box
        className="secondary-background"
        sx={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          justifyContent: "center",
          display: "flex",
          height: "52px",
        }}
      >
        <TablePagination
          className="black-text"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowCount}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={(e, page) => {
            setPage(page || 0);
          }}
          onRowsPerPageChange={(e) => {
            setPageSize(e.target.value || 10);
          }}
        />
      </Box>
    </>
  );
  //#endregion

  //#region ViewChart
  const ViewChart = (
    <>
      <PolarAreaChart></PolarAreaChart>
    </>
  );
  //#endregion

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box sx={{ height: "65px" }}>
          <AppBar position="static">
            <Toolbar>
              <div className="ce-header">
                <h1 className="ce-storeName">
                  {storeName ?? (
                    <Skeleton animation="wave" height={"40px"} variant="text" />
                  )}
                </h1>
                <Button
                  variant="outlined"
                  color="inherit"
                  aria-label="Add product"
                  onClick={(e) => {
                    setProductId(null);
                    setOpen(true);
                    setIsNew(true);
                    setHeaderModalLabel("Add Product");
                  }}
                  endIcon={<AddIcon />}
                >
                  Add product
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>

        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              className="ce-tabList"
              onChange={handleTabChange}
              style={{ height: "48px" }}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab value="products" color="primary" label={<TableRowsIcon />} />
              <Tab value="productsCard" label={<ViewComfyIcon />} />
              <Tab value="chart" label={<PieChartIcon />} />
            </TabList>
          </Box>
          <TabPanel
            value="products"
            className="ce-tabPanel"
            style={{ height: "calc(100% - 113px)" }}
          >
            <Box sx={{ height: "100%" }}>{ViewProducts}</Box>
          </TabPanel>
          <TabPanel
            value="productsCard"
            className="ce-tabPanel"
            style={{ height: "calc(100% - 113px)" }}
          >
            <Box sx={{ height: "100%" }}>{ViewProductsCard}</Box>
          </TabPanel>
          <TabPanel
            value="chart"
            className="ce-tabPanel"
            style={{ height: "calc(100% - 113px)" }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {ViewChart}
            </Box>
          </TabPanel>
        </TabContext>

        <CrudModal
          key={`${productId}${isNew}`}
          open={open}
          setClose={setClose}
          productId={productId}
          headerModalLabel={headerModalLabel}
          isDelete={isDelete}
          isView={isView}
        ></CrudModal>
      </div>
    </ThemeProvider>
  );
}

export default App;
