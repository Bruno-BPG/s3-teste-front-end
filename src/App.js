import {Switch, Route} from "react-router-dom";

import GerarHome from "./pages/home/index";
// import GerarLogin from "./pages/login/index";
import GerarCadastro from "./pages/cadastro/index";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/"><GerarCadastro></GerarCadastro></Route>
          <Route exact path="/home/"><GerarHome></GerarHome></Route>
          {/* <Route exact path="/login/"><GerarLogin></GerarLogin></Route> */}
        </Switch>
      </header>
    </div>
  );
}

export default App;
