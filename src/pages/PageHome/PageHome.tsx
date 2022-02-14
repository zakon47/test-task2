import { Logs } from "@components/Logs";
import { LogsTimerTaskItem } from "@components/Logs/Logs";
import { Helmet } from "react-helmet-async";

import s from "./index.module.scss";

const actions: LogsTimerTaskItem[] = [
  { id: 1, label: "Таймер 1", sleep: 1000 },
  { id: 2, label: "Таймер 2", sleep: 2000 },
  { id: 3, label: "Таймер 3", sleep: 3000 },
  { id: 4, label: "Таймер 4", sleep: 4000 },
];
const actions2: LogsTimerTaskItem[] = [
  { id: 2000, label: "Таймер 2000", sleep: 2000 },
  { id: 1000, label: "Таймер 1000", sleep: 1000 },
  { id: 5000, label: "Таймер 5000", sleep: 5000 },
];

const PageHome = () => {
  return (
    <>
      <Helmet>
        <title>Тестовое задание</title>
      </Helmet>
      <div className={s.wrap}>
        <Logs actions={actions} label="Логи" />
        <br />
        <br />
        <Logs
          actions={actions2}
          label="Ещё одни логи"
          resetLabel="Reset"
          logFormat={"#name: - #startTime - #endTime"}
        />
      </div>
    </>
  );
};

export { PageHome };
