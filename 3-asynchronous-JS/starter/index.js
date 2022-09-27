const fs = require('fs');
const superagent = require('superagent');

// build a promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject("I couldn't read that file 😭");
      } else {
        resolve(data); // what we pass into the resolve function is the result of the promise that will be available in the then handler
      }
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject("I couldn't write that file 😭");
      } else {
        resolve('success');
      }
    });
  });
};

/* // callback hell
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    .end((err, res) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image save to file!');
      });
    });
}); */

/*
// Consume promises
fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image save to file!');
      });
    })
    .catch((err) => console.log(err.message));
});
*/

/* // chained promises
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('./dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image save to file!');
  })
  .catch((err) => console.log(err));
 */

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);

    await writeFilePro('./dog-img.txt', imgs.join('\n'));
    console.log('Random dog image save to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: Ready 🐶';
};

/* console.log('1: Will get dog image');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done!');
  })
  .catch((err) => console.log('ERROR 💥')); */

// IIFE: immediately invoked function expression
(async () => {
  try {
    console.log('1: Will get dog image');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done!');
  } catch (error) {
    console.log('ERROR 💥');
  }
})();
