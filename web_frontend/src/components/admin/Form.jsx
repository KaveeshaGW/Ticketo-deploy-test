import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";


const Form = () => {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    station: "",
    mobileNumber: "",
    email: "",
    nic: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allStations");
      setStations(response.data.stations);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the field being edited
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const handleStationChange = (event) => {
    const selectedValue = event.target.value;
    setFormData({
      ...formData,
      station: selectedValue,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.station) {
      newErrors.station = "Station is required";
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Phone Number must be a 10-digit number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.nic) {
      newErrors.nic = "NIC Number is required";
    } else if (!/^\d{9}[vV\d]{1}$|^\d{12}$/.test(formData.nic)) {
      newErrors.nic = "NIC Number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleCancel = () => {
    setFormData({
      lastName: "",
      firstName: "",
      station: "",
      mobileNumber: "",
      email: "",
      nic: "",
      password: "",
    });
    setErrors({});
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogMessage("");
    setDialogTitle("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.post(
          "http://localhost:5000/api/add-user",
          formData,
          { headers }
        );

        setDialogMessage(response.data.message);
        setDialogTitle(response.status === 201 ? "Success" : "Error");
        setOpenDialog(true);

        if (response.status === 201) {
          // Clear form data after successful submission
          setFormData({
            lastName: "",
            firstName: "",
            station: "",
            mobileNumber: "",
            email: "",
            nic: "",
            password: "",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <div className="error-message">{errors.firstName}</div>
        </div>
        <div className="admin-form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <div className="error-message">{errors.lastName}</div>
        </div>
        <div className="admin-form-group">
          <label htmlFor="station">Station:</label>
          <select
            id="station"
            name="station"
            value={formData.station}
            onChange={handleStationChange}
          >
            <option value="">Select a station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
          <div className="error-message">{errors.station}</div>
        </div>
        <div className="admin-form-group">
          <label htmlFor="mobileNumber">Phone Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <div className="error-message">{errors.mobileNumber}</div>
        </div>
        <div className="admin-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="error-message">{errors.email}</div>
        </div>
        <div className="admin-form-group">
          <label htmlFor="nic">NIC Number:</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
          />
          <div className="error-message">{errors.nic}</div>
        </div>
        {/* Password field */}
        {/* ... */}
        <div className="admin-buttons-container">
          <button className="admin-form-button" type="submit">
            Submit
          </button>
          <button
            className="admin-cancel-button"
            type="reset"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Form;