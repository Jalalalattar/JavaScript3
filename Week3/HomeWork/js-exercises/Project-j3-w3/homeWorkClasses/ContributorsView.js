'use strict';

{
    const { createAndAppend } = window.Util;

    class ContributorsView {
        constructor(container) {
            this.container = container;
        }

        update(state) {
            if (!state.error) {
                this.render(state.contributors);
            }
        }

        /**
         * Renders the list of contributors
         * @param {Object[]} contributors An array of contributor objects
         */
        render(contributors) {

            this.container.innerHTML = '';

            const ulContributors = createAndAppend('ul', this.container, {
                name: 'ul-cont',
                class: 'ul-contributors'
            });

            contributors.forEach(contributor => {    const li = createAndAppend('li', ulContributors, {

                class: 'li-contributors'
            })

            const parCont = createAndAppend('p', li, {
                text: contributor.contributions,
                class: 'li-parCont'
            })

            const parLogin = createAndAppend('p', li, {
                text: contributor.login,
                class: 'li-par'
            })

            const img = createAndAppend('img', li, {
                src: contributor.avatar_url,
            })
        })
    }
}

window.ContributorsView = ContributorsView;
} 