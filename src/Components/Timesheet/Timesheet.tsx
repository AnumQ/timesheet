import React, { useEffect, useState } from "react";
import { FaHourglassHalf, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import styled from "styled-components";
import { MonthView } from "./MonthView";
import { TitleCalendarRow } from "./TitleCalendarRow";
import { WeekView } from "./WeekView";
import moment from "moment";
import {
  addDays as addDaysToDate,
  format,
  formatToMonthYear,
  nextMonth,
  prevMonth,
} from "./Utils/formatter";
import { log } from "../../consoleHelper";
import AddEntry from "../AddEntry";

export const Container = styled.div`
  display: "flex";
  background: clear;
  font-family: "Raleway";
  justify-content: "center";
`;

export const MONTH = 0;
export const DAY = 1;

export const Timesheet = () => {
  const [state, setState] = useState(DAY);
  const [date, setDate] = useState(moment().toDate());
  useEffect(() => {
    // log(date);
  }, [date]);

  const handleLeft = () => {
    if (state === MONTH) {
      const newDate = prevMonth(date);
      setDate(newDate);
    }

    if (state == DAY) {
      const newDate = addDaysToDate(date, -1);
      setDate(newDate);
    }
  };

  const handleRight = () => {
    if (state === MONTH) {
      const newDate = nextMonth(date);
      setDate(newDate);
    }

    if (state == DAY) {
      const newDate = addDaysToDate(date, 1);
      setDate(newDate);
    }
  };

  const handleCalendar = () => {
    log("handleCalendar");
  };

  return (
    <Container>
      <div style={{ marginTop: "2rem" }}>
        <FaHourglassHalf color="gray" />
      </div>
      <div
        style={{
          backgroundColor: "clear",
          display: "flex",
          justifyContent: "center",
          width: "1080px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "clear",
            marginTop: "3.1rem",
          }}
        >
          <AddEntry />
        </div>

        <div
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <TitleCalendarRow
            title={
              state === MONTH ? formatToMonthYear(date) : format(moment(date))
            }
            state={state}
            setState={setState}
            handleLeft={handleLeft}
            handleRight={handleRight}
            handleDay={() => {
              setState(DAY);
            }}
            handleMonth={() => {
              setState(MONTH);
            }}
          />

          {state === DAY ? <WeekView date={date} setDate={setDate} /> : null}
          {state === MONTH ? <MonthView date={date} /> : null}
        </div>
      </div>
    </Container>
  );
};
