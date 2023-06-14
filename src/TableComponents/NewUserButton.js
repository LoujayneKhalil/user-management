import * as React from "react";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import "../TableComponents/Table.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { Divider } from "@mui/material";

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
}) {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedProfileOption, setSelectedProfile] = React.useState(null);

  const groupList = [
    { value: "office", label: "Office" },
    { value: "headOffice", label: "Head Office" },
    { value: "managers", label: "Managers" },
  ];
  const profiles = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "locked", label: "Locked" },
  ];

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
    userProfile: "",
    createdOn: Date().substring(3, 16),
  });

  const handleSubmitClick = () => {
    handleToggle();
    setUserInput((currentUser) => {
      addNew({
        ...currentUser,
        userGroup: selectedOption,
        userProfile: selectedProfileOption,
      });
      return {
        ...currentUser,
        userGroup: selectedOption,
        userProfile: selectedProfileOption,
      };
    });
    const data = JSON.parse(localStorage.getItem('data'));
    if (data == null) {
      localStorage.setItem('data', JSON.stringify(rows));
    } else {
      localStorage.setItem('data', JSON.stringify([...rows, userInput]));
    }
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

  React.useEffect(() => {
    setEditModel();
    localStorage.setItem("data", JSON.stringify(rows));
  }, [editRow],[rows]);

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
                className="select-items"
                placeholder="Choose User Group"
                onChange={(e) => setSelectedOption(e.label)}
                options={groupList}
                id="1"
              />
              <label>Assign Profile</label>
              <Select
                className="select-items"
                placeholder="Choose Profile"
                onChange={(e) => setSelectedProfile(e.label)}
                options={profiles}
                id="2"
              />
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
