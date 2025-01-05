import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./router/mainRouter";
// import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "./global/globalProvider";
import { Provider } from "react-redux";
import { store } from "./global/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import persistStore from "redux-persist/es/persistStore";
let persistor = persistStore(store);

const App = () => {
  return (
    <GlobalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={mainRouter} />
        </PersistGate>
      </Provider>
    </GlobalProvider>
  );
};

export default App;
