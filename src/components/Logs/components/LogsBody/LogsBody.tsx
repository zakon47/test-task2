import ClassName from "classnames";
import {
  FC,
  ReactElement,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";

import s from "./index.module.scss";

interface IProps {
  className?: string;
  label?: string;
  items?: string[];
}

const LogsBody: FC<IProps> = ({ label, items, className }) => {
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const scrollToBottom = () => {
    if (refTextarea.current) {
      refTextarea.current.scrollTop = refTextarea.current?.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [items]);
  return (
    <div className={ClassName(s.wrap, className)}>
      {label && <div className={s.title}>{label}</div>}
      <textarea
        className={s.textarea}
        ref={refTextarea}
        cols={30}
        rows={10}
        disabled
        value={items?.map((elem) => elem).join("\n")}
        onChange={() => {}}
      />
    </div>
  );
};
export { LogsBody };
