import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./components/Form";
import Card from "./components/Card";

function App() {
  const [userdata, setUserdata] = useState([]);
  const addUser = (user) => {
    setUserdata((prev) => [user, ...prev]);
  };
  // const removeUser = (index) => {
  //   setUserdata((prev) => prev.filter((_, i) => i !== index));
  // };

  const removeUser = (index) => {
    const newUsers = userdata.filter((_, i) => {
      return i !== index;
    });

    setUserdata(newUsers);
  };

  return (
    <>
      <Form setUserdata={addUser} />
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {userdata.map((user, index) => (
          <Card
            key={index}
            firstName={user.firstName}
            lastName={user.lastName}
            gender={user.gender}
            email={user.email}
            imageUrl={user.imageUrl}
            onDelete={() => removeUser(index)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
