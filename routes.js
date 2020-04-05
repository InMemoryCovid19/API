const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fnv = require("fnv-plus");
const formidable = require("formidable");
const helmet = require("helmet");
const hpp = require("hpp");
const me = require("./package.json");
const router = express.Router();
const url = require("url");
const verifyPostData = require("./services/githook");
const pages = require("./controllers/pages")

// router.use(helmet());
router.use(cors());
router.options("*", cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.raw({ limit: "50mb" }));
router.use(bodyParser.text({ limit: "50mb" }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
router.use(bodyParser.text());

router.use(hpp());
router.get("/", function (req, res) {
  res.status(200).send({ name: me.name, version: me.version });
});

function removeFrameguard(req, res, next) {
  res.removeHeader("X-Frame-Options");
  next();
}
router.post("/formResponse", verifyPostData, function (req, res) {
  const requestId = fnv.hash(Date.now() + "" + req.ip, 128).str();
  res.set("X-Request-Id", requestId);
  console.log("POST", req.query);
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(fields, files);
    res.status(200).json({ fields, files });
  });
});

router.get("/enablePages", async function(req, res){
const {statusCode, status, html_url} = await pages.enablePages();
res.status(statusCode).json({status, html_url})
})

module.exports = router;
