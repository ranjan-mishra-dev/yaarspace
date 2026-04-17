import { useEffect, useState } from "react";
import { testAPI } from "./services/api";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    testAPI().then(setData);
  }, []);

  return (
    <div>
      <h1>YaarSpace</h1>
      <p>Backend Response:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;