const buttons = document.querySelectorAll(".btn")

window.addEventListener("DOMContentLoaded", filterData("daily"))

buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const element = e.currentTarget
        const id = element.getAttribute("data-id")
        buttons.forEach(item => {
            if(item !== element) item.classList.remove("active")
        })
        element.classList.add("active")
        filterData(id)
    })
})

async function fetchData(url){
    let fetchData = fetch(url)
    let response = await fetchData
    if(!response.ok) return
    let data = await response.json()
    return data;
}

async function filterData(value) {
    const activities = document.querySelector(".activities-wrapper")
    let data =  await fetchData('data.json')
    let html = ""
    data.forEach(e  => {
        html += `
        <div class="card">
          <div class="card-info">
            <div class="card-header">
              <h2>${e.title}</h2>
              <a href="#"><img src="./images/icon-ellipsis.svg" alt=""></a>
            </div>
            <div class="card-data">
              <h1><span class="hours">${e.timeframes[value].current}</span> hrs</h1>
              <p>Last Week - ${e.timeframes[value].previous}hrs</p>
            </div>
          </div>
        </div>
      `
    })
    activities.innerHTML = html
}

