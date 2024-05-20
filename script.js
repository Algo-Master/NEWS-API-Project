const apikey = 'e6fc87fd91614bf8897db8d876838dc6'

const blogContainer = document.getElementById('Blog-Container')

const searchField = document.getElementById('Search-Input')
const searchButton = document.getElementById('Search-Button')

async function fetchRandomNews() {

    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?q=india&pageSize=31&apiKey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data.articles;
    }
    catch(error) {
        console.error("Error fetching Random News", error)
        return []
    }
}

async function fetchNews(query) {

    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=31&apiKey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data.articles;
    }
    catch(error) {
        console.error("Error fetching News", error)
        return []
    }
}

searchButton.addEventListener("click", async () => {

    const query = searchField.value.trim()
    console.log(query)

    if(query === "") {
        console.log("Fill up the Search Field to search")
        return;
    }
    const articles = await fetchNews(query);
    displayBlogs(articles);
})

function displayBlogs(articles) {
    blogContainer.innerHTML = ""
    articles.forEach(element => {

        const blogCard = document.createElement("div")
        blogCard.classList.add("Blog-Card")

        const img = document.createElement("img")
        if(element.urlToImage === null) return;
        img.src = element.urlToImage
        img.alt = element.title

        const title = document.createElement("h2")
        title.textContent = element.title.length > 30 ? element.title.slice(0, 30) + "..." : element.title;
        const description = document.createElement("p")
        description.textContent = element.description.length > 120 ? element.description.slice(0, 120) + "..." : element.description;

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click", () => {
            window.open(element.url, "__blank");
        })

        blogContainer.appendChild(blogCard)
    });
}

(async ()=> {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
}) ();