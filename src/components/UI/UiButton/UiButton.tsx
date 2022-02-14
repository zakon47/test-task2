import ClassName from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

import s from "./index.module.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const UiButton: FC<IProps> = ({ className, ...rest }) => {
  return <button {...rest} className={ClassName(s.wrap, className)} />;
};
export { UiButton };
