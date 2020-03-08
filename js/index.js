const msg = document.querySelector(".msg")


const sourceUrl = document.querySelector('#sourceUrl')
const baseUrl = document.querySelector('#baseUrl')
const userInfo  = document.querySelector('.bar')
const userData  = document.querySelector('#user-data')
const addUrlBtn  = document.querySelector('#create-url')
const customName = document.querySelector('#custom-name')
const createLink = document.querySelector('#create-link')
const closes = document.querySelectorAll('.close')
const clicks = document.querySelectorAll('.cleek')


const base_url = "https://sandboxapi.fsi.ng/nibss"


//MOBILE VARIABLES m-link_details
const linkDetailsMobile = document.querySelector('#m-link-details')
const dateCreatedMobile = document.querySelector('#date-created-mobile')
const linkTitleMobile = document.querySelector('#link-title-mobile')
const originalLinkMobile = document.querySelector('#original-link-mobile')
const shortCodeMobile = document.querySelector('#short-mobile')

let userDetails = JSON.parse(localStorage.getItem('userInfo'))
if( userDetails == "empty" ) {
    self.location = "index.html"
} else {
    currentUserName.innerHTML = userDetails.name
    currentUserEmail.innerHTML = userDetails.email
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector("#chart_container")

    //FETCH URLS
    fetchUrl()

    setTimeout(() => {
        let links = JSON.parse(localStorage.getItem('links'))

        if(((Object.keys(links.links).length)  ==  0) && !(getComputedStyle(welcome, null).display === "none")) {
            // main_right.style.display = "none"
            welcome_mobile.style.display = "none"
        } 
        else if (((Object.keys(links.links).length)  ==  0) && (getComputedStyle(welcome, null).display === "none")) {
            welcome_mobile.style.display = "block"
    
        }
        else {
            if (!(getComputedStyle(welcome, null).display === "none")) {
                main_right.style.display = "none"
            }
            welcome.style.display = "none"
            welcome_mobile.style.display = "none"
            populate_link_on_page(links)
        }
        let totalData = topChatData()
        document.querySelector('.total-cleecks').innerText = totalData.totalClick
        let type = "line"
        let color = ""

        //INITIALIZE HEADER CHART GRAPH
        chart(totalData.labels, totalData.data, container, type, color)
        link_action()
    }, 1000)
    

         
})

// CLOSE MODALS
for(close of closes) {
    close.addEventListener('click', function() {
        let closeModal = this.parentNode.parentNode.parentNode
        closeModal.classList.toggle("hide")

        if(getComputedStyle(main_right, null).display != "none") {
        document.body.classList.toggle("scroll")
        }

    })
}

// TRIGER COPY EVENT
for(copy of copy_btn) {
    copy.addEventListener('click', function() {
        let copy_link = this.parentElement.parentElement.firstElementChild
        let shortLink = copy_link.innerText
        copy_link.style.color = 'grey'
        copyToClipboard(shortLink)
        setTimeout(() => {
            copy_link.style.color = 'rgb(250, 137, 137)'
        }, 300)

        
        
    })
}

// TRIGER SHARE EVENT
for(share of share_btn) {
    share.addEventListener('click', function() {
        share_modal.classList.toggle("hide");

        if(getComputedStyle(main_right, null).display != "none") {
        document.body.classList.toggle("scroll")
        }    
    })
}


// DISPLAY CREATE NEW URL FORM
addUrlBtn.addEventListener('click', () => {
    createLink.classList.toggle("hide");

 if(getComputedStyle(main_right, null).display != "none") {
        document.body.classList.toggle("scroll")
    }
})

// DISPLAY CURRENT USER INFORMATION
userInfo.addEventListener('click', () => {
    userData.classList.toggle("hide")
    if(getComputedStyle(main_right, null).display != "none") {
        document.body.classList.toggle("scroll")
    }
})

// DISPLAY EDIT URL FORM
for(edit of edit_btn) {
    edit.addEventListener('click', () => {
        customName.classList.toggle("hide");
        const create_time = document.querySelector('#creat-time')
        const current_link_title = document.querySelector('#current-link-title')
        const current_link_title_mobile = document.querySelector('#link-title-mobile')
        const short_link_mobile = document.querySelector('#short-mobile')
        const link_edit_title = document.querySelector('#link-title')
    
    
        if(getComputedStyle(main_right, null).display != "none") {
            document.body.classList.toggle("scroll")
            create_time.innerText = dateCreatedRight.innerText
            current_link_title.innerText = linkTitleRight.innerText
            link_edit_title.value  = linkTitleRight.innerText
            link_to_edit.innerText = short_link.innerText
        } else {
            link_to_edit.innerText = short_link_mobile.innerText
            current_link_title.innerText = current_link_title_mobile.innerText
            link_edit_title.value  = current_link_title_mobile.innerText
            console.log(link_edit_title.value)
        }

        
    
    
    })
}


