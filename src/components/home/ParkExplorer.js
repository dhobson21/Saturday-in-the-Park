import React, { useEffect, useState } from "react"
import AreaList from "./AreaList"
import "./Explorer.css"
import Attractions from "./Attractions"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// This is the master component maintained in the view so you want all state to be maintained here instead of in the individual component level
// So you write the function to change state here and use it elsewhere to update state of park explorer
const ParkExplorer = props => {
    // Use State is how we set up state in a component
    // areas is a state component we want use in a function
    // setAreas is the function to change areas
    // default value is the empty array declared in useState
    // same as state = {
                    // areas = []
                    // attrations = []
    // }
    const [areas, setAreas] = useState([])
    const [attractions, setAttractions] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    // JavaScript Function
    const getAttractions = (areaId) => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/attractions?area=${areaId}`, {
                "method": "GET",
                "headers": {
    // Token based Auth--request a token from server and they send back unique one only for you
    //so setting authorization to that token in every request assures that the server knows you are you
                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                }
            })
                .then(response => response.json())
                // setAttractions automatically takes the servers response that was converted into an object and sets the Attreactions variable to that object
                .then(setAttractions)

        }
    }
    const getParkAreas = () => {
        if (isAuthenticated()) {
            fetch('http://localhost:8000/parkareas', {
                "method": "GET",
                "headers": {
                    // Content negotiation--Client telling server it will accept data back in json
                    "Accept": "application/json",

                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`

                }
            })
                .then(response => response.json())
                .then(setAreas)
        }
    }
// This is the new lifecycle methods (componentdidmount/willmount all of it)
// the empty array assures this thing gets fired once when component mounts and no other times
// Whatever is returned in the function is what occurs when the component unmounts
// if the empty array is taken away then it will run the function everytime the component is rendered....will go forever because it keeps changing state and rerendering
// USE , []
    useEffect(getParkAreas, [])

    return (
        // sending attractions to the attractions component will trigger a rerender
        <>
            <main className="explorer">
                <AreaList areas={areas} getAttractions={getAttractions} />
                <Attractions attractions={attractions} {...props} />
            </main>
        </>
    )

}

export default ParkExplorer