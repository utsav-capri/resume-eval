import React, { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./FinalScoreDashboard.css"; // Create a CSS file for styling

import ScoreCard from "./ScoreCard";
import ProjectScoreCard from "./ProjectScoreCard";
import { detailApplication } from "../../Actions/applicationActions";
import ChatComponent from "./ChatComponent";

const FinalScoreDashboard = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const { error, loading, applicationDetail } = useSelector(
    (state) => state["applicationsDetail"]
  );
  useEffect(() => {
    dispatch(detailApplication(id));
  }, []);
  // return <div>Hello</div>;
  const projectName1 = "notes-generator";
  const projectName2 = "warehouse-optimisation";
  const projectName3 = "JApi";
  const scores1 = [
    { id: "readability", value: 80 },
    { id: "modularity", value: 70 },
    { id: "effeciency   ", value: 90 },
    { id: "complexity", value: 80 },
    { id: "uniqueness", value: 70 },
    // Add more score objects as needed
  ];
  const scores2 = [
    { id: "readability", value: 80 },
    { id: "modularity", value: 70 },
    { id: "effeciency   ", value: 90 },
    { id: "complexity", value: 80 },
    { id: "uniqueness", value: 70 },
    // Add more score objects as needed
  ];
  const scores3 = [
    { id: "readability", value: 30 },
    { id: "modularity", value: 20 },
    { id: "effeciency   ", value: 10 },
    { id: "complexity", value: 80 },
    { id: "uniqueness", value: 70 },
    // Add more score objects as needed
  ];
  return (
    <div className="score-container">
      {/* <HrInfo/> */}
      <div className="window">
        <div className="first-window">
          <div className="first-column"></div>

          <div className="middle-column">
            {/* <ProjectScoreCard projectName={"jApi"} scores={scores}/> */}
            {/* <ScoreCard title={"Overall Score"} score={87}/>  */}
            {/* <ProjectScoreCard title={"jApi"} scores={scores}/> */}
            <ScoreCard
              title={"Technical Skill"}
              score={
                Math.ceil(
                  applicationDetail?.analytics?.ratings?.candidate_rating
                    ?.technical_skill * 10
                )
                // 64
              }
            />
            <ScoreCard
              title={"Relevance Skill"}
              score={Math.ceil(
                applicationDetail?.analytics?.ratings?.candidate_rating
                  ?.relevance * 10
              )}
            />
          </div>

          <div className="first-column">
            {/* <ScoreCard title={"Leadership Score"} score={43}/> */}
            {/* <ScoreCard title={"Collaboratio Score"} score={96}/> */}
          </div>
        </div>

        <div className="second-window">
          {applicationDetail?.analytics?.ratings?.project_rating &&
            Object.entries(
              applicationDetail?.analytics?.ratings?.project_rating
            ).map((key, val) => {
              return <ProjectScoreCard projectName={key[0]} {...key[1]} />;
})}
          {/* <ProjectScoreCard projectName={projectName2} scores={scores2} />
          <ProjectScoreCard projectName={projectName3} scores={scores3} /> */}
          <ChatComponent chat={applicationDetail?.analytics?.chats} />
        </div>
      </div>
    </div>
  );
};

export default FinalScoreDashboard;