// EDIT URL
custom_url_btn.addEventListener('click', async () => {
    const link_title = document.querySelector('#link-title')
    const unique_name = document.querySelector('#unique-name')
    let url_id = unique_url_id.innerText
    let url_title = link_title.value
    let custom_name= unique_name.value
    let userId = userDetails.userId

    if (url_title === "") {
        alert("You have not specified a title for your link")
    } else if (!isNaN(url_title)) {
        alert("Your link title cannot be a number")
    } else if (url_id === "") {
        alert("You have not selected a link to be modified, please select a link and try again")
    } else if (custom_name === url_id) {
        let concent = confirm(`Are you sure you want the right part of your URL to remain. ${url_id} \n Click OK to continue or CANCEL to modify the right part of your URL`)
        if (concent) {
            edit_url(url_id, url_title, custom_name)
        } else {
            unique_name.focus()
        }
    } else {

        let concent2 = confirm(`Are you sure you want to edit the title and right part of your URL`)
        if (concent2) {
            confirm_customName(userId, custom_name, url_id, url_title)
        } else {
            unique_name.focus()
        }

    }    
})

// GET ANALYSIS DATA FOR BOTTOM CHART
const chatData = (linkId) => {
    let analysis = {
        labels: [],
        data: []
    }
    
    analyse = JSON.parse(localStorage.getItem('links'))

    for(item of analyse.analytics) {
        if (item.urlId === linkId) {
            analysis.labels.push(item.dateClicked)
            analysis.data.push(item.numOfClicks)
        }

    };
    return analysis
}

// GET ANALYSIS DATA FOR TOP CHART
const topChatData = (linkId) => {
    let analysis = {
        labels: [],
        data: [],
        totalClick: 0
    }

    let 
    
    analyse = JSON.parse(localStorage.getItem('links'))

    for(item of analyse.analytics) {
        
        analysis.labels.push(item.dateClicked)
        analysis.data.push(item.numOfClicks)
        analysis.totalClick += item.numOfClicks

    }

    return analysis
}

// CREATE NEW URL
const shortenUrl = () => {
    let userData = JSON.parse(localStorage.getItem('userInfo'))

    if(sourceUrl.value === "") {
        alert("Please Paste the long URL to be shortened")
    } else {
        const create_btn = document.querySelector("#create_link")
        create_btn.innerHTML = `<img src="images/processing.gif" alt="" >`
        create_btn.style.backgroundColor = "grey"
        create_btn.style.cursor = "disabled"
        let url = `${base_url}add_link`
        let values = {
            originalUrl: sourceUrl.value,
            baseUrl: baseUrl.value,
            userId: userData.userId
        }
        const fetchData  = {
            method: 'post',
            body: JSON.stringify(values),
            headers: {"Content-Type": "application/json"}
        }
        fetch(url, fetchData)
            .then(resp => {
                if(resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject(resp.json())
                }
            })
            .then(data => {
                fetchUrl()
                create_btn.innerHTML = `SUBMIT`
                create_btn.style.backgroundColor = "purple"
                create_btn.style.cursor = "pointer"


                createLink.classList.toggle("hide");
                customName.classList.toggle("hide");
                alert("URL added successfully")
                sourceUrl.value = ""

                short_code.value = data.urlId
                link_to_edit.innerText = data.url
                unique_url_id.innerText = data.urlId

            })
            .catch(error => {
                create_btn.innerHTML = `SUBMIT`
                create_btn.style.backgroundColor = "purple"
                create_btn.style.cursor = "pointer"

                console.log(error.object)
            })
    }
}


// FETCH URL
const fetchUrl = () => {

    let userData = JSON.parse(localStorage.getItem('userInfo'))
    let userId = userData.userId

    let url = `${base_url}fetch_links/${userId}`

    const fetchData  = {
        method: 'get',
    }
    fetch(url, fetchData)
        .then(resp => {
            if(resp.ok) {
                return resp.json()
            } else {
                return Promise.reject("Oops!!!")
            }
        })
        .then(data => {
            localStorage.setItem("links", JSON.stringify(data))
            let links = JSON.parse(localStorage.getItem('links'))
            populate_link_on_page(links)
        })
        .catch(error => {
            console.log(error)
        })

}


