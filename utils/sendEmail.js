const { Offer, User, Book } = require("../models");

function sendOfferAcceptedEmails(offerId) {
  // import env variables
  require("dotenv").config();

  // require SendGrid
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API);

  // get offer data
  Offer.findOne({
    where: {
      id: offerId,
    },
    include: [
      {
        model: User,
        attributes: ["first_name", "email", "phone"],
      },
      {
        model: Book,
        attributes: ["title", "id"],
        include: [
          {
            model: User,
            attributes: ["first_name", "email", "phone"],
          },
        ],
      },
    ],
  }).then((dbData) => {
    // serialize data
    const offer = dbData.get({ plain: true });
    const offerer = offer.user;
    const offeree = offer.book.user;
    console.log(offer);

    // compose email to Offerer
    const msgToOfferer = {
      to: "sbar91@gmail.com",
      from: "sophia@yoursummit.media",
      subject: `Your offer has been accepted!`,
      text: `${offeree.first_name} has accepted your offer to trade ${offer.book.title}! Contact ${offeree.first_name} at ${offeree.email} or ${offeree.phone} to coordinate your trade.`,
      html: `${offeree.first_name} has accepted your offer to trade ${offer.book.title}! Contact ${offeree.first_name} at ${offeree.email} or ${offeree.phone} to coordinate your trade.`,
    };

    // send email to Offerer
    sgMail.send(msgToOfferer).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  });

  //   const msg = {
  //     to: "sbar91@gmail.com",
  //     from: "sophia@yoursummit.media", // Use the email address or domain you verified above
  //     subject: "Sending with Twilio SendGrid is Fun",
  //     text: "and easy to do anywhere, even with Node.js",
  //     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  //   };
  //   //ES6
  //   sgMail.send(msg).then(
  //     () => {},
  //     (error) => {
  //       console.error(error);

  //       if (error.response) {
  //         console.error(error.response.body);
  //       }
  //     }
  //   );
}

module.exports = {
  sendOfferAcceptedEmails,
};
