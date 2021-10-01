// these are made available by near-cli/test_environment
// note: do not remove the line below as it is needed for these tests
/* global nearlib, nearConfig */

import "regenerator-runtime/runtime";

let near;
let contract;
let accountId;

const path = "https://cdn.pixabay.com/photo/image_certificate.jpg";
const code = "2863643";
const dateStart = "2021-09-30";
const dateEnd = "2021-10-02";
const code2 = "2863645";
const code3 = "2863646";

const codeTest = "2863643";
const codeTest2 = "2863645";
const codeTest3 = "2863646";

beforeAll(async function () {
  near = await nearlib.connect(nearConfig);
  accountId = nearConfig.contractName;
  contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["getAllCertificates"],
    changeMethods: ["addCertificate", "addEvent"],
    sender: accountId,
  });
  jest.setTimeout(120000);
});
it("send one certificate and retrieve it", async () => {
  await contract.addEvent({
    text: path,
    code: code,
    dateStart: dateStart,
    dateEnd: dateEnd,
  });
  await contract.addCertificate({ text: codeTest });
  const msgs = await contract.getAllCertificates();
  const expectedCertificatessResult = [
    {
      active: true,
      premium: false,
      sender: accountId,
      text: path,
    },
  ];
  expect(msgs).toEqual(expectedCertificatessResult);
});

it("send two more certificates and expect three total", async () => {
  await contract.addEvent({
    text: path,
    code: code2,
    dateStart: dateStart,
    dateEnd: dateEnd,
  });
  await contract.addEvent({
    text: path,
    code: code3,
    dateStart: dateStart,
    dateEnd: dateEnd,
  });
  await contract.addCertificate({ text: codeTest2 });
  await contract.addCertificate({ text: codeTest3 });
  const msgs = await contract.getAllCertificates();
  expect(msgs.length).toEqual(3);
});
