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

    contract.getAllMessages().then((messages) => {
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
          .addMessage(
            {
              text: event[0].text,
            },
            BOATLOAD_OF_GAS
            // Big(donation.value || "0")
            //   .times(10 ** 24)
            //   .toFixed()
          )
          .then(() => {
            contract.getAllMessages().then((messages) => {
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
    <main>
      <header className="header-page">
        <h1>NEAR Attendance Certificate</h1>
        <div className="control-button">
          {currentUser ? (
            <button onClick={signOut}>Log out</button>
          ) : (
            <button onClick={signIn}>Log in</button>
          )}
        </div>
      </header>

      {/* CERTIFICATES */}

      {currentUser ? (
        <Form onSubmit={onSubmit} currentUser={currentUser} />
      ) : (
        <SignIn />
      )}
      {!!currentUser && !!messages.length && (
        <Messages messages={messages} title="Your certficates" />
      )}

      {/* EVENTS */}

      {currentUser ? (
        <FormEvent onSubmit={onSubmitEvent} currentUser={currentUser} />
      ) : (
        <SignIn />
      )}
      {!!currentUser && !!events.length && (
        <Messages messages={events} title="Your events" />
      )}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    getAllMessages: PropTypes.func.isRequired,
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