// CHART FUNCTION
const chart = (label = [], data = [], chartCountainer, type, color) => {
    chartCountainer.getContext('2d')
    let linkChart = new Chart(chartCountainer, {
        type: type, // pie, doughnut, horizontalBar, line, radar, polaarArea
        data: {
            labels: label,
            datasets: [{
                label: 'Link frequency',
                data: data,
                //backgroundColor: 'green'
                backgroundColor: color,
                width: 10
            }]
        },
        options: {
            title: {
                display: true,
                text: 'The Frequency of Clicks Per Day',
                fontSize: 20,
                fontColor: 'whitesmoke'
            },

            legend: {
                display: false
            },

            layout: {
                padding: {
                    top:10,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }

            
        }

    })
}

//FUCNTION EDIT URL
const edit_url = (url_id, url_title, custom_name) => {
    custom_url_btn.innerHTML = `<img src="images/processing.gif" alt="" >`
    custom_url_btn.style.backgroundColor = "grey"
    let url = `${base_url}update_url_details`
            let data = {
                urlId: url_id,
                customName: custom_name,
                urlTitle:  url_title
            }

            console.log(data)
    
            let fetch_data = {
                method: 'put',
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            }

            fetch(url, fetch_data)
                .then(resp => {
                    if(resp.ok) {
                        return resp.json()
                    } else {
                        return Promise.reject("Error connecting to server")
                    }
                })
                .then(data => {
                    custom_url_btn.innerHTML = `Submit`
                    custom_url_btn.style.backgroundColor = "purple"
                    if (data === "taken") {
                        alert("Custom Name already taken")
                    } else {
                        location.reload()
                    }
                })
                .catch(error => {
                    custom_url_btn.innerHTML = `Submit`
                    custom_url_btn.style.backgroundColor = "purple"
                    console.log("Error: " + error)
                })
}

//FUCNTION CONFIRM CUSTOM NAME
const confirm_customName = (user_id, custom_name, url_id, url_title) => {
    custom_url_btn.innerHTML = `<img src="images/processing.gif" alt="" >`
    custom_url_btn.style.backgroundColor = "grey"
    custom_url_btn.style.border = "none"
    let url = `${base_url}confirm_customName`
    let data = {
        userId: user_id,
        customName: custom_name,
    }

    let fetch_data = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }

    fetch(url, fetch_data)
        .then(resp => {
            if(resp.ok) {
                return resp.json()
            } else {
                return Promise.reject("Error connecting to server")
            }
        })
        .then(data => {
            custom_url_btn.innerHTML = `Submit`
            custom_url_btn.style.backgroundColor = "purple"
            custom_url_btn.style.border = "none"
            if (data === "Taken") {
                alert("Custom name already Taken")
            } else {
                console.log(data)
                edit_url(url_id, url_title, custom_name)
            }
        })
        .catch(error => {
            custom_url_btn.innerHTML = `Submit`
            custom_url_btn.style.backgroundColor = "purple"
            console.log("Error: " + error)
        })
}

//FUNCTION POPULATE LINKS ON PAGE
const populate_link_on_page = (links) => {
    let linkCount = 0
    let url = links.links
    linkContainer.innerHTML = "<p class='num-of-links'>0 Links</p>"

    for (let i = url.length - 1; i>=0; i--) {
        let linkDiv = document.createElement("div")
        let link_title

        if (url[i].linkTitle === null) {
            link_title = url[i].originalUrl
        } else {
            link_title = url[i].linkTitle
        }

        linkCount++

        
        linkDiv.innerHTML = `
            <div class="link-holder">
                <span class="code" id="code">${url[i].urlCode}</span>
                <span class="code" id="cus">${url[i].customName}</span>
                <p class="date-created-left">${url[i].dateCreated}</p>
                <p class="link-title-left">${link_title}</p>
                <div class="short-link-left">
                    <span class="short-url">${url[i].shortUrl}</span>
                    <p class="count"><span class="cleek">${url[i].numOfClicks }</span> <i class="fa fa-bar-chart" aria-hidden="true"></i></p>
                </div>
            </div>
        `
        linkContainer.append(linkDiv)
    }
    const numOfLinks = document.querySelector('.num-of-links')
    numOfLinks.innerHTML = `${linkCount} Links`
}

