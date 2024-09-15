import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

export class TagsDB {
  #path_to_db = "";
  #tags = [];

  constructor(path_to_db) {
    this.#path_to_db = path_to_db;
    this.#init();

    this.#tags = this.getAll();
  }

  #init() {
    const exists = existsSync(this.#path_to_db);
    if (!exists) {
      const directoryPath = path.dirname(this.#path_to_db);

      mkdirSync(directoryPath, { recursive: true });
      writeFileSync(this.#path_to_db, "");
    }
  }

  #write(tags) {
    const data = this.#tags.toString().replaceAll(",", "\n");

    writeFileSync(this.#path_to_db, data);
  }

  getAll() {
    const buff = readFileSync(this.#path_to_db);
    const tags = buff.toString().split("\n");

    if (tags[0] === "") {
      this.#tags = tags;
      return [];
    }

    this.#tags = tags;
    return tags;
  }

  add(tag) {
    this.#tags.push(tag);

    this.#write(this.#tags);
  }

  update(index, tag) {
    if (index > this.#tags.length - 1) {
      return;
    }

    this.#tags[index] = tag;

    this.#write(this.#tags);
  }

  delete(index) {
    if (index > -1 && index < this.#tags.length) {
      tags.splice(index, 1);
    }

    this.#write(this.#tags);
  }
}
