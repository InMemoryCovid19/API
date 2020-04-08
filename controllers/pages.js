const config = require("../config");
const ghGot = require("gh-got");

exports.pageInfo = async function (newRepoName) {
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

const previewEnable = async function (newRepoName) {
  const url = `/repos/InMemoryCovid19/${newRepoName}/pages`;
  try {
    const response = await ghGot.post(url, {
      headers: {
        Accept: "application/vnd.github.switcheroo-preview+json",
      },
      json: {
        source: {
          branch: "master",
          path: "/",
        },
      },
      responseType: "json",

      token: config.github_token,
    });
    
    return response;
  } catch (error) {
    console.log("in Preview enable error.response BODY", error.response.body);
    return {
      statusCode: error.response.statusCode,
      statusMessage: error.response.statusCode,
    };
  }
};

exports.enablePages = async function (newRepoName) {
  try {
    const response = await previewEnable(newRepoName);
    if (response.statusCode === "409") {
      return {
        statusCode: response.statusCode,
        status: "Pages Already Created",
        html_url: newRepoName,
      };
    } else {
      console.log('enable pages, count', response.statusCode, response.body,html_url)
      return {
        statusCode: 201,
        status: response.body.status,
        html_url: response.body.html_url,
      };
    }
  } catch (error) {
    console.log("routes enablePages", error);
  }
};
