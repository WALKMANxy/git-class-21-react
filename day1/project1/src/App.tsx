import React from "react";

import "./App.scss";
import { people } from "./users/fakedata";
import Card from "./components/cards/card";




function App() {

   return (
    <>
      {people.map((user, index) => (
        <Card key={index} title={user.name} subtitle={user.workPosition} placeholder={user.openToWork} image={user.profilePhoto} />
      ))}
    </>
  );
}


export default App;
