import * as React from "react";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import "../TableComponents/Table.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Divider, MenuItem, Select } from "@mui/material";

const Pointer = {
  cursor: "pointer",
};

export default function NewUserButton({
  addNew,
  editRow,
  modalValue,
  handleToggle,
  modifyRow,
  handleAddDisplay,
  AddButtonDisplay,
  rows,
  handleEditMode,
}) {


  const setEditModel = () => {
    if (editRow !== {}) {
      setUserInput(editRow);
      handleToggle();
    }
  };

  const [userInput, setUserInput] = React.useState({
    fullName: "",
    userName: "",
    email: "",
    userGroup: "",
    userProfile: "option",
    createdOn: Date().substring(3, 16),
  });
  React.useEffect(() => {
     setUserInput({...userInput,userProfile:"none",userGroup:'none'})
  },[modalValue])


  const handleSubmitClick = () => {
    handleToggle();
    handleEditMode();
    addNew(userInput)
    let data = JSON.parse(localStorage.getItem("data"));

    if (data == null) {
      localStorage.setItem("data", JSON.stringify(rows));
    }

    var old_data = JSON.parse(localStorage.getItem("data"));
    old_data.push({ id: rows.length + 1, userInput });

    localStorage.setItem("data", JSON.stringify(old_data));
  };

  const handleEdit = () => {
    modifyRow(userInput, editRow);
  };

  const addNewBtn = () => {
    handleToggle();
    setUserInput({
      fullName: "",
      userName: "",
      email: "",
      userGroup: "",
      userProfile: "",
      createdOn: Date().substring(3, 16),
    });
    handleAddDisplay(true);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUserInput({
      fullName: "",
      userName: "",
      email: "",
      userGroup: "",
      userProfile: "",
    });
  };

  React.useEffect(
    () => {
      setEditModel();
      localStorage.setItem("data", JSON.stringify(rows));
    },
    [editRow],
    [rows]
  );

  return (
    <div>
      <button className="addNewBtn" onClick={addNewBtn}>
        <AddIcon /> Add New
      </button>
      <Modal
        open={modalValue}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper">
          <div className="new-user-modal">
            <div
              className="header-wrapper"
              style={{
                backgroundColor: "#050e2d",
                color: "#fff",
                borderRadius: "10px 10px 0 0",
                padding: "0 20px",
              }}
            >
              <h2>Add New User</h2>
              <CloseIcon onClick={handleToggle} style={Pointer} />
            </div>
            <div
              className="fields-new-user"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label>Full Name</label>
              <TextField
                sx={{ mt: "5px", mb: "20px" }}
                size="small"
                placeholder="Enter full Name"
                value={userInput.fullName}
                onChange={(e) =>
                  setUserInput({ ...userInput, fullName: e.target.value })
                }
              />
              <label>User Name</label>
              <TextField
                sx={{ mt: "5px", mb: "20px" }}
                size="small"
                placeholder="Enter user name"
                value={userInput.userName}
                onChange={(e) =>
                  setUserInput({ ...userInput, userName: e.target.value })
                }
              />
              <label>Email Address</label>
              <TextField
                sx={{ mt: "5px", mb: "20px" }}
                size="small"
                placeholder="Enter user email address"
                value={userInput.email}
                onChange={(e) =>
                  setUserInput({ ...userInput, email: e.target.value })
                }
              />
              <label>User Group</label>
              <Select
                sx={{ my: "5px" }}
                value={userInput.userGroup}
                className="select-items"
                onChange={(e) =>
                  setUserInput({ ...userInput, userGroup: e.target.value })
                }
              >
                <MenuItem disabled value='none'>
                  Choose User Group
                </MenuItem>
                <MenuItem value="Head Office">Head Office</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                <MenuItem value="Managers">Managers</MenuItem>

              </Select>
              <label>Assign Profile</label>
              <Select
                className="select-items"
                value={userInput.userProfile}
                defaultValue="none"
                onChange={(e) =>
                  setUserInput({ ...userInput, userProfile: e.target.value })
                }
              >
                <MenuItem disabled value='none'>
                  Choose Profile
                </MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Locked">Locked</MenuItem>
              </Select>
              <Divider />
              <div className="add-user-submission">
                <a href="#clear" onClick={handleClear}>
                  Reset fields
                </a>
                <div className="btns">
                  <button
                    className="add-cancel cancel-btn"
                    onClick={handleToggle}
                  >
                    Cancel
                  </button>
                  <button
                    className="add-cancel add-btn "
                    onClick={handleSubmitClick}
                    style={{ display: AddButtonDisplay ? "block" : "none" }}
                  >
                    Add User
                  </button>
                  <button
                    className="add-cancel add-btn "
                    onClick={handleEdit}
                    style={{ display: AddButtonDisplay ? "none" : "block" }}
                  >
                    Edit User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
