const { Offer, User, Book } = require("../models");

function sendOfferAcceptedEmail(offerId) {
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
    // serialize and organize data
    const offer = dbData.get({ plain: true });
    const offerer = offer.user;
    const offeree = offer.book.user;

    // compose email to Offerer
    const msgToOfferer = {
      to: `${offerer.email}`,
      from: "hello@yoursummit.media",
      subject: `Your offer has been accepted!`,
      text: `${offeree.first_name} has accepted your offer to trade ${offer.book.title}!
      Contact ${offeree.first_name} at ${offeree.email} or ${offeree.phone} to coordinate your trade.
      Here's what you offered:
      ${offer.offer_text}`,
      html: `<strong>${offeree.first_name} has accepted your offer to trade ${offer.book.title}!</strong><br/>
      Contact ${offeree.first_name} at ${offeree.email} or ${offeree.phone} to coordinate your trade.<br/>
      Here's what you offered:<br/>
      ${offer.offer_text}`,
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
}

module.exports = {
  sendOfferAcceptedEmail,
};
