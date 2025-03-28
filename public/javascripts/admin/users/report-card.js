document.addEventListener("DOMContentLoaded", function (){
    const viewReportsBtn = document.querySelectorAll(".view-user-reports")
    const reportCardCloseBtn = document.querySelectorAll(".report-card-close-button")[0]
    const reportCard = document.querySelectorAll('.report-card')[0];
    const deleteReport = document.querySelectorAll('.delete-report');
    const backdrop = document.querySelector(".backdrop");
    
    viewReportsBtn.forEach(button => {
        button.addEventListener("click", function() {
            if(reportCard.getAttribute("status") == "closed"){
                const username = button.getAttribute("username")
                showReportCard(reportCard, backdrop, username)  
            }
            else{
                hideReportInfoCard(document.getElementsByClassName('userInfoPopupCard')[0])
                hideUserInfoCard(
                    document.querySelector(".userInfoPopupCard")
                )
            }
    })
    })

    reportCardCloseBtn.addEventListener("click", function() {
        hideReportCard(reportCard, backdrop)  
    })

    deleteReport.forEach(button => {
        button.addEventListener("click", function() {
            const reportId = button.getAttribute("reportId");
            const username = button.getAttribute("username");
            deleteUserReport(button, reportId, username)
        })
    })

    

})

async function getUserReportData(username) {
    try {
        const response = await fetch(`http://localhost:3000/report/user?username=${username}`);
        if (response.ok) {
            const data = await response.json(); 
            console.log(data)
            return data

        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error); 
    }
}

async function showReportCard(popupCard, backdrop, username) {
    const userReports = await getUserReportData(username)
    const userInfoCard = document.getElementsByClassName('userInfoPopupCard')[0]
    const reportCardList = document.getElementsByClassName('report-card-report-list')[0]
    const noReports = document.getElementById('report-card-no-reports')

    hideUserInfoCard(userInfoCard)

    if(userReports.length > 0){
        for (let index = 0; index < userReports.length; index++) {
            const div = document.createElement('div');
            const span = document.createElement('span')
            const icon = document.createElement('i')
            
            reportCardList.style.display = "flex"
            noReports.style.display = "none"

            div.classList.add('report-card-report-item');
            icon.classList.add('fa-solid', 'fa-trash', 'delete-report');
            icon.setAttribute("reportId", userReports[index]._id)
            icon.setAttribute("username", userReports[index].for)
            span.innerText = `Report #${index+1} - ${userReports[index].reason}`

            div.appendChild(span);
            div.appendChild(icon);
            reportCardList.appendChild(div);

            div.addEventListener("click", function() {
                showReportInfoCard(userReports[index])
            })
        }
    }
    else{
        reportCardList.style.display = 'none';
        noReports.style.display = 'flex'
    }

    popupCard.style.display = "flex";
    popupCard.classList.add("show");
    popupCard.setAttribute("status", "opened")
    backdrop.style.display = "block"
    document.body.classList.add("no-scroll")    
}

function hideReportCard(popupCard, backdrop) {
    const reportCardList = document.getElementsByClassName('report-card-report-list')[0]

    popupCard.classList.remove("show");
    popupCard.classList.add("hide");
    popupCard.setAttribute("status", "closed")
    backdrop.style.display = "none"
    document.body.classList.remove("no-scroll")

    while(reportCardList.firstChild){
        reportCardList.removeChild(reportCardList.firstChild)
    }
    
    // Wait for animation to finish before hiding completely
    setTimeout(() => {
        popupCard.style.display = "none";
        popupCard.classList.remove("hide"); // Reset for next use
    }, 300); // Matches animation duration in CSS
}

function showReportInfoCard(data){
    const reportInfoCard = document.getElementsByClassName("report-detail-card")[0]
    const reporter = document.getElementById("reporter");
    const repoted = document.getElementById("repoted");
    const reason = document.getElementById("report-reason")
    const description = document.getElementById("report-message");
    const date = document.getElementById("report-date")
    const takeActionBtn = document.getElementsByClassName("take-action")[0]
    const dismissReportBtn = document.getElementsByClassName('dismiss')[0]

    reporter.innerHTML = `<strong>From:</strong> ${data.from}`
    repoted.innerHTML = `<strong>For:</strong> ${data.for}`
    reason.innerHTML = `<strong>Type:</strong> ${data.reason}`
    description.innerHTML = `<strong>Message:</strong> ${data.description}`
    date.innerHTML = `<strong>Date:</strong> ${new Date(data.createdAt).toDateString()}`
    dismissReportBtn.setAttribute('reportId', data._id)
    dismissReportBtn.setAttribute('username', data.for)

    reportInfoCard.style.display = "flex"

    takeActionBtn.addEventListener("click", function(){
        showUserInfoCard(
            document.getElementsByClassName("userInfoPopupCard")[0],
            document.getElementsByClassName("backdrop")[0],
            data.for,
            "1234"
        )
    })
}

function hideReportInfoCard(){
    const reportInfoCard = document.getElementsByClassName("report-detail-card")[0]
    const reporter = document.getElementById("reporter");
    const repoted = document.getElementById("repoted");
    const reason = document.getElementById("report-reason")
    const description = document.getElementById("report-message");
    const date = document.getElementById("report-date") 

    reporter.innerHTML = ""
    repoted.innerHTML = ""
    reason.innerHTML = ""
    description.innerHTML = ""
    date.innerHTML = ""
    
    reportInfoCard.style.display = "none"
}

async function deleteUserReport(element, reportId, username) {
    try {
        const response = await fetch(`http://localhost:3000/report/user?id=${reportId}&username=${username}`, {method: 'DELETE'});
        if (response.ok) {
            element.parentElement.remove()
            const data = await response.json(); 
            console.log(data)
            hideReportInfoCard()
        } else {
            throw new Error('Failed to delete report');
        }
    } catch (error) {
        console.error('Error:', error); 
    }
}