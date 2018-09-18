import React, { Component } from "react";
import _ from "lodash";
import { Container, Table } from "semantic-ui-react";

class JobFairsTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  formatJobFairsList = jobFairsList => {
    let formattedList = [];

    jobFairsList.forEach(jobFair => {
      //   console.log("jobFairsList jobFair: ", jobFair);

      if (jobFair.jobFairSiteName === "Targeted Job Fairs") {
        let date = new Date(jobFair.date);

        const jobFairT = {
          jobFairName: `${jobFair.jobFairSiteName}: ${jobFair.eventType}`,
          jobFairDate: date.toLocaleDateString(),
          jobFairLocation: jobFair.location,
          jobFairResource: jobFair.jobFairSiteName,
          jobFairLink: jobFair.candidateLink
        };

        formattedList.push(jobFairT);
      }

      if (jobFair.jobFairSiteName === "City Career Fair") {
        let dateEventStrArr = jobFair.dateEventName.split(" • ");
        let date = new Date(dateEventStrArr[0]);

        date.setFullYear(2018);

        let eventStrArr = dateEventStrArr[1].split(" I");

        // console.log("jobFairsList jobFair dateEventString: ", dateEventStrArr);
        // console.log("jobFairsList jobFair eventStrArr: ", eventStrArr);

        const jobFairC = {
          jobFairName: dateEventStrArr[1],
          jobFairDate: date.toLocaleDateString(),
          jobFairLocation: eventStrArr[0],
          jobFairResource: jobFair.jobFairSiteName,
          jobFairLink: jobFair.eventLink
        };

        formattedList.push(jobFairC);
      }
    });

    this.setState({ data: formattedList });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.jobFairsList !== prevProps.jobFairsList) {
      this.formatJobFairsList(this.props.jobFairsList);
    }
  }

  render() {
    const { column, data, direction } = this.state;

    const { jobFairsList } = this.props;

    console.log("render data: ", data);

    return (
      <div>
        <h1>Job Fairs Table!</h1>
        <Container>
          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === "jobFairName" ? direction : null}
                  onClick={this.handleSort("jobFairName")}
                >
                  Job Fair Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "jobFairDate" ? direction : null}
                  onClick={this.handleSort("jobFairDate")}
                >
                  Job Fair Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "jobFairLocation" ? direction : null}
                  onClick={this.handleSort("jobFairLocation")}
                >
                  Job Fair Location
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "jobFairResource" ? direction : null}
                  onClick={this.handleSort("jobFairResource")}
                >
                  Job Fair Resource
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "jobFairLink" ? direction : null}
                  onClick={this.handleSort("jobFairLink")}
                >
                  Job Fair Link
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(
                data,
                ({
                  jobFairName,
                  jobFairDate,
                  jobFairLocation,
                  jobFairResource,
                  jobFairLink
                }) => (
                  <Table.Row key={jobFairName + jobFairDate}>
                    <Table.Cell>{jobFairName}</Table.Cell>
                    <Table.Cell>{jobFairDate}</Table.Cell>
                    <Table.Cell>{jobFairLocation}</Table.Cell>
                    <Table.Cell>{jobFairResource}</Table.Cell>
                    <Table.Cell>
                      <a href={jobFairLink} target="_blank">
                        {jobFairLink}
                      </a>
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        </Container>
        <p>Total Job Fairs: {jobFairsList.length}</p>
      </div>
    );
  }
}

export default JobFairsTable;
