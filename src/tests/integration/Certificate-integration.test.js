// these are made available by near-cli/test_environment
// note: do not remove the line below as it is needed for these tests
/* global nearlib, nearConfig */

import "regenerator-runtime/runtime";

let near;
let contract;
let accountId;

beforeAll(async function () {
  near = await nearlib.connect(nearConfig);
  accountId = nearConfig.contractName;
  contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["getAllCertificates"],
    changeMethods: ["addCertificate"],
    sender: accountId,
  });
});

it("send one certificate and retrieve it", async () => {
  await contract.addCertificate({ text: "aloha" });
  const msgs = await contract.getAllCertificates();
  const expectedCertificatessResult = [
    {
      active: true,
      premium: false,
      sender: accountId,
      text: "aloha",
    },
  ];
  expect(msgs).toEqual(expectedCertificatessResult);
});

it("send two more certificates and expect three total", async () => {
  await contract.addCertificate({ text: "foo" });
  await contract.addCertificate({ text: "bar" });
  const msgs = await contract.getAllCertificates();
  expect(msgs.length).toEqual(3);
});
