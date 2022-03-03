const overview = document.querySelector(".overview");
const username = "cbsumo305";

const repoList = document.querySelector(".repo-list");

const getMyData = async function () {
    const link = await fetch(`https://api.github.com/users/${username}`);
    const myData = await link.json();

    readMyData(myData);

//    console.log(repos)
}

const readMyData = function (data) {
    let userInfo = document.createElement("div.user-info");

    let str = `<figure><img alt="user avatar" src=${data.avatar_url} /></figure>`;
    str += `<div><p><strong>Name:</strong> ${data.name}</p>`;
    str += `<p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p>`
    str += `<p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`

    userInfo.innerHTML = str;
    overview.append(userInfo);
}

const getMyRepos = async function () {
    const link = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const myRepos = await link.json();

    console.log(myRepos);
    readMyRepos(myRepos);
}

const readMyRepos = function (repos) {
    repoList.innerHTML = "";
    for (let repo of repos) {
        //repoList
        let li = document.createElement("li.repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}


getMyData();
getMyRepos();


