import { addEvent, getAllEvents } from '../main';
import { PostedEvent, events } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createEvent(text: string, code: string, dateStart: string, dateEnd: string): PostedEvent {
  return new PostedEvent(text, code, dateStart, dateEnd);
}

const path = 'https://cdn.pixabay.com/photo/image_certificate.jpg';
const code = '2863643';
const dateStart = '2021-09-30';
const dateEnd = '2021-10-02';

const event = createEvent(path, code, dateStart, dateEnd);

describe('events tests', () => {
  afterEach(() => {
    while(events.length > 0) {
      events.pop();
    }
  });

  it('adds an event', () => {
    addEvent(path, code, dateStart, dateEnd);
    expect(events.length).toBe(
      1,
      'should only contain one event'
    );
    expect(events[0]).toStrictEqual(
       event,
      'event should be a path'
    );
  });

  it('retrieves events', () => {
    addEvent(path, code, dateStart, dateEnd);
    const eventArr = getAllEvents();
    expect(eventArr.length).toBe(
      1,
      'should be one event'
    );
    expect(eventArr).toIncludeEqual(
      event,
      'event should include:\n' + event.toJSON()
    );
  });

  it('only show the last 10 events', () => {
    addEvent(path, code, dateStart, dateEnd);
    const newEvents: PostedEvent[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'event #' + i.toString();
      newEvents.push(createEvent(text, code, dateStart, dateEnd));
      addEvent(text, code, dateStart, dateEnd);
    }
    const events = getAllEvents();
    log(events.slice(7, 10));
    expect(events).toStrictEqual(
       newEvents,
      'should be the last ten events'
    );
    expect(events).not.toIncludeEqual(
      event,
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

    addEvent(path, code, dateStart, dateEnd);
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
