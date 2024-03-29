import React from "react";

import "./App.scss";
//import { people } from "./users/fakedata";
//import Card from "./components/cards/card";
//import Counter from "./components/counter/counter";
//import ReverseString from "./components/ReverseString/ReverseString";
//import Container from "./components/Container/Container"
import Characters from "./components/Characters/Characters";
import HomePage from "./components/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from "./layout/outlet";


//import PaginationControls from "./components/PaginationControls/PaginationControls"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the layout component at the top level
    children: [
      { index: true, element: <HomePage /> }, // Default route rendered by the outlet in Layout
      { path: "characters", element: <Characters /> },
      // Define other routes as children as needed
    ],
  },
  // You can still define other routes outside the layout if needed
]);


function App() {
  //const [numbers, setNumbers] = useState([3,5,6,7])

  return (
    <>
      {/* {people.map((user, index) => (
        <Card key={index} title={user.name} subtitle={user.workPosition} placeholder={user.openToWork} image={user.profilePhoto} />
      ))}
      <Counter/> 
      <ReverseString/>
      <Container>
      <ul>
        {numbers.map((number: number) => (
          <li key={number}>{number}</li>

        ))}
      </ul>
      <button onClick={() => setNumbers([...numbers, numbers.length + 1])}> Increment</button>
      </Container> */}
       <>
      
       <RouterProvider router={router}/>
      
      {/* Other components that use routing can be included here, 
          ensuring they are within the RouterProvider context */}
    
    </>

      
    </>
  );
}

export default App;
