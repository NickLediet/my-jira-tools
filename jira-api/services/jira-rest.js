const jiraax = require('./jira-axios');

async function getGroups() {
    let results = await jiraax.axiosGetJira('rest/api/2/groups/picker?query=Team');
    return results.data.groups.map(v => {
      return { name: v.name, description: v.name };
    });
}

async function getUsersForGroup(groupName) {
    let restCall = `rest/api/2/group/member?groupname=${encodeURI(groupName)}`;
    console.log(restCall);
    let results = await jiraax.axiosGetJira(restCall);

    return results.data.values.map(v => {
      return { key: v.key, name: v.name };
    });
}

async function getWorklog(issueKey){

    let restCall = `rest/api/2/issue/${issueKey}/worklog?`;
    console.log(restCall);
    let results = await jiraax.axiosGetJira(restCall);

    return results.data.worklogs.map(w => {
        return { author: w.author.key, issueId: w.issueId, timeSpentSeconds: w.timeSpentSeconds }
    });
}

module.exports = {
    getGroups:  getGroups,
    getUsersForGroup:  getUsersForGroup,
    getWorklog: getWorklog
}