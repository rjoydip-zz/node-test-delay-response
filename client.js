const fetch = require("node-fetch");
const pForever = require("./lib/pforever");

void (async function () {
  let statusText = await new Promise((resolve, reject) =>
    pForever(async (statusText) => {
      if (statusText === 4) {
        resolve(statusText);
        return pForever.end;
      }
      try {
        statusText = (await (await fetch("http://127.0.0.1:3000/")).json())
          .statusText;
      } catch (error) {
        reject(error);
      }
      return statusText;
    }, 0)
  );
  console.log(statusText);
})();
