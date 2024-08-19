import React from "react";
import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);

export default App;
