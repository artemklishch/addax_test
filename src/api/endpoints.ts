const endpoints: { [key: string]: string } = {
  getCurrentEvents: process.env.REACT_APP_BASEURL!,
  createEvent: process.env.REACT_APP_BASEURL + "/createEvent",
  deleteEvent: process.env.REACT_APP_BASEURL + "/deleteEvent",
  updateEvent: process.env.REACT_APP_BASEURL + "/updateEvent",
  updateDragDropInOneDay: process.env.REACT_APP_BASEURL + "/dragDropInOneDay",
  updateDragDropDiffDays: process.env.REACT_APP_BASEURL + "/dragDropDiffDays",
  getWorldHolidays: process.env.REACT_APP_WORLD_HOLIDAYS_URL!,
};
export default endpoints;
