import { addCertificate, getAllCertificates, addEvent } from '../main';
import { PostedCertificate, certificates, PostedEvent, events } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createCertificate(text: string): PostedCertificate {
  return new PostedCertificate(text);
}
function createEvent(text: string, code: string, dateStart: string, dateEnd: string): PostedEvent {
  return new PostedEvent(text, code, dateStart, dateEnd);
}

const path = 'https://cdn.pixabay.com/photo/image_certificate.jpg';
const code = '2863643';
const dateStart = '2021-09-30';
const dateEnd = '2021-10-02';

const certificateTest = '2863643';
const pathTest = 'https://cdn.pixabay.com/photo/image_certificate.jpg';
const certificate = createCertificate(pathTest);

describe('certificate tests', () => {
  beforeEach(() => {
    while(certificates.length > 0) {
      certificates.pop();
    }
  });

  it('adds a certificate', () => {
    addEvent(path, code, dateStart, dateEnd);
    addCertificate(certificateTest);
    expect(certificates.length).toBe(
      1,
      'should only contain one certificate'
    );
    expect(certificates[0]).toStrictEqual(
      certificate,
      'certificate should be "hello world"'
    );
  });

  it('adds a premium certificate', () => {
    VMContext.setAttached_deposit(u128.from('10000000000000000000000'));
    addEvent(path, code, dateStart, dateEnd);
    addCertificate(certificateTest);
    const certificatesAR = getAllCertificates();
    expect(certificatesAR[0].premium).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves certificates', () => {
    addEvent(path, code, dateStart, dateEnd);
    addCertificate(certificateTest);
    const certificatesArr = getAllCertificates();
    expect(certificatesArr.length).toBe(
      1,
      'should be one certificate'
    );
    expect(certificatesArr).toIncludeEqual(
      certificate,
      'certificates should include:\n' + certificate.toJSON()
    );
  });

  it('only show the last 10 certificates', () => {
    addEvent(path, code, dateStart, dateEnd);
    const newCertificates: PostedCertificate[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      newCertificates.push(createCertificate(pathTest));
      addCertificate(certificateTest);
    }
    const certificates = getAllCertificates();
    log(certificates.slice(7, 10));
    expect(certificates).toStrictEqual(
      newCertificates,
      'should be the last ten certificates'
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

    addCertificate(certificateTest);
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
