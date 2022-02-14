import { PageHome } from "@pages/PageHome";
import { PageNotFound } from "@pages/PageNotFound";

type IRoute = {
  index?: boolean;
  name: routesKey;
  path: string;
  route?: string;
  element: JSX.Element;
  label: string;
};

//возможные ключи
export enum routesKey {
  home = "home",
  error_404 = "error_404",
}

//возможные роутинги
const All: IRoute[] = [
  {
    index: true,
    name: routesKey.home,
    path: "/",
    element: <PageHome />,
    label: "Главная",
  },
  {
    name: routesKey.error_404,
    path: "*",
    element: <PageNotFound />,
    label: "404",
  },
];

//именнованный роутер
const Names = All.reduce((prev, elem) => {
  prev[elem.name] = elem;
  return prev;
}, {} as { [idx in routesKey]: IRoute });

//роутинг для меню навигации
const Menu: IRoute[] = [Names.home, Names.error_404];

export const ROUTES = {
  All,
  Names,
  Menu,
};
