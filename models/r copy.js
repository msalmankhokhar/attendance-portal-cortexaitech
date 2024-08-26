const getDateToday = ()=>{
  const now = new Date();
  const localOffset = now.getTimezoneOffset(); // Local time zone offset in minutes
  const pakistanOffset = 60 * 5; // Pakistan Standard Time (UTC+5) in minutes
  const offsetDifference = pakistanOffset + localOffset; // Difference in minutes
  if (offsetDifference === 0) {
    const pakistanDateString = now.toLocaleString('en-Ca', { day: 'numeric', month: '', year: 'numeric' }) // returns Date String in YYYY-MM-DD format
    return new Date(pakistanDateString);
  } else {
    const pakistanDateObject = new Date(now.getTime() + offsetDifference * 60 * 1000);
    const pakistanDateString = pakistanDateObject.toLocaleString('en-Ca', { day: 'numeric', month: '', year: 'numeric' }) // returns Date String in YYYY-MM-DD format
    return new Date(pakistanDateString);
  }
}

let d = getDateToday()
console.log(d)