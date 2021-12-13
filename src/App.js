import './App.css';
import 'react-calendar/dist/Calendar.css';
import './aalto.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import dateEventi from './data.json';
import moment from 'moment';

function App() {
  const [value, onChange] = useState(new Date());

  function getDates (startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  useEffect(()=>{
       
    let currentMonthDays = [];

    for (var i = 0; i < dateEventi.length; i++) {
      let currentDate = dateEventi[i];
      let dateFrom = currentDate.from;
      let dateTo = currentDate.to;

      if (dateFrom === dateTo) {
        let day = currentDate.format('DD');
        currentMonthDays[day] = currentDate.title;
      }
      else {
            let fData = moment.format(dateFrom, "YYYY-MM-DD");
            let tData = moment.format(dateTo, "YYYY-MM-DD");
            let dates = getDates(fData, tData);
            for(var j=0;j<dates.length;j++){
              let day = currentDate.format('DD');
              currentMonthDays[day] = currentDate.title;
            }
      }
    }

  },[]);

  function tileContent({ date, view }) {
    if (view === 'month') {
      var currentDate = moment(date, 'YYYY/MM/DD');
      let currentDay = currentDate.format('DD');
      let currenMonth = currentDate.format('MM');
      for (var i = 0; i < dateEventi.length; i++) {
        var from = moment(dateEventi[i].from, '"YYYY-MM-DD"');
        var ferie = from.format('DD');
        var mese = from.format('MM');
        if ((ferie === currentDay) && (mese === currenMonth)) {
          console.log(dateEventi[i].from);
          return <p>{dateEventi[i].title}</p>
        }
      }
    }
  }

  return (
    <div className="App">
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        tileClassName={"aalto"}
      />
    </div>
  );
}

export default App;
