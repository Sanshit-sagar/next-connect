


export const dayOfYear = (date: number) => {
    let diff = date - new Date(date.getFullYear(), 0, 0).getDate();
    return Math.floor(diff / 1000 / 60 / 60 / 24)
}

export const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
}

export const daysFromNow = (futureDayCount: number) => {
    let d = new Date()
    d.setDate(d.getDate() + Math.abs(futureDayCount))
    return d.toISOString().split('T')[0];
}

export const daysAgo = (pastDayCount: number) => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(pastDayCount))
    return d.toISOString().split('T')[0];
}
  

/// Date Arthmetic (adding/subtracting days, mins etc)

export const addDaysToDate = (date: number, additionalDaysCount: number) => {
    const d = new Date(date)
    d.setDate(d.getDate() + additionalDaysCount)
    return d.toISOString().split('T')[0]
}

export const addMinutesToDate = (date: number, additionalMinutesCount: number) => {
    const d = new Date(date);
    d.setTime(d.getTime() + additionalMinutesCount * 60000);
    return d.toISOString().split('.')[0].replace('T',' ');
};

export const addWeekDays = (startDate: Date, additionalDaysCount: number) => {
    return Array.from({ length: additionalDaysCount }).reduce((date: Date) => {
        
        date = new Date(date.setDate(date.getDate() + 1))
        
        if (date.getDay() % 6 === 0) {
            let cycledDate = date.getDate() + (date.getDay() / 6 + 1)
            date = new Date(date.setDate(cycledDate))
        }
        
        return date;
    }, startDate)
}

// export const dateRangeGenerator = function* (start: number, end: number, step = 1) {
//     let d = start;
//     while (d < end) {
//         yield new Date(d);
//         d.setDate(d.getDate() + step);
//     }
// }

export const isDateValid = (...val: any[]) => !Number.isNaN(new Date(...val).valueOf());