import React, { Component } from "react";

import {
  listTargetedJobFairsGet,
  listCityCareerFairsGet
} from "../services/JobFairsServer";

class JobFairsApp extends Component {
  state = {
    targetedJobFairsList: [],
    cityCareerFairsList: [],
    jobFairsList: []
  };

  listTargetedJobFairs = () => {
    listTargetedJobFairsGet()
      .then(response => {
        console.log("Targeted Job Fairs GET success!");
        console.log(response);

        this.setState({ targetedJobFairsList: response.data });
      })
      .catch(error => {
        console.log("Targeted Job Fairs GET failed!");
        console.log(error);
      });
  };

  listCityCareerFairs = () => {
    listCityCareerFairsGet()
      .then(response => {
        console.log("City Career Fairs GET success!");
        console.log(response);

        this.setState({ cityCareerFairsList: response.data });
      })
      .catch(error => {
        console.log("City Career Fairs GET failed!");
        console.log(error);
      });
  };

  componentDidMount() {
    this.listTargetedJobFairs();
    this.listCityCareerFairs();
  }

  render() {
    const { targetedJobFairsList, cityCareerFairsList } = this.state;

    console.log("render targetedJobFairsList: ", targetedJobFairsList);
    console.log("render cityCareerFairsList: ", cityCareerFairsList);

    return (
      <div>
        <h1>Job Fairs using the Web Scraper!</h1>
      </div>
    );
  }
}

export default JobFairsApp;
