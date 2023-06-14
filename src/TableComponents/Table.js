import * as React from "react";
import "../TableComponents/Table.css";
import { DataGrid } from "@mui/x-data-grid";
import NewUserButton from "./NewUserButton";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import DatePickerCalender from "./DatePickerCalender";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import LockIcon from "@mui/icons-material/Lock";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const iconStyle = {
  backgroundColor: "#eee",
  borderRadius: "3px",
  color: "#51576d",
  height: "34px",
  width: "34px",
  p: "5px",
};

const columns = [
  { field: "fullName", headerName: "Name", width: 160 },
  { field: "userName", headerName: "User Name", width: 200 },
  { field: "email", headerName: "Email Address", width: 200 },
  { field: "userGroup", headerName: "Group", width: 200 },
  { field: "userProfile", headerName: "Status", width: 150 },
  { field: "createdOn", headerName: "Created on", width: 200 },
];

let row = [
  {
    id: 1,
    fullName: "Ramy Mohsen",
    userName: "ramy.mohsen",
    email: "ramy.mohsen@gmail.com",
    userGroup: "Office",
    userProfile: "Active",
    createdOn: Date().substring(3, 16),
  },
  {
    id: 2,
    fullName: "Sarah Ali",
    userName: "sarah.ali",
    email: "sarah.ali@gmail.com",
    userGroup: "Head Office",
    userProfile: "Inactive",
    createdOn: Date().substring(3, 16),
  },
  {
    id: 3,
    fullName: "Gordan Ramsay",
    userName: "gordan.ramsay",
    email: "gordan.ramsay@gmail.com",
    userGroup: "Managers",
    userProfile: "Locked",
    createdOn: Date().substring(3, 16),
  },
];

export default function Table() {
  const [status, setStatus] = React.useState("");
  const [rows, setRows] = React.useState(row);
  const [currentRowData, setCurrentRow] = React.useState({});
  const [open, setOpen] = React.useState(true);
  const [AddButtonDisplay, setAddDisplay] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    filterFullNameInput(searchValue);
  }, [searchValue]);

  const filterFullNameInput = (filter) => {
    if (filter === "") {
      setRows(row);
    } else {
      let dataRow = row.filter((user) => user.fullName.toLowerCase().includes(filter))
      setRows(dataRow);
    }
  };

  const handleToggle = () => setOpen(!open);

  const addNew = (newEntry) => {
    let newnewEntry = { id: rows.length + 1, ...newEntry };
    return setRows([...rows, newnewEntry]); 
  };

  const editUser = (e) => {
    setCurrentRow(e.row);
    handleToggle();
    handleAddDisplay(false);
  };

  const handleAddDisplay = (e) => {
    setAddDisplay(e);
  };

  const modifyRow = (newData, oldData) => {
    const arr = [...rows];
    const index = arr.indexOf(oldData);
    arr[index] = newData;
    setRows(arr);
    handleToggle();
  };
  return (
    <div style={{ height: "fit-content", width: "100%" }}>
      <div className="user-title-add">
        <h2>User Management</h2>
        <NewUserButton
          handleToggle={handleToggle}
          modalValue={open}
          addNew={addNew}
          editRow={currentRowData}
          modifyRow={modifyRow}
          handleAddDisplay={handleAddDisplay}
          AddButtonDisplay={AddButtonDisplay}
          rows={rows}
        />
      </div>
      <div className="table">
        <div>
          <div className="search-filter-users">
            <TextField
              sx={{ pt: "8px" }}
              size="small"
              variant="outlined"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              placeholder="User Name"
              sx={{ pt: "8px" }}
            />
            <FormControl sx={{ pt: "8px", minWidth: 150 }} size="small">
              <InputLabel id="demo-simple-select-label" sx={{ pt: "8px" }}>
                User Status
              </InputLabel>
              <Select
                value={status}
                label="User Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"Any"}>Any </MenuItem>
                <MenuItem value={"Inactive"}>Inactive </MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Locked"}>Locked </MenuItem>
              </Select>
            </FormControl>
            <DatePickerCalender />
            <a href="#clear">All Filters</a>
          </div>
          <div className="selected-wrap">
            <div className="selected">
              <p
                style={{
                  padding: "0 20px 0 0",
                  borderRight: "1px solid #888",
                  marginRight: "10px",
                }}
              >
                <span>1 </span>selected
              </p>
              <IconButton sx={{ p: 0 }}>
                <EditIcon sx={iconStyle} />
              </IconButton>
              <IconButton sx={{ p: 0 }}>
                <DoDisturbAltIcon sx={iconStyle} />
              </IconButton>
              <IconButton sx={{ p: 0 }}>
                <LockIcon sx={iconStyle} />
              </IconButton>
              <button className="assign">Assign to Profile</button>
              <button className="assign">Assign to Group</button>
              <IconButton sx={{ p: 0 }}>
                <MoreVertIcon sx={iconStyle} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <FileDownloadIcon sx={iconStyle} />
              </IconButton>
            </div>
          </div>
        </div>
        <DataGrid
          sx={{
            borderRadius: 0,
            borderLeft: 0,
            borderRight: 0,
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onRowClick={editUser}
          checkboxSelection
        />
      </div>
    </div>
  );
}
