import { PostedMessage, messages, PostedEvent, events } from './model';

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;


/// CERTIFICATES


/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the the persistent collection
  messages.push(message);
}



/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
 export function getAllMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}


/// EVENTS


/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
 export function addEvent(text: string, code: string, dateStart: string, dateEnd: string): void {
  // Creating a new message and populating fields with our data
  const event = new PostedEvent(text, code, dateStart, dateEnd);
  // Adding the message to end of the the persistent collection
  events.push(event);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
 export function getAllEvents(): PostedEvent[] {
  const numEvents = min(MESSAGE_LIMIT, events.length);
  const startIndex = events.length - numEvents;
  const result = new Array<PostedEvent>(numEvents);
  for(let i = 0; i < numEvents; i++) {
    result[i] = events[i + startIndex];
  }
  return result;
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
//  const curr =  "tammm.testnet"
//  export function getMessages(accountId: string): PostedMessage[] { // currentUser: string
//    const numMessages = min(MESSAGE_LIMIT, messages.length);
//    const startIndex = messages.length - numMessages;
//    const result = new Array<PostedMessage>(numMessages);
//    for(let i = 0; i < numMessages; i++) {
//      result[i] = messages[i + startIndex];
//    }
//    const resultf = result.filter(message => message.sender == curr);
//    return resultf;
//  }