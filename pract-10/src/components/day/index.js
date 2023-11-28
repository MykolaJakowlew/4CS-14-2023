import { useContext, useEffect } from 'react';
import './style.css';
import CalendarContext from '../../context/calendar.context';
import EventComponent from './event';
import { useNavigate, useParams } from 'react-router-dom';
import { getDaysInMonth } from '../shared/months';

const DayComponent = () => {
  const navigate = useNavigate();
  const { day, month, year } = useParams();

  const { setCreateEvent, currentDate, events, setCurrentDate } = useContext(CalendarContext);

  useEffect(() => {
    if (day) {
      const dayNumber = +day;
      const totalDay = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
      if (isNaN(dayNumber) || dayNumber > totalDay || dayNumber < 0) {
        return navigate('/page-not-found');
      }

      const changes = [{ type: 'day', value: dayNumber }];

      if (!month) {
        setCurrentDate(changes);
        return;
      }

      const monthNumber = +month;
      if (isNaN(monthNumber) || monthNumber > 11 || monthNumber < 0) {
        return navigate('/page-not-found');
      }

      changes.push({ type: 'month', value: monthNumber });

      const yearNumber = +year;
      if (isNaN(yearNumber) || yearNumber < 0) {
        return navigate('/page-not-found');
      }

      changes.push({ type: 'year', value: yearNumber });

      setCurrentDate(changes);
    }

  }, []);

  const click = (hour, x, y) => {
    const date = new Date(currentDate);
    date.setHours(hour);
    date.setMinutes(0);
    date.setSeconds(0);
    setCreateEvent({
      date: date,
      clientX: x,
      clientY: y
    });
  };

  const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
  /**
   * eventsToday => [] || undefined
   */
  const eventsToday = events[key] || [];

  return (
    <div className='content-wrapper day-wrapper '>
      {
        Array(24).fill(null)
          .map((_, index) => {
            return (
              <div className='hours-wrapper'>
                <div className='hours'>
                  <span>{index}:00</span>
                </div>
                <div
                  className='content'
                  onClick={(event) => click(index, event.clientX, event.clientY)}>
                  {
                    eventsToday.map(event => {
                      const date = new Date(event.date);
                      const hour = date.getHours();
                      if (hour === index) {
                        return (<EventComponent event={event} />);
                      }
                      return null;
                    })
                  }
                </div>
              </div>
            );
          })
      }
      <div className='hours-wrapper'>
        <div className='hours'>
          <span>24:00</span>
        </div>
        <div className='content'>
        </div>
      </div>
    </div>
  );
};

export default DayComponent;