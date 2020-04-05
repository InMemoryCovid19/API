const config = require('../config');
const ghGot = require('gh-got');

const reposInfo = async function() {
    const url = "/orgs/InMemoryCovid19/repos"
	try{
    const response = await ghGot(url, {token:config.github_token });
    console.log('repo', response.body)
	return response.body;
	} catch (error){
		console.log('repoInfo', error)
	}
};

const repoInfo = async function() {
    const url = "/repos/InMemoryCovid19/StartHere"
	try{
    const response = await ghGot(url, {token:config.github_token });
    console.log('repo', response.body)
	return response.body;
	} catch (error){
		console.log('repoInfo', error)
	}
};

exports.createRepo = async function(){
    //repos/:template_owner/:template_repo/generate
    // const url = "/repos/InMemoryCovid19/StartHere/generate";
// const body = await repoInfo();
    //GET /repos/:owner/:repo
    // const url = "/repos/InMemoryCovid19/StartHere";

    const url = "/orgs/InMemoryCovid19/repos";

    try{
        var response = await ghGot.post(url, {
            headers: {
                Accept:'application/vnd.github.baptiste-preview+json'
            },
            body: {
                "name": "Hello-World",
                "description": "This is your first repository",
                "homepage": "",
                "private": false,
                "has_issues": false,
                "has_projects": false,
                "has_wiki": true
              },
            responseType: 'json',
            
            token:config.github_token });
        return {name: response.body.name, }
        } catch(error){
            console.log('createRepo', error);
            console.log('createRepo.response', error.response.body.errors);
        }
};