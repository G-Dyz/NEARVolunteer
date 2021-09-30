import { addEvent, getAllEvents } from '../main';
import { PostedEvent, events } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createEvent(text: string, code: string, dateStart: string, dateEnd: string): PostedEvent {
  return new PostedEvent(text, code, dateStart, dateEnd);
}

const message = createEvent('hello world', '2863643', '2021-09-30', '2021-10-02');

describe('message tests', () => {
  afterEach(() => {
    while(events.length > 0) {
      events.pop();
    }
  });

  it('adds a message', () => {
    addEvent('hello world', '2863643', '2021-09-30', '2021-10-02');
    expect(events.length).toBe(
      1,
      'should only contain one message'
    );
    expect(events[0]).toStrictEqual(
      message,
      'message should be "hello world"'
    );
  });

  it('retrieves messages', () => {
    addEvent('hello world', '2863643', '2021-09-30', '2021-10-02');
    const messagesArr = getAllEvents();
    expect(messagesArr.length).toBe(
      1,
      'should be one message'
    );
    expect(messagesArr).toIncludeEqual(
      message,
      'messages should include:\n' + message.toJSON()
    );
  });

  it('only show the last 10 messages', () => {
    addEvent('hello world', '2863643', '2021-09-30', '2021-10-02');
    const newMessages: PostedEvent[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'message #' + i.toString();
      newMessages.push(createEvent(text, '2863643', '2021-09-30', '2021-10-02'));
      addEvent(text, '2863643', '2021-09-30', '2021-10-02');
    }
    const messages = getAllEvents();
    log(messages.slice(7, 10));
    expect(messages).toStrictEqual(
      newMessages,
      'should be the last ten messages'
    );
    expect(messages).not.toIncludeEqual(
      message,
      'shouldn\'t contain the first element'
    );
  });
});

describe('attached deposit tests', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(u128.fromString('0'));
    VMContext.setAccount_balance(u128.fromString('0'));
  });

  it('attaches a deposit to a contract call', () => {
    log('Initial account balance: ' + Context.accountBalance.toString());

    addEvent('hello world', '2863643', '2021-09-30', '2021-10-02');
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
