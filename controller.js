require("dotenv").config();
const request = require("request");
//model state
const state = {
  VaccineAppointments: [],
};

//helper functiony
const API_Call = async function (day) {
  try {
    let options = { json: true };
    let session = [];

    request(process.env.API_URL + day, options, (error, res, body) => {
      if (error) throw new Error(`Error ocurred(${res.status})`);
      if (!error && res.statusCode == 200) {
        session = body.sessions;
      }
    });
    return session;
  } catch (error) {
    console.error(error);
  }
};

//model.js function to access and update state
const fetchData = async function () {
  try {
    const Today = new Date();
    let day = new Date();
    day.setDate(Today.getDate() + 7);

    while (day.getTime() >= Today.getTime()) {
      const session = await API_Call(day);

      if (session.length != 0) {
        if (session.min_age_limit == 18) VaccineAppointments.push(session);
      }

      day.setDate(day.getDate() - 1);
    }
  } catch (error) {
    console.error(error);
  }
};

//Init method - Entry caller function
const control = async function () {
  await fetchData();

  return;
};

module.exports = {
  control: control,
  data: state.VaccineAppointments,
};
