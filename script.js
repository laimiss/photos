const COUNT = 30

function getToken() {
    const tokenField = document.getElementById("token")
    return tokenField.value
}

function getQuery() {
    const searchField = document.getElementById("search")
    return searchField.value
}
function getUrl(token, query, orientation) {

    if (query) {
        return `https://api.unsplash.com/search/photos/?client_id=${token}&query=${query}&orientation=${orientation}&per_page=${COUNT}`
    } else {
        return `https://api.unsplash.com/photos/random/?client_id=${token}&query=${query}&orientation=${orientation}&count=${COUNT}`
    }
}

async function getContent(url) {
    return fetch(url).then(r => r.json()).then(r => r)
}

function updateGallery(photos) {
    const gallery = document.getElementById("gallery")
    gallery.replaceChildren()

    photos.forEach(photo => {
        const thumb = document.createElement('div')
        thumb.classList.add("thumb")

        const image = document.createElement('img')
        image.classList.add("img-thumbnail")
        image.src = photo.urls.small

        thumb.appendChild(image)
        gallery.appendChild(thumb)
    });
}
document.getElementById("ieskoti").addEventListener("click",
    async () => {

        const token = getToken()
        if (!token) {
            console.warn("Token is not set")
            return
        }
        const query = getQuery()
        const orientation = document.getElementById("portrait").checked ? "portrait" : "landscape"

        // console.log(getUrl(token, query, orientation))

        let results = await getContent(getUrl(token, query, orientation))
        let photos = null
        if (results instanceof Array) {
            photos = results
        } else {
            photos = results.results
        }

        // console.log(photos)
        updateGallery(photos)

    })