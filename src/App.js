import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import Form from "./components/Form";
import FormEvent from "./components/FormEvent";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);

  // filters
  const filterMessage = (messages) => {
    return messages.filter(
      (message) => message.sender == currentUser.accountId
    );
  };
  const filterEventByCode = (events, code) => {
    return events.filter((event) => event.codeEvent == code);
  };
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!

    contract.getAllCertificates().then((messages) => {
      setMessages(filterMessage(messages));
      // setMessages(messages);
    });
    contract.getAllEvents().then((events) => {
      setEvents(events);
      // setMessages(messages);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known

    // validate event
    contract.getAllEvents().then((events) => {
      const event = filterEventByCode(events, message.value);
      if (event != null && event[0] != null) {
        contract
          .addCertificate(
            {
              text: event[0].text,
            },
            BOATLOAD_OF_GAS
            // Big(donation.value || "0")
            //   .times(10 ** 24)
            //   .toFixed()
          )
          .then(() => {
            contract.getAllCertificates().then((messages) => {
              setMessages(filterMessage(messages));
              // setMessages(messages);
              message.value = "";
              // donation.value = SUGGESTED_DONATION;
              fieldset.disabled = false;
              message.focus();
            });
          });
      }
      // setMessages(messages);
    });
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();

    const { fieldset, message, dateStart, dateEnd, donation } =
      e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract
      .addEvent(
        {
          text: message.value,
          code: String(randomInteger(100000, 9999999)),
          dateStart: String(dateStart.value),
          dateEnd: String(dateEnd.value),
        },
        BOATLOAD_OF_GAS
        // Big(donation.value || "0")
        //   .times(10 ** 24)
        //   .toFixed()
      )
      .then(() => {
        contract.getAllEvents().then((events) => {
          setEvents(filterMessage(events));
          // setMessages(messages);
          message.value = "";
          // donation.value = SUGGESTED_DONATION;
          fieldset.disabled = false;
          message.focus();
        });
      });
  };

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      "Near Attendance Certificate"
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <>
      <header className="header-page">
        <div>
          <div></div>
          <div>
            <h1>NEAR Volunteer</h1>
          </div>
          <div className="control-button">
            {currentUser ? (
              <button onClick={signOut}>Log out</button>
            ) : (
              <button onClick={signIn}>Log in</button>
            )}
          </div>
        </div>
      </header>
      <div className="content-page">
        {currentUser ? (
          <div>
            <div className="tabs">
              <div className="tab">
                <input type="radio" id="tab-1" name="tab-group-1" checked />
                <label for="tab-1">Certificates</label>

                <div className="content">
                  {/* CERTIFICATES */}

                  {currentUser ? (
                    <Form onSubmit={onSubmit} currentUser={currentUser} />
                  ) : (
                    <SignIn />
                  )}
                  {!!currentUser && !!messages.length && (
                    <Messages
                      messages={messages}
                      title="Your certficates"
                      type="certificate"
                    />
                  )}
                </div>
              </div>

              <div className="tab">
                <input type="radio" id="tab-2" name="tab-group-1" />
                <label for="tab-2">Events</label>

                <div className="content">
                  {/* EVENTS */}

                  {currentUser ? (
                    <FormEvent
                      onSubmit={onSubmitEvent}
                      currentUser={currentUser}
                    />
                  ) : (
                    <SignIn />
                  )}
                  {!!currentUser && !!events.length && (
                    <Messages
                      messages={events}
                      title="Your events"
                      type="event"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="introduction">
            <SignIn />
          </div>
        )}
      </div>
      <footer className="footer-page">
        <h6>Developer by Team NEAR Colab</h6>
      </footer>
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addCertificate: PropTypes.func.isRequired,
    getCertificates: PropTypes.func.isRequired,
    getAllCertificates: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
