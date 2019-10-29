var express = require('express');
var app = express();
var bp = require('body-parser');

var childProcess = require('child_process');

app.use(bp.json());

app.post("/github", (req, res, next) => {
	try {
		var sender = req.body.sender;
		var branch = req.body.ref;
		var repo = req.body.repository.name;

		console.log(`Push on branch ${repo}/${branch.substring(branch.length - 6)} by ${sender.login}`);

		if(branch.substring(branch.length - 6) === 'master') {
			deploy(repo, res);
		} else {
			return res.sendStatus(200);
		}
	} catch (err) {
		console.error(`CatchedError: ${err.message}`);
		return res.sendStatus(500);
	}
});

function deploy(repoName, res) {
	var currString = `/var/apps/charlesvigneault/webhooks/deploys/${repoName}.sh`;
	console.log(`Restarting ${repoName} with file ${currString}`);

	childProcess.exec(currString, function(err, stdout, stderr){
		if (err) {
			console.error(`ChildProcessError: ${err.message}`);
			return res.sendStatus(500);
		}
		console.log('Success.');
		return res.sendStatus(200);
	});
}

app.get("/github", (req, res, next) => {
	res.status(200).json({status: 'Running...'});	
});

app.listen(3003, () => {
	console.log(`Server started on port 3003...`);
});
