const pullData = async () => {
    const response = await fetch('./data.json');
    const data = await response.json();

    return data;
};

const dailyCards = () => {
    pullData()
    .then(data => {
        const cards = data.map(item => {

            const url = `./images/icon-${item.title.replace(' ', '-').toLowerCase()}.svg`;

            return `
                <article class="card ${item.title.replace(' ', '-').toLowerCase()}">
                    <img src="${url}" alt="${item.title}" />
                    <div class="card__details">
                        <header class="card__header">
                            <h4>${item.title}</h4>
                            <button type="button" class="card__button btn">
                            <div class="card__ellipsis"></div>
                            <div class="card__ellipsis"></div>
                            <div class="card__ellipsis"></div>
                            </button>
                        </header>
                        <div class="counts">
                            <h3 class="counts__current">${item.timeframes.daily.current}hrs</h3>
                            <p class="counts__previous">Last Week - ${item.timeframes.daily.previous}hrs</p>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        cardsContainer.innerHTML = cards;

        cardHightlight();
    });
};

const weeklyCards = () => {
    pullData()
    .then(data => {
        const cards = data.map(item => {

            const url = `./images/icon-${item.title.replace(' ', '-').toLowerCase()}.svg`;

            return `
                <article class="card ${item.title.replace(' ', '-').toLowerCase()}">
                    <img src="${url}" alt="${item.title}" />
                    <div class="card__details">
                        <header class="card__header">
                            <h4>${item.title}</h4>
                            <button type="button" class="card__button btn">
                            <div class="card__ellipsis"></div>
                            <div class="card__ellipsis"></div>
                            <div class="card__ellipsis"></div>
                            </button>
                        </header>
                        <div class="counts">
                            <h3 class="counts__current">${item.timeframes.weekly.current}hrs</h3>
                            <p class="counts__previous">Last Week - ${item.timeframes.weekly.previous}hrs</p>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        cardsContainer.innerHTML = cards;

        cardHightlight();
    });
};

const monthlyCards = () => {
    pullData()
    .then(data => {
        const cards = data.map(item => {

            const url = `./images/icon-${item.title.replace(' ', '-').toLowerCase()}.svg`;

            return `
                <article class="card ${item.title.replace(' ', '-').toLowerCase()}">
                    <img src="${url}" alt="${item.title}" />
                    <div class="card__details">
                        <header class="card__header">
                            <h4>${item.title}</h4>
                            <button type="button" class="card__button btn">
                            <div class="card__ellipsis"></div>
                            <div class="card__ellipsis"></div>
                            <div class="card__ellipsis"></div>
                            </button>
                        </header>
                        <div class="counts">
                            <h3 class="counts__current">${item.timeframes.monthly.current}hrs</h3>
                            <p class="counts__previous">Last Week - ${item.timeframes.monthly.previous}hrs</p>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        cardsContainer.innerHTML = cards;
        cardHightlight();
    });
};

document.addEventListener('DOMContentLoaded', weeklyCards());

const cardsContainer = document.querySelector('.cards-container');
const cardDetails = document.querySelectorAll('.card__details');
const profileButtonsContainer = document.querySelector  ('.profile__buttons');
pullData()
    .then(data => {

        let categories = [];

        data.forEach((dataItem) => {
            categories.push(...Object.getOwnPropertyNames(dataItem.timeframes));
        })

        const category = categories.reduce((acc, category) => {
            if(!acc.includes(category)) {
                acc.push(category);
            }
            return acc;
        }, []);

        const categoryButtons = category.map(item => {
            return `
                <button type="button" id="${item}" class="btn">${item}</button>
            `;
        }).join('');

        profileButtonsContainer.innerHTML = categoryButtons;

        const weeklyButton = profileButtonsContainer.querySelector('#weekly');
        weeklyButton.classList.add('active');

        const profileButtons = profileButtonsContainer.querySelectorAll('.btn');

        profileButtons.forEach(button => {
            button.addEventListener('click', e => {
                const button = e.currentTarget;
                const category = button.textContent.toLowerCase();
        
                profileButtons.forEach(btn => {
                    if(btn !== button) {
                        btn.classList.remove('active');
                    };
                    button.classList.add('active');
                });
        
                if(category === 'daily') {
                    dailyCards();
                } else if(category === 'weekly') {
                    weeklyCards();
                } else if(category === 'monthly') {
                    monthlyCards();
                };
            });
        });
    });



const cardHightlight = () => {
    const cardDetails = document.querySelectorAll('.card__details');

    cardDetails.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('highlight');
        });
        item.addEventListener('mouseout', () => {
            item.classList.remove('highlight');
        });
    });
};