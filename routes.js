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
const pages = require("./controllers/pages");
const repos = require("./controllers/repos");
const createHTML = require("./controllers/createHTML");
const sendHTML = require("./controllers/sendHTML");

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
  try{
const {statusCode, status, html_url} = await pages.enablePages();
res.status(statusCode).json({status, html_url})
  } catch(error){
    res.status(500).json({status: "fail", error: JSON.stringify(error)})
  }
});

router.get("/createRepo", async function(req, res){
  try {
    const {statusCode, status, html_url} = await repos.createRepo(req.query);
    res.status(statusCode).json({status, html_url})
  } catch(error){
    res.status(500).json({status: "fail", error: JSON.stringify(error)})
  }
  
})  

router.delete("/createRepo", async function(req, res){
  try {
    const {statusCode, status, html_url} = await repos.deleteRepo();
    res.status(statusCode)
  } catch(error){
    res.status(500).json({status: "fail", error: JSON.stringify(error)})
  }
  
})

router.get('/testPug', async function(req, res){
  try {
    const html = await createHTML.compile(req.query);
    const report = await sendHTML.send('StartHere',html);
    res.status(200).send(html)
  } catch(error){
    console.log(error)
  }
})

module.exports = router;
