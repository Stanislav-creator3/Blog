import { FC, useEffect, useState } from "react";
import HeatMapCalender from "../ui/HeatMapCalender/HeatMapCalender";
import axios from "../../axios";
import style from "./HeatMap.module.scss";
import { useParams } from "react-router-dom";

const HeatMap : FC = () => {
  const [activityData, setActivityData] = useState([]);
  const today = new Date();
  const { id } = useParams()

  const shiftDate = (date : Date, numDays: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/posts/users/${id}`);
      const newArrayDate = response.data.map((item : any) => {
        return item.createdAt.split("T")[0];
      });

      const countDate = newArrayDate.reduce((acc: any, i: number) => {
        if (acc.hasOwnProperty(i)) {
          acc[i] += 1;
        } else {
          acc[i] = 1;
        }
        return acc;
      }, {});
      const result = Object.entries(countDate).map((entry) => ({
        date: entry[0],
        count: entry[1],
      }));
      setActivityData(result);
    }
    fetchData();
  }, [id]);
  return (
    <section className={style.container}>
      <div style={{ display: "flex" }}>
        <span className={style.container__days}>
          <span>ПН</span>
          <span>СР</span>
          <span>ПТ</span>
        </span>
        <HeatMapCalender
          startDate={shiftDate(today, -150)}
          endDate={today}
          dateValues={activityData}
          userId={id}
        />
      </div>
    </section>
  );
};

export default HeatMap;
