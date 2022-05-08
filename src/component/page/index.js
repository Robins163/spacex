import React, { useEffect, useState } from "react";
import moment from "moment";
import { Col, Container, Row, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRockets,
  selectRocketName,
  setRocketName,
  selectLaunchStatus,
  setLaunchStatus,
  selectUpcoming,
  setUpcoming,
  isFetching,
  getRockets,
  setStart,
  setEnd,
} from "./pageSlice";

const initialYearDiff = 2;

export const Page = () => {
  const rocketName = useSelector(selectRocketName);
  const launchStatus = useSelector(selectLaunchStatus);
  const upcoming = useSelector(selectUpcoming);
  const fetching = useSelector(isFetching);
  const rockets = useSelector(getRockets);

  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState("");

  const fetchData = () => {
    dispatch(fetchRockets());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateStartEndTime = (timeRange = "") => {
    let startTime = "";
    let endTime = "";

    if (timeRange === "last_week") {
      startTime = moment()
        .subtract(1, "weeks")
        .startOf("week")
        .format("YYYY-MM-DD");
      endTime = moment()
        .subtract(1, "weeks")
        .endOf("week")
        .format("YYYY-MM-DD");
    } else if (timeRange === "last_month") {
      startTime = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      endTime = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD");
    } else if (timeRange === "last_year") {
      startTime = moment()
        .subtract(1, "years")
        .startOf("year")
        .format("YYYY-MM-DD");
      endTime = moment()
        .subtract(1, "years")
        .endOf("year")
        .format("YYYY-MM-DD");
    } else if (!isNaN(+timeRange)) {
      startTime = moment()
        .subtract(timeRange, "years")
        .startOf("year")
        .format("YYYY-MM-DD");
      endTime = moment()
        .subtract(timeRange, "years")
        .endOf("year")
        .format("YYYY-MM-DD");
    }
    dispatch(setStart(startTime));
    dispatch(setEnd(endTime));
  };

  const resetFilters = () => {
    dispatch(setRocketName(""));
    dispatch(setLaunchStatus(""));
    dispatch(setUpcoming(""));
    dispatch(setStart(""));
    dispatch(setEnd(""));
    setTimeRange("");
    fetchData();
  };

  const handleChange = (event) => {
    let fn = console.log;
    switch (event.target.name) {
      case "rocket_name":
        dispatch(setRocketName(event.target.value));
        break;
      case "launch_status":
        dispatch(setLaunchStatus(event.target.value));
        break;
      case "launch_time_range":
        fn = setTimeRange;
        break;
      case "upcoming":
        dispatch(setUpcoming(event.target.value));
        break;
      default:
    }
    fn(event.target.value);
  };

  useEffect(() => {
    if (timeRange) {
      calculateStartEndTime(timeRange);
    }
  }, [timeRange]);

  const previousYearOption = (totalYears = 0) => {
    const data = [];
    let yearDiff = initialYearDiff;
    let currentYear = moment()
      .subtract(initialYearDiff, "years")
      .format("YYYY");
    const lastYear = currentYear - totalYears;
    while (currentYear > lastYear) {
      data.push(
        <option key={currentYear} value={yearDiff}>
          {currentYear}
        </option>
      );
      yearDiff++;
      currentYear--;
    }
    return data;
  };

  return (
    <Container>
      <div className={"card p-2 my-3 mx-1"}>
        <Row className={"gx-2"}>
          <Col>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Search Rocket"
              name="rocket_name"
              value={rocketName}
            />
          </Col>
          <Col>
            <select
              className="form-select"
              name="launch_status"
              value={launchStatus}
              onChange={handleChange}
            >
              <option value={""}>Launch Status</option>
              <option value="true">Success</option>
              <option value="false">Failed</option>
            </select>
          </Col>
          <Col>
            <select
              className="form-select"
              value={timeRange}
              onChange={handleChange}
              name="launch_time_range"
            >
              <option value={""}>Time</option>
              <option value="last_week">Last Week</option>
              <option value="last_month">Last Month</option>
              <option value="last_year">Last Year</option>
              {previousYearOption(50)}
            </select>
          </Col>
          <Col>
            <select
              className="form-select"
              name="upcoming"
              value={upcoming}
              onChange={handleChange}
            >
              <option value={""}>Upcoming Status</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Col>
        </Row>
        <Row className={"gx-3 py-2"}>
          <Col>
            <ButtonGroup aria-label="Basic example">
              <Button variant="primary" onClick={fetchData}>
                Search
              </Button>
              <Button variant="light" onClick={resetFilters}>
                Reset
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
      {fetching ? (
        <div>Loading...</div>
      ) : (
        <div className={"card my-3 mx-1"}>
          <div className="row gx-3">
            {rockets.map((rocket, index) => {
              return (
                <div key={index} className="col-3 col-md-3 card p-3">
                  <img
                    className={"rounded img-fluid card-img-top"}
                    src={
                      rocket?.links?.mission_patch_small
                        ? rocket?.links?.mission_patch_small
                        : "https://via.placeholder.com/292x346"
                    }
                    alt={rocket.mission_name}
                  />
                  <div className={"mt-3"}>
                    <h5 className={"card-title "}>
                      Mission Name: {rocket.mission_name}
                    </h5>
                    <div className="card-body">
                      <div className="card-text text-start">
                        {" "}
                        Rocket Name: {rocket.rocket.rocket_name}
                      </div>
                      <div className="text-start">
                        {" "}
                        Date:{" "}
                        {moment(rocket.launch_date_local).format("DD MMM YYYY")}
                      </div>
                      <div className="text-start">
                        {" "}
                        Time: {moment(rocket.launch_date_local).format("HH:mm")}
                      </div>
                      <div className="card-text">
                        <div
                          className={
                            "alert " +
                            (rocket.launch_success
                              ? " alert-success"
                              : " alert-danger")
                          }
                          role="alert"
                        >
                          {rocket.launch_success
                            ? "Mission Success"
                            : "Mission Failed"}
                        </div>
                      </div>
                      <div className="card-text">
                        <div
                          className={
                            "alert " +
                            (rocket.upcoming
                              ? " alert-success"
                              : " alert-danger")
                          }
                          role="alert"
                        >
                          {rocket.upcoming ? "Upcoming" : "Not Upcoming"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
};
