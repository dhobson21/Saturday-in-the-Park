import React, { useEffect, useState } from "react"


const MyItinerary = props => {
    // create a state variable for itinerary items useState()
    const [itineraryList, setItineraryList] = useState([])
// Function to fetch itineraries used in useEffect and after item is deleted

    const getItineraries = () => {
        fetch("http://localhost:8000/itineraryitems", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
        // Convert to JSON
        .then(response => response.json())
        // Store in state variable
        .then(setItineraryList)
    }

    // Create useEffect with annonomyous function
    useEffect(getItineraries , [])
        // Fetch data from localhost:8000/itineraryitems




    const delItineraryItem = (id) => {


            fetch(`http://localhost:8000/itineraryitems/${id}`, {
                "method": "DELETE",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                }

            })
            .then(() => {
                getItineraries()

            })


    }
    // Create HTML REPRESENTATION
    return (
        <>

            <h2> What I Want to Do on Saturday</h2>
            <ul>
                {
                    itineraryList.map((item) => {
                       return (
                        <div key = {item.id}>

                       <li>
                            {item.attraction.name} in {item.attraction.area.name} at {item.starttime }
                        </li>
                        <button
                            onClick= {() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) delItineraryItem(item.id)
                            }}>Delete</button>
                        </div>
                       )
                    })
                }
            </ul>
        </>
    )


}

export default MyItinerary