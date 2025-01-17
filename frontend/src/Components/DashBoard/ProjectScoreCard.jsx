import React from "react";
import "./ProjectScoreCard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const ProjectScoreCard = ({
  projectName,
  readability,
  modularity,
  efficiency,
  complexity,
  uniqueness,
}) => {
  const parameters = {
    readability,
    modularity,
    efficiency,
    complexity,
    uniqueness,
  };
  console.log("Parameters", parameters);
  return (
    // <div className="score-card">
    //   <h2>{projectName}'s Score</h2>
    //   <div className="parameter">
    //     <span>Parameter 1:</span>
    //     <div className="progress-bar">
    //       <div style={{ width: `${(scores.parameter1 / 10)}%`, backgroundColor: '#007bff',
    // height: '50%'}}></div>
    //     </div>
    //   </div>
    //   <div className="parameter">
    //     <span>Parameter 2:</span>
    //     <div className="progress-bar">
    //       <div style={{ width: `${(scores.parameter2 / 100) * 100}%` }}></div>
    //     </div>
    //   </div>
    //   <div className="parameter">
    //     <span>Parameter 3:</span>
    //     <div className="progress-bar">
    //       <div style={{ width: `${(scores.parameter3 / 100) * 100}%` }}></div>
    //     </div>
    //   </div>
    //   <div className="parameter">
    //     <span>Parameter 4:</span>
    //     <div className="progress-bar">
    //       <div style={{ width: `${(scores.parameter4 / 100) * 100}%` }}></div>
    //     </div>
    //   </div>
    //   <div className="parameter">
    //     <span>Parameter 5:</span>
    //     <div className="progress-bar">
    //       <div style={{ width: `${(scores.parameter5 / 100) * 100}%` }}></div>
    //     </div>
    //   </div>
    // </div>

    <div className="wrapper-project">
      <div className="project-title">
        <h3>{projectName}</h3>
      </div>
      <div className="individual_score">
        {Object.keys(parameters).map((key) => (
          <div key={key} className="singel-column">
            <div className="parameter-title"> {key} </div>
            <div className="score-meter">
              <CircularProgressbar
                value={parameters[key] * 10}
                text={`${parameters[key] * 10}`}
                strokeWidth={8}
                styles={buildStyles({
                  textSize: "40px",
                  pathColor: `rgb(249, 170, 51)`,
                })}
              />
            </div>
          </div>
          // <div>{key} {parameters[key]}</div>
        ))}
      </div>
      {/* {Object.entries(scores).map((key, val) => (
          <div key={key} className="singel-column">
            <div className="parameter-title"> {key}</div>
            <div className="score-meter">
              <CircularProgressbar
                value={val}
                text={`${val}`}
                strokeWidth={8}
                styles={buildStyles({
                  textSize: "40px",
                  pathColor: `rgb(249, 170, 51)`,
                })}
              />
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default ProjectScoreCard;
