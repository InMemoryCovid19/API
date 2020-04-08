const config = require("../config");
const ghGot = require("gh-got");
const got = require("got");
const pages = require("./pages");
const createHTML = require("./createHTML");
const sendHTML = require("./sendHTML");

const repoInfo = async function (repoName) {
  const url = `/repos/InMemoryCovid19/${repoName}`;
  try {
    const response = await ghGot(url, { token: config.github_token });
    return response.body;
  } catch (error) {
    console.log("repoInfo", error.statusCode);
  }
};

exports.createRepo = async function (params) {
  // params {
  //   name: 'pug',
  //   birthdate: '2020-1-1',
  //   deathdate: '2020-3-1',
  //   words: 'all the words!'
  // }

  let { name } = params;
  spaceEx = /" "/gi;
  kname = name.replace(" ", "-"); //TODO kebab case on spaces gah regex
  const newRepoName = `${kname}-${Date.now()}`; // TODO human readable date
  const url = "/repos/InMemoryCovid19/StartHere/generate";
  const body = {
    owner: "InMemoryCovid19",
    name: `${newRepoName}`,
    description: "This is your first repository",
    private: false,
  };

  try {
    const response = await ghGot.post(url, {
      headers: {
        Accept: "application/vnd.github.baptiste-preview+json",
      },
      body: body,
      responseType: "json",
      token: config.github_token,
    });
    //Check repo is accessible by API
    let repoInfoRes = await repoInfo(`${newRepoName}`);
    console.log("repoInfoRes", repoInfoRes.name);

    // create default.html in new repo
    if (repoInfoRes.name) {
      try {
        const html = await createHTML.compile(params);
        try {
          const report = await sendHTML.send(newRepoName, html);
          console.log('reorit;', report);
          // enable pages
          if (report && repoInfoRes && repoInfoRes.updated_at !== undefined) {
            try {
              const report = await pages.enablePages(newRepoName);
              console.log('retrun enable pages reprot', report)
              return report;
            } catch (error) {
              console.log(
                "createRepo pages",
                error.response.statusCode,
                error.response.messages
              );
              console.log(
                "createRepo pages .response.body",
                error.response.body
              );
            }
          } else {
             setTimeout(async function(){
              const forceReport = await pages.enablePages(newRepoName);
              return forceReport;
            }, 10000)
            
                    }
        } catch (error) {
          console.log("createRepo", error, error.statusCode);
          console.log("createRepo.response.body", error.response.body);
        }
      } catch (error) {
        console.log("createRepo", error, error.statusCode);
        console.log("createRepo.response.body", error.response.body);
      }
    }
  } catch (error) {
    console.log("catching ???", error, error.statusCode);
    console.log("catching ??? response body", error.response.body);
  }
};
