import { addCertificate, getAllCertificates } from '../main';
import { PostedCertificate, certificates } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createCertificate(text: string): PostedCertificate {
  return new PostedCertificate(text);
}

const certificateTest = '2863643';
const certificate = createCertificate(certificateTest);

describe('certificate tests', () => {
  afterEach(() => {
    while(certificates.length > 0) {
      certificates.pop();
    }
  });

  it('adds a certificate', () => {
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
    addCertificate(certificateTest);
    const certificatesAR = getAllCertificates();
    expect(certificatesAR[0].premium).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves certificates', () => {
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
    addCertificate(certificateTest);
    const newCertificates: PostedCertificate[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'certificate #' + i.toString();
      newCertificates.push(createCertificate(text));
      addCertificate(text);
    }
    const certificates = getAllCertificates();
    log(certificates.slice(7, 10));
    expect(certificates).toStrictEqual(
      newCertificates,
      'should be the last ten certificates'
    );
    expect(certificates).not.toIncludeEqual(
      certificate,
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
