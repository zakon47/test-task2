import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "@/routes";

interface IProps {}

const App: FC<IProps> = () => {
  return (
    <div>
      <Routes>
        {ROUTES.All.map((elem, idx) => (
          <Route
            index={elem.index}
            key={elem.path + idx}
            path={elem.route || elem.path}
            element={elem.element}
          />
        ))}
      </Routes>
    </div>
  );
};

export { App };
