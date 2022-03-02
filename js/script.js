const overview = document.querySelector(".overview");
const username = "cbsumo305";

const getMyRepos = async function () {
    var link = await fetch(`https://api.github.com/users/${username}`);
    var repos = await link.json();

    //return repos;

    readData(repos);

    console.log(repos)
}

const readData = function (myRepos) {
    let userInfo = document.createElement("div.user-info");

    let str = `<figure><img alt="user avatar" src=${myRepos.avatar_url} /></figure>`;
    str += `<div><p><strong>Name:</strong> ${myRepos.name}</p>`;
    str += `<p><strong>Bio:</strong> ${myRepos.bio}</p><p><strong>Location:</strong> ${myRepos.location}</p>`
    str += `<p><strong>Number of public repos:</strong> ${myRepos.public_repos}</p></div>`

    userInfo.innerHTML = str;
    overview.append(userInfo);
}


getMyRepos();


