import { RouterProvider } from "react-router-dom";
import Router from "./Router/index.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
