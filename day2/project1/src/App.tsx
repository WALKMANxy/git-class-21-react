import React from "react";

import "./App.scss";
import { people } from "./users/fakedata";
import Card from "./components/cards/card";
import Counter from "./components/counter/counter";
import ReverseString from "./components/ReverseString/ReverseString";




function App() {

   return (
    <>
      {people.map((user, index) => (
        <Card key={index} title={user.name} subtitle={user.workPosition} placeholder={user.openToWork} image={user.profilePhoto} />
      ))}
      <Counter/> 
      <ReverseString/>
    </>
  );
}


export default App;
