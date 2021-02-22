class MeetingsService {
  getToken() {
    let token = { token: "a123gjhgjsdf6576" };
    return token.token;
  }

  async requestAjax(request: any): Promise<any> {
    const fetchBody = {
      method: request.method || "GET",
      body: request.body,
      headers: {
        sso_token: this.getToken(),
        "Content-Type": "application/json"
      }
    };
    return fetch(request.url, fetchBody).then(res => {
      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }
      return res.json();
    });
  }

  fetchMeetings(): Promise<any> {
    const query = `{
      Meetings{
        title
        date
        startTime
        endTime
      }
    }`;
    let request = {
      url: "http://smart-meeting.herokuapp.com/",
      method: "POST",
      body: JSON.stringify({ query })
    };
    return this.requestAjax(request);
  }

  fetchMeetingRooms(): Promise<any> {
    const query = `{
      MeetingRooms{
        id
        name
        floor
        building{
          name
        }
        meetings{
          title
        }
      }
    }`;
    let request = {
      url: "http://smart-meeting.herokuapp.com/",
      method: "POST",
      body: JSON.stringify({ query })
    };
    return this.requestAjax(request);
  }

  async fetchBuildings(): Promise<any> {
    const query = `
  query{Buildings {
    name
    meetingRooms {
      name
      meetings {
        title
        date
        startTime
        endTime
      }
    }
  }}
`;
    let request = {
      url: "http://smart-meeting.herokuapp.com/",
      method: "POST",
      body: JSON.stringify({ query })
    };
    return this.requestAjax(request);
  }
}
export default new MeetingsService();
