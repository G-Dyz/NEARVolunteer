import React from "react";
import PropTypes from "prop-types";

export default function Messages({ messages, title, type }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="wrapper">
        {messages.map((message, i) => (
          // TODO: format as cards, add timestamp
          <p
            key={i}
            className={message.premium ? "is-premium" : ""}
            className="card"
          >
            <img
              src={message.text}
              width="95"
              height="95"
              className="card-img"
            ></img>
            <br />
            {/* <p>{JSON.stringify(message)}</p> */}
            {type == "event" ? (
              <>
                {message.codeEvent && (
                  <span className="data-information">{message.codeEvent}</span>
                )}
                <br />
                {message.dateStart && (
                  <span className="date-information">
                    From {message.dateStart} to
                  </span>
                )}
                <br />
                {message.dateEnd && (
                  <span className="date-information">{message.dateEnd}</span>
                )}
                <br />
              </>
            ) : null}

            <i className="tittle">{message.sender}</i>
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
