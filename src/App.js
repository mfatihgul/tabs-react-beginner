import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [active, setActive] = useState(0);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const newJobs = await res.json();

      setLoading(false);
      setJobs(newJobs);
      console.log(newJobs);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading</h1>
      </section>
    );
  }
  if (jobs.length === 0) {
    return (
      <section className="section">
        <h1>There's no job at the moment</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[active];

  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button
                onClick={() => setActive(index)}
                className={`job-btn ${
                  index === active ? "active-btn" : "false"
                }`}
                key={job.id}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date"> {dates} </p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p> {duty} </p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
