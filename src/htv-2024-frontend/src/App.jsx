import { useState } from "react";
import { htv_2024_backend } from "declarations/htv-2024-backend";
import { Button } from "@nextui-org/react";

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
      <Button color="primary">Button</Button> {/* NextUI Button */}
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button className="" type="submit">
          Click Me!
        </button>
        <div className="font-semibold flex ">HTV 2024</div>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
