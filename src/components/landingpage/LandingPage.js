import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LandingPageGreeting = () => {
  const [bios, setBios] = useState([]);
  const [number, setNumber] = useState(0); // Use setNumber instead of increaseNumber
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/abouttheauthors/${number}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((bio) => setBios(bio)); 
  }, [number]); 

  const handleButtonClick = () => {
    setNumber(number + 1); 
  };

  return (
    <>
      <section className="package" key={bios.id}>
        <h1>About your Reluctant Author:</h1>
        {number === 0 ? (
          <div>
            <p className="highlighted">
              <br />
              In an ideal world, <s>I</s> David Tate would never have written <s>my</s> his own memoir.
              In the real world, <s>my</s> his prison warden is a psychopath — a time-traveler
              forcing <s>me</s> him to write about <s>my</s> his miserable life to keep <s>my</s> his
              bodyguard and solo-shower privileges. As <s>I'm</s> Dave is a sixteen year-old boy in jail,
              <s>I</s> he doesn’t want to lose these perks. As <s>I'm</s> Dave is a sixteen year-old boy
              in general, <s>I</s> he doesn’t believe in self-reflection. Please don’t judge me.
              I have ADD. The End.
            </p>
            <div> -------------------------------------------------------</div>
            {/* Daniel, don't forget to italicize text */}
            <p className="italicized">
              The first plot twist is I’m David Tate, and I’m writing my own About the Author.
              <br />
              Less of a twist, my About the Author is shit.
              <br />
              But rather than crumple the page and start anew like a quitter, <s>I</s> requested
              permission to borrow a time machine, go back twelve minutes in time, and prevent
              <s>myself</s> from ever writing it.
              <br />
            
              To set the record straight, I'm not a prima donna for going back twelve minutes
              in time to prevent myself from writing my About the Author. Eradicating the
              bio from the space-time continuum is more eco-friendly than crossing out this entire
              page &amp; shredding this piece of
              paper. Time travel saves trees. Hence why I’ll
              write the following note for my past self.
              <br />
              Dear PastMe,
              <br />
              Don’t write your own About the Author. You keep referring to yourself in the first person
              when you’re not supposed to. It’s childish, it’s choppy, it’s cheeks, it’s cringe.
              Don’t even try.
              <br />
              Sincerely, Your Much-Wiser-But-Still-Not-So-Wise-Future-Self.
            </p>
            {/* Rest of the text */}
            <p>
              Then I’ll return to the present and — boom! — this bio will never have existed.
              <br />
              But the issue is … this statement — like so many wedding-altar I do’s — isn’t exactly true.
              Even though this page soon won’t exist, this page does exist or else you wouldn’t be reading
              it right now. Right? Right! You get it. Or you don’t. And if you don’t, you’re lost. And
              if you’re lost, you’re pissed — lambasting the author (me 🙁) for selling so hard to save
              a bio <s>I’m</s> about to zap from existence. If so, please give me another chance to explain
              why — even with time travel — you get one chance to make a great first impression.
              <br />
              To do so, I’ll pose a hypothetical thought-experiment.
              <br />
              Please close your eyes, inhale through your mouth, and exhale through your nose.
              <br />
              Now picture your father full of bullet holes dead on his king-sized bed.
              <br />
              Murdered.
              <br />
              What are you going to do? You are going to go back in time.
              <br />
              You are going to cut the killer’s neck before he caps your father.
              <br />
              So you do.
              <br />
              Now blood and guilt coat your skin like lights from a high-voltage disco ball. But! —
              you tell yourself — you murdered this murderer because he murdered your father first.
              <br />
              Except thanks to you, now he never did.
              <br />
              Or did he?
              <br />
              Never forget: just because something never happened doesn’t mean it never did.
              Just because you’ll never read these words doesn’t mean you never did.
            </p>
          </div>
        ) : (
          <section>{bios.introduction}</section>
        )}
        <div>----------------------------------------</div>
      </section>
      <button onClick={handleButtonClick}>Time Travel Button</button>
    </>
  );
        }