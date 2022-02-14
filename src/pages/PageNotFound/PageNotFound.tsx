import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

import s from "./index.module.scss";
const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Sorry, page not found!</title>
      </Helmet>
      <div className={s.wrap}>
        <h2>404</h2>
        <h1>Страница не найдена</h1>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <button>Go to Home</button>
        </NavLink>
      </div>
    </>
  );
};

export { PageNotFound };
