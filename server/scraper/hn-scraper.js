const puppeteer = require("puppeteer");

const hackerNewsUrl = "https://news.ycombinator.com/";

async function scrapeHackerNews() {
  const result = [];
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    for (let pageCounter = 1; pageCounter <= 3; pageCounter++) {
      await page.goto(`${hackerNewsUrl}?p=${pageCounter}`, {
        waitUntil: "domcontentloaded",
      });

      const selectedElements = await page.$$(".athing");

      if (selectedElements.length > 0) {
        // Extract id and href values for each element
        const data = await Promise.all(
          selectedElements.map(async (element) => {
            // post id
            const id = await page.evaluate((el) => el.id, element);

            // post href
            const link = await page.evaluate(
              (el) => el.querySelector(".titleline a").href,
              element
            );

            // post title
            const title = await page.evaluate(
              (el) => el.querySelector(".titleline a").textContent,
              element
            );

            //   post hnUrl
            const hnUrl = `https://news.ycombinator.com/item?id=${id}`;

            //   post score
            const upvotes = await page.evaluate((el) => {
              const scoreElement =
                el.nextElementSibling.querySelector(".score");
              return scoreElement
                ? parseInt(scoreElement.textContent.split(" ")[0])
                : 0;
            }, element);

            // post age
            const postedOn = await page.evaluate((el) => {
              const ageElement = el.nextElementSibling.querySelector(".age");
              if (ageElement) {
                const dateString = ageElement.getAttribute("title");
                const dateObject = new Date(dateString);
                return dateObject.getTime();
              }
              return null;
            }, element);

            return { id, link, hnUrl, upvotes, age: postedOn, title };
          })
        );

        result.push({ page: pageCounter, data });
      } else {
        console.error("No elements found with the given selector");
      }
    }
    await browser.close();
  } catch (error) {
    console.error("Error scraping Hacker News:", error.message);
  }

  return result;
}

module.exports = { scrapeHackerNews };
