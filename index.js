var GitHubApi = require("github");
var github = new GitHubApi()

github.authenticate({
    type: "basic",
    username: "",
    password: "" 
});

github.pullRequests.getAll({
    owner: "apache",
    repo: "spark",
    state: "all"
}, getPullRequest);

console.log("created_at\tnumber\ttitle\tuser");
function getPullRequest(err, res) {
    if (err) {
        console.log(err);
        return false;
    }

    res.data.forEach(function(element) {
        var date = element.created_at.replace("T", " ").replace("Z", "");
        console.log(`${date}\t${element.number}\t${element.title}\t${element.user.login}`);
    }, this);

    if (github.hasNextPage(res)) {
        github.getNextPage(res, getPullRequest);
    } 
}
