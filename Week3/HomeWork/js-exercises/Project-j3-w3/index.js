'use strict';
{
  
  //  window.onload = () => main(HYF_REPOS_URL_ERROR); // to get ERROR
  //  const HYF_REPOS_URL_ERROR ='https://api.github.com/orgsX/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
  const HYF_REPOS_URL ='https://api.github.com/orgs/HackYourFuture/repos?per_page=100';


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

  function renderRepoDetails(repo, table) {
    const titles = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    const keys = ['name', 'description', 'forks_count', 'updated_at'];
    for (let i = 0; i < titles.length; i++) {
      const tr = createAndAppend('tr', table);
      createAndAppend('th', tr, { text: titles[i] });
      if (i === 0) {
        const td = createAndAppend('td', tr);
        createAndAppend('a', td, {
          href: repo.html_url,
          text: repo.name,
          target: 'blank_',
        });
      } else {
        createAndAppend('td', tr, { text: repo[keys[i]] });
      }
    }
  }

  // function listOfData(contributors) {
  //   contributors.forEach(contributor => {
  //     const divCont = createAndAppend('div', container, {
  //       class: 'userContributors',
  //     });
  //     const img = createAndAppend('img', divCont);
  //     img.src = contributor.avatar_url;

  //     const pName = createAndAppend('p', divCont);

  //     createAndAppend('a', pName, {
  //       text: contributor.login,
  //       href: contributor.html_url,
  //       target:'_blank',
  //     })
  //     const pContributes = createAndAppend('p', divCont, {
  //       class: 'contributes',
  //     });
      
  //     createAndAppend('span', pContributes, {
  //       text:contributor.contributions
  //     });
  //   });
  // }

  // async function fetchJson(){
  //   const response = await fetch(url);
  //   const json = await response.json()
  //   return json;
  // }

  // async function renderContributors(url, container) {
  //   try {
  //     let json = await fetchJson()
  //     listOfData(json)
     
  //   }
  //   catch (err) {
  //     createAndAppend('div', container, {
  //       text: err.message,
  //       class: 'alert-error',
  //     });
  //   };
    
  // }
  async function renderContributors(url, container) {
    try {
      const response = await fetch(url);
      const repos = await response.json()
      
      // it's only works if you add .then :(  what I have to do >>?
      .then(contributors => {
        contributors.forEach(contributor => {
          const divCont = createAndAppend('div', container, {
            class: 'userContributors',
          });
          const img = createAndAppend('img', divCont);
          img.src = contributor.avatar_url;

          const pName = createAndAppend('p', divCont);

          createAndAppend('a', pName, {
            text: contributor.login,
            href: contributor.html_url,
            target:'_blank',
          })
          const pContributes = createAndAppend('p', divCont, {
            class: 'contributes',
          });
          
          createAndAppend('span', pContributes, {
            text:contributor.contributions
          });
        });
      })
    }
    catch (err) {
      createAndAppend('div', container, {
        text: err.message,
        class: 'alert-error',
      });
    };
    
  }

  function renderContents(repo, table, contributorsContainer) {
    table.innerText = '';
    contributorsContainer.innerText = '';

    createAndAppend('h2', contributorsContainer, {
      text: 'Contributors',
    });

    const divContributors = createAndAppend('div', contributorsContainer, {
      id: 'contTable',
    });

    renderRepoDetails(repo, table);
    renderContributors(repo.contributors_url, divContributors);
  }

  const root = document.getElementById('root');

  async function main(url) {
    try {
      const reposContainer = document.getElementById('repos');
      const contributorsContainer = document.getElementById('contributors');
      const select = document.querySelector('#repos-select');
      const table = createAndAppend('table', reposContainer);

      const response = await fetch(url);
      const repos = await response.json();
      
          repos.sort((a, b) => {
              return a.name.localeCompare(b.name);
            })
            .forEach((repo, index) => {
              createAndAppend('option', select, {
                value: index,
                text: repo.name,
              });
            });

          select.addEventListener('change', () => {
            renderContents(repos[select.value], table, contributorsContainer);
          });
    }
    catch (err) {
      createAndAppend('p', root, {
        text: err.message,
        class: 'alert-error',
      });
    };
  }

}
