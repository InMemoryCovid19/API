const _ = require("lodash");
const config = require("../config");
const ghGot = require("gh-got");

exports.generatedRepos = async function (test = "true") {
  //Get repos by org
  //filter to get names
  //fire off delete commands

  //GET /orgs/:org/repos
  const getUrl = `/orgs/InMemoryCovid19/repos`;
  //DELETE /repos/:owner/:repo

  let repoNames = [];
  try {
    const repos = await ghGot(getUrl, {
      token: config.github_token,
    });
    repos.body.forEach((repo) => {
      repoNames.push(repo.name);
    });

    const reposToDelete = _.without(repoNames, "API", "StartHere", "FormInput");
    console.log("repos", repoNames, repoNames.length, "without", reposToDelete);
    if (test === "false") {
      reposToDelete.forEach(async function (repoName) {
        try {
          let deleteUrl = `/repos/InMemoryCovid19/${repoName}`;
          const statusMessage = await ghGot.delete(deleteUrl, {
            token: config.github_token,
          });
          console.log(
            "name",
            repoName,
            "statusCode",
            statusMessage.statusCode,
            "message",
            statusMessage.name
          );
        } catch (error) {
          console.log(
            "Delete Generated Repos response",
            error,
            error.statusCode
          );
          console.log(
            "Delete Generated Repos.response.body",
            error.response.body
          );
        }
      });
    }
  } catch (error) {
    console.log("Delete Generated Repos response", error, error.statusCode);
    console.log("Delete Generated Repos.response.body", error.response.body);
  }
};
