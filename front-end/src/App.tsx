import { useRouterReEa } from "./hooks/h";
import RouterList from "./route";
import "./index.css";

function App() {
  useRouterReEa();
  return (
    <div className="App">
      <RouterList></RouterList>
    </div>
  );
}

export default App;
