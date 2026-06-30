import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store/store";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
