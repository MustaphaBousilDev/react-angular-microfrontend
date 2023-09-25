import React, {Suspense,useState} from "react";
import ReactDOM from "react-dom";
import "./index.scss";
//its for asynchronos loading
const Header= React.lazy(() => import("home/Header"))
const Footer= React.lazy(() => import("home/Footer"))

const App = () => {
  const [showHeader, setShowHeader]  = useState(false);
  return (
    <div className="text-3xl mx-auto max-w-6xl">
      {
        showHeader &&
        (
          <Suspense fallback={<div>Loading</div>}>
            <Header/>
          </Suspense>
        )
      }
      <button 
        onClick={()=> setShowHeader(true)}
        className="text-3xl p-5">
          Show the Header
      </button>
      <div className="my-10">Home Page Content</div>
      <Suspense>
        <Footer/>
      </Suspense>
    </div>
  )
};
ReactDOM.render(<App />, document.getElementById("app"));
