import { LogsBody } from "@components/Logs/components/LogsBody";
import { LogsHeader } from "@components/Logs/components/LogsHeader";
import { UiButton } from "@components/UI/UiButton";
import moment from "moment";
import { FC, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

import { CONST } from "@/const";

import s from "./index.module.scss";

//function type
type QueueTask = () => Promise<number>;
export type LogsTimerTaskItem = {
  id: number;
  label: string;
  sleep: number;
};

const logStartTime = "#startTime";
const logEndTime = "#endTime";
const logName = "#name";

interface IProps {
  actions: LogsTimerTaskItem[];
  label?: string;
  resetLabel?: string;
  logFormat?: "#endTime: #name / #startTime" | "#name: - #startTime - #endTime";
}

const Logs: FC<IProps> = ({
  actions = [],
  label,
  resetLabel,
  logFormat = "#endTime: #name / #startTime",
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  //create a logging string
  const createLogString = (
    countName: number,
    startTime: Date,
    endTime: Date
  ) => {
    let str = logFormat?.replace(
      logStartTime,
      moment(startTime).format(CONST.timeFormat)
    );
    str = str?.replace(logName, "" + countName);
    str = str?.replace(logEndTime, moment(endTime).format(CONST.timeFormat));

    return str;
    // return `${moment(startTime).format(
    //   CONST.timeFormat
    // )}: ${countName} / ${moment(endTime).format(CONST.timeFormat)}`;
  };
  //задача которая запущена
  const refRunTaskId = useRef<number>(0);
  //заблокировать ли запуск новых задач
  const refLock = useRef<boolean>(false);
  //очередь задач
  const refQueue = useRef<QueueTask[]>([]);
  //run next task
  const doFollowing = async () => {
    //если:
    //ничего не заблокированно
    //нету активной таски
    //есть что запускать
    if (
      !refLock.current &&
      !refRunTaskId.current &&
      !!refQueue.current.length
    ) {
      //берем первый эелемент
      const run = refQueue.current.shift();
      if (run) {
        const id = await run();
        if (id) refRunTaskId.current = id;
      }
    }
  };

  //reset logs
  const handleReset = async () => {
    refLock.current = true;
    if (!!refRunTaskId.current) {
      clearTimeout(refRunTaskId.current);
      refRunTaskId.current = 0;
    }
    refQueue.current = [];
    setLogs([]);
    refLock.current = false;
  };
  //add an event to the queue
  const handleAddTimer = (timerTask: LogsTimerTaskItem) => {
    const task = (obj: LogsTimerTaskItem) => async () => {
      const startTime = new Date();
      return setTimeout(async () => {
        const str = createLogString(obj.id, startTime, new Date());
        //отрисовываем
        setLogs((prevState) => prevState.concat(str));
        refRunTaskId.current = 0;
        doFollowing();
      }, obj.sleep);
    };
    if (!refLock.current) {
      refQueue.current.push(task(timerTask));
      doFollowing();
    }
  };
  return (
    <>
      <Helmet>
        <title>Тестовое задание</title>
      </Helmet>
      <div className={s.wrap}>
        <LogsHeader
          left={actions.map((elem) => (
            <UiButton
              key={elem.id}
              onClick={() => handleAddTimer(elem)}
              className={s.menuItem}
            >
              {elem.label}
            </UiButton>
          ))}
          right={
            <UiButton onClick={handleReset}>
              {!!resetLabel ? resetLabel : "Сбросить"}
            </UiButton>
          }
        />
        <LogsBody label={label} items={logs} />
      </div>
    </>
  );
};
export { Logs };
