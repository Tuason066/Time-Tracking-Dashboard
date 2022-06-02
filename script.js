const pullData = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();

  return data;
};

const customCard = ({ isDaily = true, isWeekly }) => {
  pullData().then((data) => {
    const cards = data
      .map((item) => {
        const url = `./images/icon-${item.title
          .replace(" ", "-")
          .toLowerCase()}.svg`;

        return `
                  <article class="card ${item.title
                    .replace(" ", "-")
                    .toLowerCase()}">
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
                              <h3 class="counts__current">${
                                isDaily
                                  ? item.timeframes.daily.current
                                  : isWeekly
                                  ? item.timeframes.weekly.current
                                  : item.timeframes.monthly.current
                              }hrs</h3>
                              <p class="counts__previous">Last Week - ${
                                item.timeframes.daily.previous
                              }hrs</p>
                          </div>
                      </div>
                  </article>
              `;
      })
      .join("");

    cardsContainer.innerHTML = cards;

    cardHightlight();
  });
};

document.addEventListener(
  "DOMContentLoaded",
  customCard({ isWeekly: true, isDaily: false })
);

const cardsContainer = document.querySelector(".cards-container");
const cardDetails = document.querySelectorAll(".card__details");
const profileButtonsContainer = document.querySelector(".profile__buttons");
pullData().then((data) => {
  let categories = [];

  data.forEach((dataItem) => {
    categories.push(...Object.getOwnPropertyNames(dataItem.timeframes));
  });

  const category = categories.reduce((acc, category) => {
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc;
  }, []);

  const categoryButtons = category
    .map((item) => {
      return `
                <button type="button" id="${item}" class="btn">${item}</button>
            `;
    })
    .join("");

  profileButtonsContainer.innerHTML = categoryButtons;

  const weeklyButton = profileButtonsContainer.querySelector("#weekly");
  weeklyButton.classList.add("active");

  const profileButtons = profileButtonsContainer.querySelectorAll(".btn");

  profileButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const button = e.currentTarget;
      const category = button.textContent.toLowerCase();

      profileButtons.forEach((btn) => {
        if (btn !== button) {
          btn.classList.remove("active");
        }
        button.classList.add("active");
      });

      if (category === "daily") {
        customCard({ isDaily: true, isWeekly: false });
      } else if (category === "weekly") {
        customCard({ isDaily: false, isWeekly: true });
      } else if (category === "monthly") {
        customCard({ isDaily: false, isWeekly: false });
      }
    });
  });
});

const cardHightlight = () => {
  const cardDetails = document.querySelectorAll(".card__details");

  cardDetails.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.classList.add("highlight");
    });
    item.addEventListener("mouseout", () => {
      item.classList.remove("highlight");
    });
  });
};
