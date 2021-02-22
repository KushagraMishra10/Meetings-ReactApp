import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/addMeeting.css";
import eRoutes from "../routes/eRoutes";
import { useSelector, useDispatch } from "react-redux";

const AddMeetings = () => {
  const initialValues = {
    building: "",
    date: "",
    startTime: "",
    endTime: ""
  };
  const [values, setValues] = useState(initialValues);
  const history = useHistory();
  const dispatch = useDispatch();
  const state: any = useSelector((state: any) => state.meetingsReducer);
  const navigateTo = () => {
    dispatch({
      type: "MEETING_TO_BE_ADDED",
      payload: values
    });
    history.push(eRoutes.meetingList);
  };
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  return (
    <>
      <div onClick={() => history.goBack()} className="header">
        &#8592;
      </div>
      <div>
        <div className="form-field">
          <label htmlFor="title" className="left-field">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="right-field"
            onChange={handleInputChange}
          />
          <label htmlFor="date" className="left-field">
            Date
          </label>
          <input
            name="date"
            type="date"
            className="right-field"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="startTime" className="left-field">
            Start Time
          </label>
          <input
            name="startTime"
            type="time"
            className="right-field"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="endTime" className="left-field">
            End Time
          </label>
          <input
            name="endTime"
            type="time"
            className="right-field"
            onChange={handleInputChange}
          />
        </div>
        {state.buildings && (
          <div className="form-field">
            <label htmlFor="building" className="left-field">
              Buildings
            </label>
            <select
              name="building"
              className="right-field"
              onChange={handleInputChange}
            >
              {state.buildings.map((building: any) => {
                return <option>{building.name}</option>;
              })}
            </select>
          </div>
        )}
        <button onClick={navigateTo}>Next</button>
      </div>
    </>
  );
};
export default AddMeetings;
