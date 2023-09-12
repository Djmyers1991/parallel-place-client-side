import { useEffect, useState } from "react";
import { getCurrentUser } from "../../managers/users.js";
import { Link } from "react-router-dom";

export const LandingPageGreeting = () => {
  

    return <> <span className="landing-page-greeting">Hi !</span>
    
    <p>Where would you like to go?</p>
    <p><Link to="/assignments">STRETCH GOAL FOR THE WIN</Link></p>
    </>
};