// FUNCTION LINK ACTION
const link_action = async () => {
    const linkHolders = document.querySelectorAll('.link-holder')
    let links = JSON.parse(localStorage.getItem("links"))
    let userData = JSON.parse(localStorage.getItem("userInfo"))

    for(link of linkHolders) {
        link.addEventListener('click', function(){
            this.classList.toggle('transparent')
            currentUrlId = this.firstElementChild.innerText
            currentUrlCustomName = this.firstElementChild.nextElementSibling.innerText

            if (document.documentElement.clientWidth > 500) {
                main_right.style.display = "block"
            }
            
            links.links.forEach(element => {
                if (element.urlCode === currentUrlId) {
                    let main_left = document.querySelector(".main-left")
                    const main_holder = document.querySelector('#link_details')
                    const canvas = document.querySelector('#link_chart_container')
                    const m_canvas = document.querySelector('#m-link_chart_container')
                    let m_table = document.querySelector('#tr1')
                    let table = document.querySelector('#tr2')
                    
                    let title1
                    let dateCreated1
                    let linkDetails1
                    let realLink
                    let shortLink1
                    let graphContainer
                    let tbody
                    
                    if(getComputedStyle(main_right, null).display === "none") {
                        linkDetails1 = linkDetailsMobile
                        dateCreated1 = dateCreatedMobile
                        title1 = linkTitleMobile
                        realLink = originalLinkMobile
                        shortLink1 = shortCodeMobile 
                        graphContainer = m_canvas
                        tbody  = m_table
                        linkDetails.classList.toggle("hide");

                    } else {
                        title1 = linkTitleRight
                        dateCreated1 = dateCreatedRight
                        linkDetails1 =  main_holder
                        realLink = original_link
                        shortLink1 = short_link
                        graphContainer = canvas
                        tbody = table
                    }

                    if (currentUrlCustomName === "null"){
                        currentUrlCustomName = currentUrlId
                    }


                    dateCreated1.innerHTML = `Created ${element.dateCreated}, ${element.timeCreated} By <span>${userData.name}</span>`
                    title1.innerHTML = element.linkTitle
                    realLink.innerHTML = element.originalUrl
                    shortLink1.innerHTML = element.shortUrl
                    short_code.value = currentUrlCustomName
                    unique_url_id.innerText = currentUrlId
                    for(click of clicks) {
                        click.innerHTML =`${element.numOfClicks }`
                    }

                    if (element.numOfClicks > 0) {

                        linkDetails1.style.display = 'block'

                        location_analytics(tbody, element.urlCode)

                        //GET CHART DATA
                        let chartData = chatData(currentUrlId)
                        let labels = chartData.labels
                        let data = chartData.data
                        let type = "bar"
                        chart(labels, data, graphContainer, type)

                    } else {
                        linkDetails1.style.display = 'none'

                        document.querySelector('#num-of-click').style.display = 'block'
                        
                    }


                }
            
            });


        })

    }
}


//LOGOUT FUNCTION
const logout = () => {
    localStorage.setItem("links", JSON.stringify("empty"))
    localStorage.setItem("userInfo", JSON.stringify("empty"))
    location = "index.html" 
}

// FUNCTION COPY TO CLIPBOARD
const copyToClipboard = str => {
    const el = document.createElement('textarea'); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied 
    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof 
    el.style.position = 'absolute'; 
    el.style.left = '-9999px'; // Move outside the screen to make it invisible 
    document.body.appendChild(el); // Append the <textarea> element to the HTML document 
    const selected = document.getSelection().rangeCount > 0 // Check if there is any content selected previously 
        ? document.getSelection().getRangeAt(0) // Store selection if found 
        : false; // Mark as false to know no selection existed before 
    el.select(); // Select the <textarea> content 
    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events) 
    document.body.removeChild(el); // Remove the <textarea> element 
    if (selected) { // If a selection existed before copying 
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document 
        document.getSelection().addRange(selected); // Restore the original selection 
    }
}

const location_analytics = (tbody, url) => {
    let link = JSON.parse(localStorage.getItem('links'))
    tbody.innerHTML = ""
    link.locations.forEach((loc) => {
        if(loc.urlId === url) {

            tbody.insertRow().innerHTML = `
            <tr>
                <td>${loc.country}</td>
                <td>${loc.region}</td>
                <td>${loc.dateClicked}</td>
                <td>${loc.timeClicked}</td>
            </tr>
            `
        }
    })
}

const shareOntwitter = (text, urlId) => { 
    let urlI = unique_url_id.innerText
    let shortLink = short_link.innerText
    let title = linkTitleRight.innerText
    let text1 = `${title} ${shortLink}`

    var url = `https://twitter.com/intent/tweet?text=${text1}`; 
    TwitterWindow = window.open(url, 'TwitterWindow',width=300,height=300); 
    return true; 
} 