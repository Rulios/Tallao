const React = require("react");
const dayjs = require("dayjs");

const useServerDateTime = require("../custom-hooks/useServerDateTime");

const {getStaticText} = require("../../../translation/frontend/translator");

module.exports = function ClockSpan(){
    let dateTime = useServerDateTime();

    let day = dayjs(dateTime).date();
    let month = getMonthString(dayjs(dateTime).month());
    let year = dayjs(dateTime).year();
    let hour = dayjs(dateTime).format("hh");
    let minutes = dayjs(dateTime).format("mm");
    let meridiem = dayjs(dateTime).format("A");

    let stringDate = `
        ${day} ${getStaticText("of")} ${month} ${getStaticText("of")} ${year}
    `;

    let stringTime = `
        ${hour}:${minutes}${meridiem}
    `;

    let finalString = `${stringDate} | ${stringTime}`;

    return <span>{finalString}</span>;
}

function getMonthString(monthIndex){
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];
    return getStaticText(months[monthIndex]);
}