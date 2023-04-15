//////////////////////////////////////
import React, { useReducer, useState, useEffect } from "react";

import Card from "../MemberCard/MemberCard";
import Home from "../../pages/Home";
import Search from "../Search/Search";
import axios from "axios";
import "./addMember.css";
import TaskList from "../MembersTable/TaskList";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
const initialState = {
  members: [],
  name: "",
  email: "",
  skills: [],
  linkedin: "",
  github: "",
  age: "",
  image: "",
  admin: false,
  currentSkill: "",
  language: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload.split(",") };
    case "SET_CURRENT_SKILL":
      return { ...state, currentSkill: action.payload };
    case "ADD_SKILL":
      if (action.payload.trim() !== "") {
        return {
          ...state,
          skills: [...state.skills, action.payload],
          currentSkill: "",
        };
      }
      return state;
    case "DELETE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((skill) => skill !== action.payload),
      };
    case "SET_LINKEDIN":
      return { ...state, linkedin: action.payload };
    case "SET_GITHUB":
      return { ...state, github: action.payload };
    case "SET_AGE":
      return { ...state, age: action.payload };
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_ADMIN":
      const adminCount = state.members.filter((member) => member.admin).length;
      if (adminCount === 1 && !action.payload) {
        return state;
      } else {
        return { ...state, admin: action.payload };
      }
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "ADD_MEMBER":
      return {
        ...state,
        members: [...state.members, action.payload],
        name: "",
        email: "",
        skills: [],
        linkedin: "",
        github: "",
        age: "",
        image: "",
        admin: false,
        currentSkill: "",
        language: "",
      };
    case "SET_MEMBERS":
      return { ...state, members: action.payload };
    default:
      throw new Error();
  }
};

