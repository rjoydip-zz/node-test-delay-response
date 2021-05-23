const delay = require("../lib/delay");
const pForever = require("../lib/pforever");

module.exports = async function (fastify, opts) {
  let statusText = 0;

  pForever(async (index) => {
    await delay(1000);
    index++;
    if (index === Infinity) {
      return pForever.end;
    }
    if (index > 4) {
      index = 1;
    }
    statusText = index;
    console.log("Next: ", statusText);
    return index;
  }, 0);

  fastify.get("/", async function (request, reply) {
    return { statusText };
  });
};
