import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bills from "./pages/Bills";
import CartPage from "./pages/CartPage";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProotectedRoute>
                <Home />
              </ProotectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProotectedRoute>
                <Items />
              </ProotectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProotectedRoute>
                <CartPage />
              </ProotectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProotectedRoute>
                <Bills />
              </ProotectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProotectedRoute>
                <Customers />
              </ProotectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProotectedRoute({ children }) {
  if (localStorage.getItem("pos-user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
