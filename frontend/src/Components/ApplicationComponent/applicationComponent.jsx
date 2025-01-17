import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  listApplications,
  createApplications,
} from "../../Actions/applicationActions";
import ListItem from "./Application/ListItem";
import ApplicationSideBar from "./applicationSideBar/applicationSideBar";
// import Application from "./Application/application";

import "./applicationComponent.css";

function ApplicationList() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [resumeUrl, setResumeUrl] = useState("");
  // states for getting notes list
  const { error, loading, applications } = useSelector(
    (state) => state["applicationList"]
  );
  const { desc, applicants } = applications;

  useEffect(() => {
    dispatch(listApplications(id));
  }, []);
  // take all the data and send it to backend

  const handleSubmit = function (e) {
    e.preventDefault();
    const data = {
      resume_url: resumeUrl,
    };
    dispatch(createApplications(data, id));
  };

  console.log(applicants);
  return (
    <div className="application-component-wrapper">
      {loading && <div>Loading</div>}
      <ApplicationSideBar desc={desc} />
      <div className="application-main-item-list">
        {applicants.map((application) => (
          <ListItem key={application.id} {...application} />
        ))}
      </div>
      {/* <textarea
        value={resumeUrl}
        onChange={(e) => setResumeUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>*/}
    </div>
  );
}

export default ApplicationList;
