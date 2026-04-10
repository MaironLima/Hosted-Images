import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <main className="pt-16 flex justify-center">
        <Outlet />
      </main>
    </div>
  );
}


export default App
