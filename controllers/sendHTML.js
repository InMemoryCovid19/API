const config = require("../config");
const ghGot = require("gh-got");



exports.send = async function (newRepoName,html) {
    let buffer = new Buffer(html);
    let base64data = buffer.toString('base64');

  //PUT /repos/:owner/:repo/contents/:path
  const url = `/repos/InMemoryCovid19/${newRepoName}/contents/_layouts/default.html`;
  const createBody = {
    message: "Add page for new person",
    committer: {
      name: "Leslie Pajuelo",
      email: "l.l.pajuelo+gh@gmail.com",
    },
    content: base64data,
  };
  try {
    const response = await ghGot.put(url, {
      body: createBody,
      token: config.github_token,
    });
    console.log('put body', response.body)
    return response.body;
  } catch (error) {
    console.log("pageInfo response", error, error.statusCode);
    console.log("pageInfo.response.body", error.response.body);
  }
};
