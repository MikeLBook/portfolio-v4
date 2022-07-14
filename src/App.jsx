import { useState } from 'react';
import Portfolio from './portfolio';
import Widgets from './containers/widgets';

function App() {
  const [view, setView] = useState(<Portfolio />);

  return (
    <>
      <div className="nav-container">
        <div className="nav-link" onClick={() => setView(<Portfolio />)}>Portfolio</div>
        <div className="nav-link" onClick={() => setView(<Widgets />)}>Widgets</div>
      </div>
      {view}
    </>
  );
}

export default App;