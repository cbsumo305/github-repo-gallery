const overview = document.querySelector(".overview");
const username = "cbsumo305";

const repoList = document.querySelector(".repo-list");
const sctRepos = document.querySelector("section.repos");
const sctRepoData = document.querySelector("section.repo-data");

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

    readMyRepos(myRepos);
}

const readMyRepos = function (repos) {
    repoList.innerHTML = "";
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}

const getThisRepo = async function (name) {
    const link = await fetch(`https://api.github.com/repos/${username}/${name}`);
    const thisRepo = await link.json();
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${name}/languages`);
    const languageData = await fetchLanguages.json();

    let languages = [];
    for (let key in languageData) {
        languages.push(key);
    }

    displayThisRepo(thisRepo, languages);
}

const displayThisRepo = function (repoInfo, languages) {
    sctRepoData.innerHTML = "";
    let div = document.createElement("div");
    let str = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    div.innerHTML = str;
    sctRepos.classList.add("hide");
    sctRepoData.classList.remove("hide");
    sctRepoData.append(div);

};


getMyData();
getMyRepos();


repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoInfo = e.target.innerText;
        
        getThisRepo(repoInfo)
    }
})




