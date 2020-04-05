const config = require('../config');
const ghGot = require('gh-got');

const url = "/repos/TributeFromCovid-19/StartHere/pages";

const pagesInfo = async function() {
	
	try{
	const response = await ghGot(url, {token:config.github_token });
	return response.body;
	} catch (error){
		console.log('get', error)
	}
};

const previewEnable = async function(){
	try{
	const response = await ghGot.post(url, {
		headers: {
			Accept:'application/vnd.github.switcheroo-preview+json'
		},
		json: {
			"source": {
				"branch": "master",
				"path": "/"
		  }
		},
		responseType: 'json',
		
		token:config.github_token });
		return response;
	} catch(error){
		console.log('post', error);
	}
};

exports.enablePages = async function(){
//pagesInfo status values:
  //null: The site has yet to be built.
  // queued: The build has been requested but not yet begun.
  // building:The build is in progress.
  // built: The site has been built.
  // errored: Indicates an error occurred during the build.
  try{
    const {status, html_url} = await pagesInfo();

    if (status === null || status === "null"){
      try{
		await previewEnable();
		return {statusCode: 204, status: "starting build", html_url: null}
      } catch (error){
        console.log('routes enablePages', error)
      }
    } else if(status === "queued" || status === "building"){
	return {statusCode: 204, status: "starting build", html_url: null}
      // TODO Change to progress bar, got supports
    } else if(status === "errored"){
		return {statusCode: 500, status: "error in build, contact dev", html_url: null}
    // TODO Change to actual error
    } else {
	return {statusCode: 200, status: status, html_url: html_url}
    }
  } catch (error){
    console.log('catch pagesInfo', error);
  }

};