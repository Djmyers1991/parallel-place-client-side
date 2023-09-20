import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

export const LandingPageGreeting = () => {
  const [bios, setBios] = useState([]);
  const [allBios, setAllBios] = useState([]);
  const [number, setNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/abouttheauthors`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((bio) => setAllBios(bio));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/abouttheauthors/${number}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((bio) => setBios(bio));
  }, [number]);

  const jigglingFunction = () => {
    if (document.querySelector('.container')) {
      document.querySelector('.container').classList.add('shake');
      setTimeout(() => {
        document.querySelector('.container').classList.remove('shake');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }
  }

  console.log(allBios.length)

  const handleButtonClick = () => {
    setNumber(number + 1);
    if (allBios.length > number || number === 0) {
      jigglingFunction();
    }

  };


  return (
    <div className="landing-page">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container book-page">
            <h1 className="title">About Your Reluctant Author</h1>
            {number === 0 ? (
              <div className="box bio-box">
                <p className="italicized">
                  In an ideal world, <s>I</s> David Tate would never have written <s>my</s> his own memoir.
                  In the real world, <s>my</s> his prison warden is a psychopath — a time-traveler
                  forcing <s>me</s> him to write about <s>my</s> his miserable life to keep <s>my</s> his
                  bodyguard and solo-shower privileges. As <s>I'm</s> Dave is a sixteen year-old boy in jail,
                  <s>I</s> he doesn’t want to lose these perks. As <s>I'm</s> Dave is a sixteen year-old boy
                  in general, <s>I</s> he doesn’t believe in self-reflection. Please don’t judge me.
                  I have ADD. The End. I did a real bad job writing my own about the author. Time to go back in time and try again. See button below.
                </p>
                <div className="page-number">Page 1</div> <div> </div>
              </div>

            ) : (
              <div className="box bio-box">
                <p className="italicized">
                  {bios.introduction}
                </p>
                <div className="page-number">Page 1 Again</div> <div> </div>
              </div>
            )}
            <div className="divider"></div>

            <div className="has-text-centered">
              <button className="button is-primary" onClick={handleButtonClick}>
                Time Travel Button  </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
