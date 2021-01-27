const React = require("react");

const useLaundryName = require("../custom-hooks/useLaundryName");

module.exports = function LaundryNameSpan(){
    let laundryName = useLaundryName();

    return <span>{laundryName}</span>;
}