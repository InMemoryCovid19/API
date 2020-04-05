const config = require("../config");
const ghGot = require("gh-got");

exports.send = async function (html) {
  const url = `/repos/InMemoryCovid19/${newRepoName}/pages`;
  try {
    const response = await ghGot(url, {
      token: config.github_token,
    });
    return response.body;
  } catch (error) {
    console.log("pageInfo response", error, error.statusCode);
    console.log("pageInfo.response.body", error.response.body);
  }
};