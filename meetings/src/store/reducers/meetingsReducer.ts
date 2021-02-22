const initialState: any = {
  buildings: [],
  meetings: [],
  rooms: [],
  addMeeting: {}
};

interface iAction {
  type: "SET_BUILDINGS" | "SET_MEETINGS" | "SET_ROOMS" | "MEETING_TO_BE_ADDED";
  payload: any;
}
export default function(state = initialState, action: iAction): any {
  switch (action.type) {
    case "SET_BUILDINGS": {
      return {
        ...state,
        buildings: action.payload
      };
    }
    case "SET_MEETINGS": {
      return {
        ...state,
        meetings: action.payload
      };
    }
    case "SET_ROOMS": {
      return {
        ...state,
        rooms: action.payload
      };
    }
    case "MEETING_TO_BE_ADDED": {
      return {
        ...state,
        addMeeting: action.payload
      };
    }
    default:
      return state;
  }
}
