import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="card text-center">
        <h5 className="card-header">To-Do Task</h5>
        <div className="card-body">
          <h5 className="card-title">Welcome to our To-Do App</h5>
          <p className="card-text">
            Helps to add your task , update it , complete and delete ...
            <br />
            Click here to add your task ...
          </p>
          <Link to="/to-do" className="btn btn-primary">
            Add Task
          </Link>
        </div>
      </div>
      <div className="card my-5">
        <div className="card-header">Quote</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
              “The only thing more important than your to-do list is your to-be
              list. The only thing more important than your to-be list is to be.
              ~”
            </p>
            <footer className="blockquote-footer">
              {" "}
              Alan Cohen <cite title="Source Title">Motivational</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
