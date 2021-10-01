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

jest.setTimeout(120000);

beforeAll(async function () {
  near = await nearlib.connect(nearConfig);
  accountId = nearConfig.contractName;
  contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["getAllEvents"],
    changeMethods: ["addEvent"],
    sender: accountId,
  });
});

it("send one event and retrieve it", async () => {
  await contract.addEvent({
    text: path,
    code: code,
    dateStart: dateStart,
    dateEnd: dateEnd,
  });
  const msgs = await contract.getAllEvents();
  const expectedEvensResult = [
    {
      active: true,
      sender: accountId,
      text: path,
      codeEvent: code,
      dateStart: dateStart,
      dateEnd: dateEnd,
    },
  ];
  expect(msgs).toEqual(expectedEvensResult);
});

it("send two more events and expect three total", async () => {
  await contract.addEvent({
    text: "event # 1",
    code: code,
    dateStart: dateStart,
    dateEnd: dateEnd,
  });
  await contract.addEvent({
    text: "event # 2",
    code: code,
    dateStart: dateStart,
    dateEnd: dateEnd,
  });
  const msgs = await contract.getAllEvents();
  expect(msgs.length).toEqual(3);
});
