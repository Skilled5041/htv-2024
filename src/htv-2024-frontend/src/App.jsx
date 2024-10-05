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
      <Button color="primary">Button</Button>
      {/* <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br /> */}
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button className="" type="submit">
          Click Me!
        </button>
        <h1 className="font-semibold flex ">HTV 2024</h1>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
