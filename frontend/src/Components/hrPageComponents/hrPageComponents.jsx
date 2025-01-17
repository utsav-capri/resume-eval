import HrInfo from "./hrInfo/hrInfo";

import JobList from "./jobLists/jobList";
import './hrPageComponents.css'

function HrPage() {
  return (
    <div className="hr-page-wrapper">
      <HrInfo />
      <JobList />
    </div>
  );
}

export default HrPage;
