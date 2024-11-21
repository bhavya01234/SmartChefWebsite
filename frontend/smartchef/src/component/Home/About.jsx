import React from "react";
import "./About.css";
import divya from "../images/divyaChef.jpg";
import unknown from "../images/unknown.jpg";
import { Link } from "react-router-dom";
import back from "../images/back.png";

const About = () => {
  return (
    <div className="about-container">
      <Link to="/" className="back-button" >
        <img src={back} width="10%"/>
      </Link>
      
      <h1 className="about-title">About Smart Chef</h1>
      <p className="about-description">
        <strong>Smart Chef</strong> brings innovative technology into your
        kitchen. Simply snap a photo of your fridge, and Smart Chef will analyze
        the ingredients and suggest delicious recipes, focusing on authentic
        Indian cuisine. Powered by advanced image recognition and machine
        learning, we turn your ingredients into an inspiring meal suggestion!
      </p>

      <h2 className="team-title">Meet Our Team</h2>
      <div className="team-cards">
        {/* Team member 1 */}
        <div className="card">
          <div className="card-image-container">
            <img src={divya} alt="Team Member 1" className="card-img" />
          </div>
          <h3>Divya</h3>
          {/* <p className="card-role">Project Lead</p>
          <p className="card-description">
            Specializes in project management and machine learning integrations.
          </p> */}
        </div>

        {/* Team member 2 */}
        <div className="card">
          <div className="card-image-container">
            <img src={unknown} alt="Team Member 2" className="card-img" />
          </div>
          <h3>Madhura Jituri</h3>
          {/* <p className="card-role">Backend Developer</p>
          <p className="card-description">
            Focused on building efficient APIs and data management.
          </p> */}
        </div>

        {/* Team member 3 */}
        <div className="card">
          <div className="card-image-container">
            <img src={unknown} alt="Team Member 3" className="card-img" />
          </div>
          <h3>Bhavya Malik</h3>
          {/* <p className="card-role">Frontend Developer</p>
          <p className="card-description">
            Designs and develops a user-friendly, interactive interface.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default About;
