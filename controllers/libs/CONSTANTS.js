//this module stores all the constants


const SERVICES = [
    "wash", "iron", "wash_iron",
     "dry_clean"
];

const ELEMENTS = [
    "shirt",
    "pants",
    "skirt",
    "coat",
    "sweater",
    "pleatedSkirt",
    "overall",
    "jumper",
    "blouse",
    "largeSuit",
    "quilt"
];

const EXTRAS_ELEMENTS = [
    "hook"
];

const DAYS = [
    "monday", "tuesday", "wednesday", "thursday",
    "friday", "saturday", "sunday"
];

const NAME_RANGE_HOURS = [
    "startHour", "endHour"
];

module.exports = {
    SERVICES: SERVICES,
    ELEMENTS: ELEMENTS,
    EXTRAS_ELEMENTS: EXTRAS_ELEMENTS,
    DAYS: DAYS,
    NAME_RANGE_HOURS: NAME_RANGE_HOURS
};