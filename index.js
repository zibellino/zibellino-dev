import express from 'express'
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'Cloud';
  res.send(`New ${name}!`);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

function renderFile(filename, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
}
