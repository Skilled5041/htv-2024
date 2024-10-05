import { useState } from "react";
import { htv_2024_backend } from "declarations/htv-2024-backend";
import { Button } from "@nextui-org/react";
import Navigation from "./components/Navbar";

function App() {
  const [greeting, setGreeting] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    htv_2024_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <Navigation />
    </main>
  );
}

export default App;
