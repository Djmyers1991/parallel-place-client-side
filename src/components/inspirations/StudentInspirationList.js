import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserByToken } from "../../managers/tokens"
import { deleteInspiration, getInspirationByCurrentStudent } from "../../managers/inspirations"

export const StudentInspirationList = () => {

    const [inspirations, setInspirations] = useState([])
    const navigate = useNavigate()
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser] = useState()



    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user))
        }
    }, [token])
    
    console.log(currentUser)

    useEffect(() => {
        if (currentUser)
        fetch(`http://localhost:8000/inspirations?student=${currentUser.id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then((res) => res.json())
        .then((inspiration) => setInspirations(inspiration));
    }, [currentUser]);
    


    const deleteButton = (deadInspiration) => {
        const handleDelete = () => {
          const shouldDelete = window.confirm("Are you sure you want to delete this post?");
          if (shouldDelete) {
            deleteInspiration(deadInspiration).then(() => {
              setInspirations((prevInspirations) => prevInspirations.filter((insp) => insp.id !== deadInspiration.id));
            });
          }
        };
    
        return (
          <button onClick={handleDelete}>
            Delete
          </button>
        );
      };

    return (
        <>
            <h2 className="inspirations">Inspiration List</h2>
            <article className="inspiration">
                {inspirations.map((inspiration) => (
                    <section className="inspirations" key={inspiration.id}>

                        <header>
                            {inspiration?.student?.full_name}'s Inspirations:{" "}
                            <Link to={`/editinspiration/${inspiration.id}`}>
                                {inspiration.novel} by {inspiration.author}
                            </Link>{" "}
                        </header>
                        
                     
                        <div> 
                        <img src = {inspiration.image} alt = "random image"/>
                        </div>
                        <div>Relevancy Score (must add up to 100): {inspiration.relevance_scale}</div>
                      <div>
                            Explanation: {inspiration.explanation}
                        </div>
  

                        
                        <footer>{deleteButton(inspiration)}</footer>
                        <div>----------------------------------------</div>
                    </section>
                ))}
                <button onClick={ () => {navigate('/inspirationform')}}> Create Inspiration</button>

            </article>
        </>
    );

}
