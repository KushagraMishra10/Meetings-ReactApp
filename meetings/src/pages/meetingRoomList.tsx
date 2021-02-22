import React, { useState, useEffect } from "react";
import MeetingsService from "../services/MeetingsService";
import "../css/meetingRoomList.css";
import { useDispatch, useSelector } from "react-redux";

const MeetingRoomList = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const state: any = useSelector((state: any) => state.meetingsReducer);

  let fetchData = async () => {
    let filteredRooms = state.rooms.filter((room: any) => {
      return room.building.name === state.addMeeting.building;
    });
    setRooms(filteredRooms);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const onSave = () => {
    alert("Saved");
  };
  return (
    <>
      {rooms &&
        rooms.map((room: any) => {
          return (
            <div className="meeting-room">
              <div>{room.name}</div>
              <div>{room.building.name}</div>
              <div> Floor {room.floor}</div>
            </div>
          );
        })}
      <button onClick={onSave}>Save</button>
    </>
  );
};

export default MeetingRoomList;
