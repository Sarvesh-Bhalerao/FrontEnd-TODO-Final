import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import "./style.css";
class Mainclasscomp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        task_name: "",
        details: "Just Do It!",
        category: 8,

        status: "Incomplete",
        user: 2,
      },
      editing: false,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.completeIncomp = this.completeIncomp.bind(this);

    this.deleteItem = this.deleteItem.bind(this);
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  componentWillMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    console.log("fetching...");
    fetch(`Localhost:8000/task/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        this.setState({
          todoList: data,
        });
      });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    // console.log("Name :", name);
    // console.log("value: ", value);
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        task_name: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log("item", this.state.activeItem);
    let csrftoken = this.getCookie("csrftoken");
    //Post Url to create task
    let url = `Localhost:8000/task/`;

    if (this.state.editing === true) {
      url = `Localhost:8000/task/pk/${this.state.activeItem.id}/`;
      this.setState({
        editing: false,
      });
    }
    fetch(url, {
      method: "Post",
      headers: {
        "Content-type": "application/json",
        "X-CSRFTOKEN": csrftoken,
      },
      body: JSON.stringify(this.state.activeItem),
    })
      .then((res) => {
        this.fetchTasks();
        this.setState({
          activeItem: {
            id: null,
            task_name: "",
            details: "Just Do It!",
            category: 8,

            status: "Incomplete",
            user: 2,
          },
        });
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  }

  startEdit(task) {
    this.setState({
      activeItem: task,
      editing: true,
    });
  }

  deleteItem(task) {
    let csrftoken = this.getCookie("csrftoken");
    fetch(`Localhost:8000/task/pk/${task.id}/`, {
      method: `DELETE`,
      headers: {
        "Content-type": "application/json",
        "X-CSRFTOKEN": csrftoken,
      },
    }).then((res) => {
      this.fetchTasks();
    });
  }

  completeIncomp(task) {
    if (task.status === "Completed") {
      task.status = "Incomplete";
    }

    if (task.status === "Incomplete") {
      task.status = "Completed";
    }

    let url = `Localhost:8000/task/pk/${task.id}/`;
    let csrftoken = this.getCookie("csrftoken");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFTOKEN": csrftoken,
      },
      body: JSON.stringify({ status: task.status, task_name: task.task_name }),
    }).then(() => {
      this.fetchTasks();
    });
  }

  render() {
    let tasks = this.state.todoList;
    let self = this;
    return (
      <div className="todoApp">
        <h1>Add Your Plans....</h1>
        <div className="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} className="do-form">
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Add a Task"
                name="task_name"
                className="task-input"
                value={this.state.activeItem.task_name}
                autoComplete="off"
              />
              <button className="todobtn">Add Task</button>
            </form>
          </div>
          <div id="list-wrapper">
            {tasks.map(function (task, idx) {
              return (
                <div
                  key={idx}
                  className={
                    task.status === "Completed" ? "row complete" : "row"
                  }
                >
                  <div onClick={() => self.completeIncomp(task)} key={idx}>
                    {task.task_name}
                  </div>
                  <div className="icns">
                    <RiCloseCircleLine
                      className="delete-icon"
                      onClick={() => self.deleteItem(task)}
                    />
                    <TiEdit
                      onClick={() => self.startEdit(task)}
                      className="edit-icon"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Mainclasscomp;
