const apikey = 'e6fc87fd91614bf8897db8d876838dc6'
var a = 5;
const blogContainer = document.getElementById('Blog-Container')

async function fetchRandomNews() {

    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?q=india&pageSize=17&apiKey=${apikey}`
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
        title.textContent = element.title
        const description = document.createElement("p")
        description.textContent = element.description

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)

        blogContainer.appendChild(blogCard)
    });
}

(async ()=> {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
}) ();