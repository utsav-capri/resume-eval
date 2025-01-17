import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { listJobs } from "../../../Actions/jobActions";
import JobCard from "./job/JobCard";
import "./jobList.css";

function JobList() {
  const dispatch = useDispatch();
  // states for getting notes list
  const { error, loading, jobs } = useSelector((state) => state["jobList"]);

  useEffect(() => {
    dispatch(listJobs());
  }, []);
  return (
    <div className="job-wrapper">
      {loading && <div>Loading</div>}
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default JobList;
