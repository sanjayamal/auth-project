import React, { Suspense } from "react";
import { ConfigProvider, theme, Spin } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import "./App.css";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
    }}
  >
    <Suspense
      fallback={
        <div className="loader-container">
          <Spin tip="Loading" size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </ConfigProvider>
);

export default App;
