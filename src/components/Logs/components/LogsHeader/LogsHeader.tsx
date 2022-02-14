import ClassName from "classnames";
import { FC, ReactElement } from "react";

import s from "./index.module.scss";

interface IProps {
  className?: string;
  left?: ReactElement | ReactElement[];
  right?: ReactElement;
}

const LogsHeader: FC<IProps> = ({ className, left, right }) => {
  return (
    <div className={ClassName(s.wrap, className)}>
      <div className={s.left}>{!!left && left}</div>
      <div className={s.right}>{!!right && right}</div>
    </div>
  );
};
export { LogsHeader };
