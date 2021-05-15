const nodemailer = require("nodemailer");
const controller = require("./controller");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "covin.slots",
    pass: "covin_09",
  },
});

let mailOptions = {
  from: "covin.slots@gmail.com",
  to: "sakshi.rdkar@gmail.com",
  subject: "Slots Available for 18+ ",
  text: `Hey`,
};

const sendNotification = async function () {
  try {
    controller.control();
    if (controller.data != 0) {
      console.log(`Slots found..`);
      mailOptions.text = `Please book slots at available centres.. 
      ${data.map((elem) => {
        return `Center Name : ${elem.name}
              Capacity :  ${elem.capacity}`;
      })}`;

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(" Email sent: " + info.response);
        }
      });
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};

//To check server every 3 seconds
(function init() {
  console.log(`Server Started `);
  console.log(`Fetching data after every 3 seconds..`);
  setInterval(function () {
    sendNotification();
  }, 3 * 1000);
})();
