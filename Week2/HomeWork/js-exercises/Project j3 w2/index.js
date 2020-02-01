'use strict';
{
    //  window.onload = () => main(HYF_REPOS_URL_ERROR); // to get ERROR
    //  const HYF_REPOS_URL_ERROR ='https://api.github.com/orgsX/HackYourFuture/repos?per_page=100';

    window.onload = () => main(HYF_REPOS_URL);
    const HYF_REPOS_URL ='https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    const root = document.querySelector('#root');

    function fetchJSON(url, cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
            cb(null, xhr.response);
            } else {
            cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
            }
        };
        xhr.onerror = () => cb(new Error('Network request failed'));
        xhr.send();
    }

    function createAndAppend(name, parent, options = {}) {
    const el = document.createElement(name);
    parent.appendChild(el);
    Object.entries(options).forEach(([key, value]) => {
        if (key === 'text') {
        el.textContent = value;
        } else {
        el.setAttribute(key, value);
        }
    });
    return el;
    }

    function repoDetails(repo, ul) {
        const li = createAndAppend('li', ul);
        const table = createAndAppend('table', li);
        const titles = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
        const dataKeys = ['name', 'description', 'forks', 'updated_at'];
    
        for (let i = 0; i < titles.length; ++i) {
    
          const tr = createAndAppend('tr', table);
          createAndAppend('th', tr, { text: titles[i] });
          if (i > 0 ){
            createAndAppend('td', tr, { text: repo[dataKeys[i]] });
          } else {
            const td = createAndAppend('td', tr);
            createAndAppend('a', td, {
              href: repo.html_url,
              text: repo.name,
              target: '_blank',
            });
          }
        }
    }
    const select = document.querySelector('header select');
    const repoContainer = document.querySelector('.repo-container');
    const contributorsContainer = document.querySelector('.contributors-container');

    function main(url) {
        
        fetchJSON(url, (error, repos) => {
            if (error) {
                createAndAppend('div', root, { text: error.message,class: 'alert-error'});
            return;
            }
            const ulRepo = createAndAppend('ul', repoContainer);
            const ulCont = createAndAppend('ul', contributorsContainer);

            repos.sort((curRepo, nextRepo) => curRepo.name.localeCompare(nextRepo.name))
            .forEach(repo => {
                let repoName = repo.name.toLowerCase();
                createAndAppend('option', select, {
                value: repo.name,
                text: repoName,
                });
            });
            select.addEventListener('change', () => {
                const urlApi = `https://api.github.com/repos/HackYourFuture/${select.value}/contributors`;
                fetch(urlApi)
                .then(res => res.json())
                .then(data => {
                ulCont.innerHTML = '';
                renderContributor(data, ulCont);
                })
                .catch(err => console.error(err));
                ulRepo.innerHTML = '';
                repos.forEach(repo => {
                    if (repo.name === select.value) {
                    repoDetails(repo, ulRepo);
                    }
                });
            });
        });
    }
    function renderContributor(data, ulCont) {
        for (let i = 0; i < data.length; ++i) {
            const li = createAndAppend('li', ulCont);
            const table = createAndAppend('table', li);
            const tr = createAndAppend('tr', table);
            const th = createAndAppend('th', tr);
            createAndAppend('img', th, {src: data[i].avatar_url});
            createAndAppend('a', th, {text: data[i].login, href: data[i].html_url,target: '_blank'});
            createAndAppend('td', tr, {text: data[i].contributions, class: 'smallNumbers',});
        }
    }


}