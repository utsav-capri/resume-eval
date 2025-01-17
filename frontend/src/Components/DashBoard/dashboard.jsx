import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailApplication } from "../../Actions/applicationActions";

function DashBoard() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const { error, loading, applicationDetail } = useSelector(
    (state) => state["applicationsDetail"]
  );
  useEffect(() => {
    dispatch(detailApplication(id));
  }, []);
  console.log(applicationDetail)
  return <div>Hello</div>;
}

export default DashBoard;
