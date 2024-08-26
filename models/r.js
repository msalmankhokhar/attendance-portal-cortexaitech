const getTime = (H, M)=>{
    const now = new Date();
    const localOffset = now.getTimezoneOffset(); // Local time zone offset in minutes
    const pakistanOffset = 60 * 5; // Pakistan Standard Time (UTC+5) in minutes
    const offsetDifference = pakistanOffset + localOffset; // Difference in minutes
    let pakistanDateString
    if (offsetDifference === 0) {
        pakistanDateString = now.toLocaleString('en-Ca', { day: 'numeric', month: 'numeric', year: 'numeric' }) // returns Date String in YYYY-MM-DD format
    } else {
        const pakistanDateObject = new Date(now.getTime() + offsetDifference * 60 * 1000);
        pakistanDateString = pakistanDateObject.toLocaleString('en-Ca', { day: 'numeric', month: '', year: 'numeric' }) // returns Date String in YYYY-MM-DD format
    }
    const dateObject = new Date(pakistanDateString);
    dateObject.setHours(H)
    dateObject.setMinutes(M)
    return dateObject
}

const d = new Date()
d.setHours(parseInt('00'))
d.setMinutes(parseInt('00'), 0, 0)
console.log(d.toString());