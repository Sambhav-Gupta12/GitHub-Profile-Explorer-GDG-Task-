const userName = document.getElementById("userName");
const searchbtn = document.getElementById("searchbtn");
const profileDiv = document.querySelector(".profile");
const reposDiv = document.querySelector(".repos");

async function fetchUser(username) {
    const response = await fetch(` https://api.github.com/users/${username}`);

    if (!response.ok){
        throw new Error("User not found");
    }

    return response.json();
}

async function fetchRepos(userRepos) {
    const response = await fetch(` https://api.github.com/users/${userRepos}/repos?sort=updated&per_page=6`);

    if (!response.ok){
        throw new Error("Failed to fetch repositories");
    }

    return response.json();
}

function displayUser(userData){
    profileDiv.style.display = "block"
    profileDiv.innerHTML = `<div class="avatar">
                <img src="${userData.avatar_url}"
                    alt="">

                <div class="details">
                    <div class="name">${userData.name}</div>
                    <div class="bio">${userData.bio}</div>
                    <div class="follow">Followers: ${userData.followers} | Following: ${userData.following} | Repositories: ${userData.public_repos}</div>
                </div>
            </div>`
}

 function displayRepos(repoData){

     reposDiv.innerHTML = repoData.map(repo =>
                `<div class="repo">
                 <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repoName">${repo.name}</a>
                 <div class="des">${repo.description}
                 </div>
                 <div class="lang">${repo.language}</div>
                 <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="link">Visit</a>
             </div>`
    ).join("")
 }

searchbtn.addEventListener("click", async () => {

    const userNameInput = userName.value.trim();

    const user = await fetchUser(userNameInput);
    console.log(user);

    const repos = await fetchRepos(userNameInput);
    console.log(repos);

    displayUser(user);
    displayRepos(repos);
})