const path = require("path");
const fs = require("fs");

const pathToDb = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Card {
  static async add(notebook) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((n) => n.id === notebook.id);
    const candidate = card.notebooks[idx];

    if (candidate) {
      // notebook karopkada bor
      candidate.count++;
      card.notebooks[idx] = candidate;
    } else {
      // notebook karopkaga qo'shish
      notebook.count = 1;
      card.notebooks.push(notebook);
    }

    card.price += +notebook.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToDb, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}
module.exports = Card;
