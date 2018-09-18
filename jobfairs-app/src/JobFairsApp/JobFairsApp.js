import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import {
  listTargetedJobFairsGet,
  listCityCareerFairsGet,
  listAllJobFairsGet
} from "../services/JobFairsServer";

import JobFairsTable from "./JobFairsTable";
import SemanticSortableTable from "./SemanticSortableTable";

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

  listAllJobFairs = () => {
    listAllJobFairsGet()
      .then(response => {
        console.log("All Job Fairs GET success!");
        console.log(response);

        this.setState({ jobFairsList: response.data });
      })
      .catch(error => {
        console.log("All Job Fairs GET failed!");
        console.log(error);
      });
  };

  combineJobFairs = () => {
    const { targetedJobFairsList, cityCareerFairsList } = this.state;

    let newJobFairsList = targetedJobFairsList.slice();
    newJobFairsList.concat(cityCareerFairsList);

    this.setState({ jobFairsList: newJobFairsList });
  };

  componentDidMount() {
    // this.listTargetedJobFairs();
    // this.listCityCareerFairs();
    this.listAllJobFairs();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.cityCareerFairsList !== prevState.cityCareerFairsList) {
    //   this.combineJobFairs();
    // }
  }

  render() {
    const {
      targetedJobFairsList,
      cityCareerFairsList,
      jobFairsList
    } = this.state;

    console.log("render targetedJobFairsList: ", targetedJobFairsList);
    console.log("render cityCareerFairsList: ", cityCareerFairsList);
    console.log("render jobFairsList: ", jobFairsList);

    return (
      <div>
        <h1>Job Fairs using the Web Scraper!</h1>
        <JobFairsTable jobFairsList={jobFairsList} />
      </div>
    );
  }
}

export default JobFairsApp;
