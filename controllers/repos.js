const config = require('../config');
const ghGot = require('gh-got');

const repoInfo = async function() {
    const url = "/orgs/InMemoryCovid19/repos"
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

    //GET /repos/:owner/:repo
    const url = "/repos/InMemoryCovid19/StartHere/";

    try{
        var response = await ghGot(url, {
            headers: {
                Accept:'application/vnd.github.baptiste-preview+json'
            },
            json: {
                "owner": "InMemoryCovid19",
                "name": "Test",
                "description": "This is your first repository",
                "private": false
              },
            responseType: 'json',
            
            token:config.github_token });
        console.log(response.body);
        } catch(error){
            console.log('createRepo', error);
            console.log('createRepo', response);
        }
};