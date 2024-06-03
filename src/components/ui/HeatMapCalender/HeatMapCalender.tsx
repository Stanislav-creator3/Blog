import { Link } from "react-router-dom";
import style from "./HeatMapCalender.module.scss";
import { FC } from "react";
import { TDateValues, THeatMapCalender } from "./types";

const HeatMapCalender: FC<THeatMapCalender> = ({
  startDate,
  endDate,
  dateValues,
  userId,
}) => {
  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);
  const daysInMonth =
    Math.ceil(
      (Number(endingDate) - Number(startingDate)) / (1000 * 60 * 60 * 24)
    ) + 1;
  const calenderGrid = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return date.toISOString().slice(0, 10);
  });

  const highestValue = dateValues?.reduce((a: number, b: TDateValues) => Math.max(a, b.count), -Infinity);
  console.log(highestValue);
  const getIntensity = (activityCount: number) => {
    return highestValue !== 0 ? Number(activityCount / highestValue) : 0;
  };

  const getColorFromIntensity = (intensity: number) => {
    const colorCodes = [
      "#007bff",
      "#0055ff ",
      "#004169 ",
      "#002b5b ",
      "#001549",
      "#00008b ",
    ];
    const colorIndex = Math.min(
      Math.floor(intensity * colorCodes.length),
      colorCodes.length - 1
    );
    return colorCodes[colorIndex];
  };

  return (
    <div className={style.container}>
      {calenderGrid.map((day) => {
        const activityCount =
          dateValues.find(
            (item: { date: string; count: number }) => item.date === day
          )?.count || 0;
        const intensity = getIntensity(activityCount);
        const color = getColorFromIntensity(intensity);
        return (
          <Link
            to={`/posts/${day}/${userId}`}
            className={style.item}
            title={`Количество статьей: ${activityCount} за ${day}`}
            style={{
              backgroundColor: `${
                activityCount === 0 ? "#ffffff" : String(color)
              }`,
            }}
          ></Link>
        );
      })}
    </div>
  );
};

export default HeatMapCalender;
