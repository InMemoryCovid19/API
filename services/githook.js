/*
 * Verify GitHub webhook signature header in Node.js
 * Written by stigok and others (see gist link for contributor comments)
 * https://gist.github.com/stigok/57d075c1cf2a609cb758898c0b202428
 * Licensed CC0 1.0 Universal
 */

const config = require('../config');
const crypto = require('crypto');

const secret = config.webhookSecret;

// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
const sigHeaderName = 'X-Hub-Signature'

function verifyPostData(req, res, next) {
  const payload = JSON.stringify(req.body)
  if (!payload) {
    return next('Request body empty')
  } 

  const sig = req.get(sigHeaderName) || ''
  const hmac = crypto.createHmac('sha1', secret)
  const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8')
  const checksum = Buffer.from(sig, 'utf8')
  if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`)
  }
  return next()
}

module.exports = verifyPostData;