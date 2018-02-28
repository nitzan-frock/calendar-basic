const moment = require('moment');

const getToday = (date) => {
    const year = date.year;
    const month = moment().month(date.month).format('MMMM');
    const day = date.day;
    const compiled = moment().month(month).format('M')+"-"+date.day+"-"+year;

    let weekDayName = null;
    if (!date.compiled) {
        weekDayName = moment(compiled, "M-DD-YYYY").format('dddd');
    } else {
        weekDayName = moment(date.compiled, "M-DD-YYYY").format('dddd');
    }
    
    const stringDate = weekDayName+", "+month+" "+day+", "+year;

    return {
        compiledString: stringDate,
        year: year,
        month: month,
        day: day
    };
}

export default getToday;