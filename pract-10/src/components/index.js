import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as uuid from 'uuid';
import CalendarContext from '../context/calendar.context';
import './style.css';
import CurrentDateComponent from './currentDate';
import RadioComponent from './selector';
import MonthsComponent from './months';
import YearsComponent from './years';
import MonthComponent from './month';
import DayComponent from './day';
import PopupComponent from './popup';
import { NotFoundComponent } from './404';


function App () {
  const navigate = useNavigate();

  // const currentDateHook = useState(new Date()); // => Array size 2
  // const currentDate = currentDateHook[0];
  // const setCurrentDate = currentDateHook[1]];
  const [currentDate, _setCurrentDate] = useState(new Date()); // => Array size 2
  /**
   * 
   * @param {Array<{ value: string, type: string }>} params 
   */
  const setCurrentDate = (params) => {
    _setCurrentDate((prevCurrentDate) => {
      const newDate = new Date(prevCurrentDate);

      /**
       * [
       *   { type: 'year', value: 1994 },
       *   { type: 'month', value: 6 }
       * ]
       */
      params.forEach(({ type, value }) => {
        switch (type) {
          case 'year': {
            newDate.setFullYear(value);
            break;
          }

          case 'month': {
            newDate.setMonth(value);
            break;
          }

          case 'day': {
            newDate.setDate(value);
            break;
          }

          default: { }
        }
      });

      localStorage.setItem("currentDate", newDate.toISOString());

      return newDate;
    });
  };

  /**
   * {
   *   "2022-12-12": [
   *    { title, description, date: "2022-12-12T14:00:00"},
   *    { title, description, date: "2022-12-12T14:00:00"},
   *    { title, description, date: "2022-12-12T15:00:00"},
   *   ],
   *   "2022-12-13": [
   *     { title, description, date: "2022-12-12T14:00:00"},
   *   ]
   * }
   */
  const [events, setEvents] = useState({});
  const addEvent = (event) => {
    event.id = uuid.v1();
    let eventFromLocalStorage = localStorage.getItem("events");
    if (!eventFromLocalStorage) {
      eventFromLocalStorage = {};
    } else {
      eventFromLocalStorage = JSON.parse(eventFromLocalStorage, (key, value) => {
        if (key === 'date') {
          return new Date(value);
        }

        return value;
      });
    }

    const key = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`;

    if (eventFromLocalStorage[key]) {
      eventFromLocalStorage[key].push(event);
    } else {
      eventFromLocalStorage[key] = [event];
    }

    localStorage.setItem('events', JSON.stringify(eventFromLocalStorage));


    setEvents(eventFromLocalStorage);
  };

  const updateEvent = (event) => {
    let eventFromLocalStorage = localStorage.getItem("events");
    if (!eventFromLocalStorage) {
      eventFromLocalStorage = {};
    } else {
      eventFromLocalStorage = JSON.parse(eventFromLocalStorage, (key, value) => {
        if (key === 'date') {
          return new Date(value);
        }

        return value;
      });
    }

    const key = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`;


    eventFromLocalStorage[key] = eventFromLocalStorage[key]
      .map(el => {
        if (el.id !== event.id) {
          return el;
        }

        return event;
      });

    localStorage.setItem('events', JSON.stringify(eventFromLocalStorage));


    setEvents(eventFromLocalStorage);
  };

  const removeEvent = (event) => {
    let eventFromLocalStorage = localStorage.getItem("events");
    if (!eventFromLocalStorage) {
      eventFromLocalStorage = {};
    } else {
      eventFromLocalStorage = JSON.parse(eventFromLocalStorage, (key, value) => {
        if (key === 'date') {
          return new Date(value);
        }

        return value;
      });
    }

    const key = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`;

    eventFromLocalStorage[key] = eventFromLocalStorage[key]
      .filter(el => el.id !== event.id);

    localStorage.setItem('events', JSON.stringify(eventFromLocalStorage));


    setEvents(eventFromLocalStorage);
  };

  useEffect(() => {
    const date = localStorage.getItem("currentDate");
    if (date) {
      _setCurrentDate(new Date(date));
    }
    let eventFromLocalStorage = localStorage.getItem("events");
    if (!eventFromLocalStorage) {
      eventFromLocalStorage = {};
    } else {
      eventFromLocalStorage = JSON.parse(eventFromLocalStorage, (key, value) => {
        if (key === 'date') {
          return new Date(value);
        }

        return value;
      });
    }
    setEvents(eventFromLocalStorage);
  }, []);


  const [createEvent, _setCreateEvent] = useState(null);
  const setCreateEvent = (value) => _setCreateEvent(value);

  return (
    <div className="App">
      <CalendarContext.Provider value={{
        events,
        addEvent,
        updateEvent,
        removeEvent,
        createEvent,
        currentDate,
        setCurrentDate,
        setCreateEvent
      }}>
        <PopupComponent />
        <header>
          <CurrentDateComponent />

          <RadioComponent keyName='years' title='years' />
          <RadioComponent keyName='months' title='months' />
          <RadioComponent keyName='month' title='month' />
          <RadioComponent keyName='day' title='day' />
        </header>

        <Routes>
          <Route index element={<DayComponent />} />
          <Route path='/day' element={<DayComponent />} />
          <Route path='/days/:day' element={<DayComponent />} />

          <Route path='/years/:years?' element={<YearsComponent />} />

          {/* 
            http://localhost:3000/months
            http://localhost:3000/months/12
            http://localhost:3000/months/12f
            http://localhost:3000/months/aaaa
          */}
          <Route path='/months/:month?' element={<MonthsComponent />} />
          <Route path='/month' element={<MonthComponent />} />

          {/* 
             http://localhost:3000/years/1994/month/5/days/6 -- yes
             http://localhost:3000/years/1994/month/2/days/6 -- no "month/2" => month/5
             http://localhost:3000/years/1994/month/3/days/16 -- no days/6 => days/16
             http://localhost:3000/years/1924/month/5/days/6  -- no /years/1924 => /years/1994
          */}
          <Route
            path='/years/1994/month/5/days/6'
            element={<NotFoundComponent />}
          />

          {/* 
             http://localhost:3000/years/1994/month -- no (/:month/days/:day)
             http://localhost:3000/years/1994 -- no (/month/:month/days/:day)
             http://localhost:3000/years/1994/month/3/days/16 -- yes
             http://localhost:3000/years/1924/days/6 -- no (month/:month)
          */}
          <Route
            path='/years/:year/month/:month/days/:day'
            element={<DayComponent />}
          />

          <Route path='/page-not-found' element={<NotFoundComponent />} />
          <Route path='*' element={<NotFoundComponent />} />
        </Routes>
      </CalendarContext.Provider >
    </div>
  );
}

export default App;
