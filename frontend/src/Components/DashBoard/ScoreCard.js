import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ScoreCard.css'; // Create a CSS file for styling

const ScoreCard = ({ title, score }) => {
  return (
    <div className="score-card">
      <div className="title">{title}</div>
      <div className='big-box'>
        <div className='score-meter'>
            <CircularProgressbar
            value={score}
            text={`${score}`}
            strokeWidth={8}
            styles={buildStyles({
                
                textSize: '40px',
                pathColor: `rgb(249, 170, 51)`,
                })}
                />
        </div>
        <div className='text'>
            Out of 100
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