const AddMember = ({ showTasks }) => {
  // const [members, setMembers] = useState([]);
  // console.log(showTasks);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const handleAddMember = (event) => {
    event.preventDefault();
    const newMember = { id: Date.now(), name };

    setName("");
  };
  useEffect(() => {
    axios
      .get("https://gozilla-server.onrender.com/api/members")
      .then((res) => {
        dispatch({ type: "SET_MEMBERS", payload: res.data });
      })
      .catch((err) => console.log(err));
  }, []);
  // const handleAddMember = (event) => {
  //   event.preventDefault();
  //   const newMember = { id: Date.now(), name };
  //   onAddMember(newMember);
  //   setName("");
  // };
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/members")
  //     .then((res) => {
  //       dispatch({ type: "SET_MEMBERS", payload: res.data });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // const handleSubmite = (event) => {
  //   event.preventDefault();
  //   const newMember = state.name;
  //   axios
  //     .post("http://localhost:3000/api/members", newMember)
  //     .then((res) => {
  //       onAddNewMember(res.data);

  //       setName(""); // clear the form input
  //     })
  //     .catch((err) => console.log(err));
  // };
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await axios.get(
        "https://gozilla-server.onrender.com/api/members"
      );
      setMembers(response.data);
      console.log(response.data);
    };
    fetchMembers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      name: state.name,
      email: state.email,
      skills: state.skills,
      linkedin: state.linkedin,
      github: state.github,
      age: state.age,
      image: state.image,
      admin: state.admin,
      language: state.language,
    };
    axios
      .post("https://gozilla-server.onrender.com/api/members", newMember)
      .then((res) => {
        dispatch({ type: "ADD_MEMBER", payload: res.data });
        setName("");
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = state.members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof member.skills === "string" &&
        member.skills.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "name":
        dispatch({ type: "SET_NAME", payload: e.target.value });
        break;
      case "email":
        dispatch({ type: "SET_EMAIL", payload: e.target.value });
        break;
      case "skills":
        dispatch({ type: "SET_SKILLS", payload: e.target.value });
        break;
      // case "currentSkill":
      //   dispatch({ type: "SET_CURRENT_SKILL", payload: e.target.value });
      //   break;
      case "currentSkill":
        if (e.key === "Enter" && e.target.value.trim() !== "") {
          dispatch({
            type: "ADD_SKILL",
            payload: e.target.value.trim(),
          });
          e.target.value = "";
        } else {
          dispatch({ type: "SET_CURRENT_SKILL", payload: e.target.value });
        }
        break;
      case "linkedin":
        dispatch({ type: "SET_LINKEDIN", payload: e.target.value });
        break;
      case "github":
        dispatch({ type: "SET_GITHUB", payload: e.target.value });
        break;
      case "age":
        dispatch({ type: "SET_AGE", payload: e.target.value });
        break;
      // case "image":
      //   dispatch({ type: "SET_IMAGE", payload: e.target.files[0] });
      //   break;
      case "image":
        dispatch({ type: "SET_IMAGE", payload: e.target.value });
        break;
      case "language":
        dispatch({ type: "SET_LANGUAGE", payload: e.target.value });
        break;
      case "admin":
        dispatch({ type: "SET_ADMIN", payload: e.target.checked });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="addmemberContainer">
        <button
          onClick={() => setShowForm(!showForm)}
          className="add-member-btn"
        >
          Add Member
        </button>
        {showForm && (
          <div className="form-container">
            {/* ///////////////////////////////////// */}
            <form onSubmit={handleSubmit}>
              <div className="form-input">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={state.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-input">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={state.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* {// <div className="form-input">
              //   <label htmlFor="skills">Skills:</label>
              //   <input
              //     type="text"
              //     id="skills"
              //     value={state.currentSkill}
              //     onChange={handleInputChange}
              //     placeholder="Enter a skill"
              //   />

              //   <div className="skills-list">
              //     {state.skills.map((skill, index) => (
              //       <div key={index} className="skill">
              //         <span>{skill}</span>
              //         <button
              //           type="button"
              //           className="delete-skill-btn"
              //           onClick={() =>
              //             dispatch({ type: "DELETE_SKILL", payload: skill })
              //           }
              //         >
              //           x
              //         </button>
              //       </div>
              //     ))}
              //   </div>
              //   <button
              //     type="button"
              //     className="add-skill-btn"
              //     onClick={() =>
              //       dispatch({
              //         type: "ADD_SKILL",
              //         payload: state.currentSkill.trim(),
              //       })
              //     }
              //     disabled={!state.currentSkill.trim()}
              //   >
              //     Add
              //   </button>
        // </div> */}

              <div className="form-input">
                <label htmlFor="skills">Skills:</label>
                <input
                  type="text"
                  id="currentSkill"
                  value={state.currentSkill}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (state.currentSkill.trim() !== "") {
                        dispatch({
                          type: "ADD_SKILL",
                          payload: state.currentSkill.trim(),
                        });
                        dispatch({ type: "SET_CURRENT_SKILL", payload: "" });
                      }
                    }
                  }}
                  placeholder="Enter a skill"
                />
                <div className="skills-list">
                  {state.skills.map((skill, index) => (
                    <div key={index} className="skill">
                      <span>{skill}</span>
                      <button
                        type="button"
                        className="delete-skill-btn"
                        onClick={() =>
                          dispatch({ type: "DELETE_SKILL", payload: skill })
                        }
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="add-skill-btn"
                  onClick={() => {
                    if (state.currentSkill.trim() !== "") {
                      dispatch({
                        type: "ADD_SKILL",
                        payload: state.currentSkill.trim(),
                      });
                      dispatch({ type: "SET_CURRENT_SKILL", payload: "" });
                    }
                  }}
                  disabled={!state.currentSkill.trim()}
                >
                  Add
                </button>
              </div>
              <div className="form-input">
                <label htmlFor="linkedin">LinkedIn:</label>
                <input
                  type="text"
                  id="linkedin"
                  value={state.linkedin}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <label htmlFor="github">GitHub</label>
                <input
                  type="text"
                  id="github"
                  value={state.github}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  value={state.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <label htmlFor="image">Image:</label>
                <input
                  type="url"
                  id="image"
                  value={state.image}
                  placeholder="Image link"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <label htmlFor="language">Language:</label>
                <input
                  type="text"
                  id="language"
                  value={state.language}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <label htmlFor="admin">Admin:</label>
                <input
                  type="checkbox"
                  id="admin"
                  checked={state.admin}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="members-list">
          {/* {filteredMembers.map((member, index) => (
            <Card key={index} {...member} />
          ))} */}
          {filteredMembers.map((member, index) => (
            <Card key={index} {...member} showTasks={showTasks}></Card>
          ))}

          {/* <TaskList members={members.map((member) => member.name)} /> */}

          {/* <TaskList members={state.member} /> */}
        </div>
      </div>
    </>
  );
};
export default AddMember;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
