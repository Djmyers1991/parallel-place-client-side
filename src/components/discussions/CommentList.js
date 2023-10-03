import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";

export const CommentList = () => {
  const { discussionId } = useParams();
  const [topic, setTopic] = useState(null);
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    fetch(`http://localhost:8000/discussiontopics/${discussionId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((topicData) => setTopic(topicData))
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error here (e.g., show an error message)
      });
  }, [discussionId, token]);

  if (!topic) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2 className="title is-2">{topic.writing_prompt}</h2>
      <div className="columns is-multiline">
        {topic?.discussion_comments?.map((comment) => (
          <div className="column is-full" key={comment?.id}>
            <div className="assignment-custom-card">
              <div className="card-content">
                <header className="title is-5">
                  Author: {comment?.user?.first_name} {comment?.user?.last_name}
                </header>
                <div>{comment?.response}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
