import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import MeetingsService from "../services/MeetingsService";
import eRoutes from "../routes/eRoutes";
import "../css/landingPage.css";
import { useDispatch } from "react-redux";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [buildings, setBuildings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [meetingsNow, setMeetingsNow] = useState<any[]>([]);

  const navigateTo = function() {
    history.push(eRoutes.addMeeting);
  };

  let fetchData = useCallback(async () => {
    let buildings = await MeetingsService.fetchBuildings();
    let rooms = await MeetingsService.fetchMeetingRooms();
    let meetings = await MeetingsService.fetchMeetings();
    setBuildings(buildings.data.Buildings);
    setRooms(rooms.data.MeetingRooms);
    setMeetings(meetings.data.Meetings);
    setIsLoaded(true);
    dispatch({
      type: "SET_BUILDINGS",
      payload: buildings.data.Buildings
    });
    dispatch({
      type: "SET_MEETINGS",
      payload: meetings.data.Meetings
    });
    dispatch({
      type: "SET_ROOMS",
      payload: rooms.data.MeetingRooms
    });
  }, [dispatch]);

  let getNowMeetings = useCallback(async () => {
    var dateString = "13/02/2019";
    var dateParts = dateString.split("/");
    var now = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    let todayMeetings = meetings.filter((meeting: any) => {
      var meetingdatepart = meeting.date.split("/");
      var meetingdate = new Date(
        +meetingdatepart[2],
        +meetingdatepart[1] - 1,
        +meetingdatepart[0]
      );

      return now.toDateString() === meetingdate.toDateString();
    });
    let nowMeetings = todayMeetings.filter((meeting: any) => {
      var hours = now.getHours();
      return (
        hours >= meeting.startTime.split(":")[0] &&
        hours < meeting.endTime.split(":")[0]
      );
    });
    setMeetingsNow(nowMeetings);
  }, [meetings]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    getNowMeetings();
  }, [getNowMeetings]);

  return (
    <>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <div>
          {buildings && (
            <div className="cards">
              <span className="headerTxt">Buildings</span>
              <div>Total {buildings.length}</div>
            </div>
          )}

          {rooms && (
            <div className="cards">
              <span className="headerTxt">Rooms</span>
              <div>Total {rooms.length}</div>
              <div>Free Now {meetings.length - meetingsNow.length}</div>
            </div>
          )}

          {meetings && (
            <div className="cards">
              <span className="headerTxt">Meetings</span>
              <div>Total</div>
              {meetings.length}
              <div>Total {meetingsNow.length} going on now </div>
            </div>
          )}
          <div className="btnContainer">
            <button className="addMeetingBtn" onClick={navigateTo}>
              Add a Meeting
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default LandingPage;
