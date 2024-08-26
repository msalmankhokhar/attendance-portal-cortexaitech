import { useState } from 'react';
import { getTime } from '@/Config';
const defaultTime = { hours: '03', minutes: '00', period: 'AM', }

const TimePicker = ({ title = 'Check In', onCancel=null, markAttendance, checkInTime = title === 'Check In' ? { hours: '09', minutes: '00', period: 'AM', } : { hours: '01', minutes: '00', period: 'PM', }, saveBtnDisabled=false, setCheckInTimeToday }) => {
  const [time, setTime] = useState(checkInTime);
  const [saveDisabled, setSaveDisabled] = useState(saveBtnDisabled)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
    setSaveDisabled(false)
  };

  const onSave = async ()=>{
    const M = parseInt(time.minutes)
    let hourInt = parseInt(time.hours)
    let H
    // Calculating H
    if (time.period === 'AM') {
      if (hourInt < 12) {
        H = hourInt
      } else {
        H = 0
      }
      H = parseInt(time.hours)
    } else {
      if (hourInt < 12) {
        H = hourInt + 12
      } else {
        H = 12
      }
    }
    const timeObject = getTime(H, M)
    let payLoad
    if (title === 'Check In') {
      await markAttendance(
        'Present',
        timeObject,
        'no_update'
      )
    } else {
      await markAttendance(
        'Present',
        'no_update',
        timeObject
      ) 
    }
    onCancel()
    setSaveDisabled(true)
    setCheckInTimeToday(timeObject.toISOString())
  }

  return (
    <div className="flex flex-col gap-5 items-center">
        <h1 className='font-semibold text-xl dark:text-white'>Select {title} Time</h1>
        <div className="flex items-center space-x-2">
        <select
            name="hours"
            value={time.hours}
            onChange={handleChange}
            className="border rounded p-2 bg-white dark:bg-slate-800 dark:text-white"
        >
            {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
            </option>
            ))}
        </select>
        :
        <select
            name="minutes"
            value={time.minutes}
            onChange={handleChange}
            className="border rounded p-2 bg-white dark:bg-slate-800 dark:text-white"
        >
            {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
            </option>
            ))}
        </select>
        <select
            name="period"
            value={time.period}
            onChange={handleChange}
            className="border rounded p-2 bg-white dark:bg-slate-800 dark:text-white"
        >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
        </div>
        <div className="flex gap-3 items-center">
            <button disabled={saveDisabled} onClick={onSave} className='text-xs font-semibold px-5 py-2 rounded-md text-white bg-green-600'>Save</button>
            <button onClick={onCancel} className='text-xs font-semibold px-5 py-2 rounded-md text-white bg-red-600'>Close</button>
        </div>
        {/* <div className='dark:text-white text-lg font-semibold'>{ time.period === 'AM' ? (time.hours < 12 ? time.hours : '00') : (parseInt(time.hours) < 12 ? String(parseInt(time.hours) + 12) : '12') } {time.minutes}</div> */}
    </div>
  );
};

export default TimePicker;
