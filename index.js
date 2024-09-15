import express from "express";
import { TagsDB } from "./model/tags.js";

function main() {
  const app = express();
  const port = 3000;

  app.use(express.json());

  const tags = new TagsDB("./data/tags.txt");

  app.get("/", (_req, res) => {
    res.json({ data: tags.getAll() });
  });

  app.post("/", (req, res) => {
    const tag = req.body?.tag;

    if (!tag) {
      res.send("el tag debe ser especificado");
      return;
    }

    tags.add(tag);

    res.send("Ok");
  });

  app.put("/:index", (req, res) => {
    const { tag } = req.body;
    const index = Number(req.params.index);

    if (isNaN(index)) {
      res.send("Solo aceptamos números");
      return;
    }

    if (!tag) {
      res.send("el tag debe ser especificado");
      return;
    }

    tags.update(index, tag);

    res.send("Ok");
  });

  app.delete("/:index", (req, res) => {
    const index = Number(req.params.index);

    if (isNaN(index)) {
      res.send("Solo aceptamos números");
      return;
    }

    tags.delete(index);

    res.send(`Eliminado ID: ${index}`);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

try {
  main();
} catch (error) {
  console.error(error);
}
