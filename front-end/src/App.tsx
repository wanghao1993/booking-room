import { useRouterReEa } from "./hooks/h";
import RouterList from "./route";

function App() {
  useRouterReEa();
  return (
    <div className="App">
      <RouterList></RouterList>
    </div>
  );
}

export default App;
