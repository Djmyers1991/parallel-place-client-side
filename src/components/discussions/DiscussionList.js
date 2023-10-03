import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";
import { getTopics } from "../../managers/topics";

export const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    getTopics().then((topicArray) => setTopics(topicArray));
  }, []);

  return (
    <div className="container">
      <h2 className="title is-2">Discussion Topics</h2>
      <div className="columns is-multiline">
        {topics.map((topic) => (
          <div className="column is-full" key={topic.id}>
            <div className="assignment-custom-card">
              <div className="card-content">
                <header className="title is-5">
                  {/* {currentUser?.is_staff ? (
                    <Link to={`/editassignment/${assignment.id}`}> {assignment.title}</Link>
                  ) : (
                    <Link to={`/standardassignmentform`}> {assignment.title}</Link>
                  )} */}
                </header>
                <div> {topic.writing_prompt}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
