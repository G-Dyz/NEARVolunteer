import React from "react";
import PropTypes from "prop-types";

export default function Messages({ messages, title }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="wrapper">
        {messages.map((message, i) => (
          // TODO: format as cards, add timestamp
          <p key={i} className={message.premium ? "is-premium" : ""}>
            <img
              src={message.text}
              width="95"
              height="95"
              className="card-img"
            ></img>
            <br />
            {/* <p>{JSON.stringify(message)}</p> */}
            {message.codeEvent && <span>{message.codeEvent}</span>}
            <br />
            {message.dateStart && <span>{message.dateStart}</span>}
            <br />
            {message.dateEnd && <span>{message.dateEnd}</span>}
            <br />
            <strong className="tittle">{message.sender}</strong>
            {/* {message.text} */}
          </p>
        ))}
      </div>
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
};
