const express = require('express');
const shortid = require('shortid');
const QRCode = require('qrcode');
const router = express.Router();
const db = require('./db.js');

let urlDatabase = {};

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/shorten', async (req, res) => {
  const originalUrl = req.body.url;
  const shortUrl = shortid.generate();
  urlDatabase[shortUrl] = originalUrl;

  const qrCodeData = await QRCode.toDataURL(`http://localhost:3000/${shortUrl}`);

  res.render('result', { shortUrl, originalUrl, qrCodeData });

   await db.query(`INSERT INTO url(longurl, shorturl, qrcode) 
    VALUES($1, $2, $3)`, [originalUrl, shortUrl, qrCodeData]);
});

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const originalUrl = urlDatabase[shortUrl];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});


module.exports = router;

