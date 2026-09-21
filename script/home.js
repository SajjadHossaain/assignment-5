const createElement = (arr) => {
  const htmlElements = arr.map((el) => {
    let styleClass = " ";
    let icon = " ";
    if (el === "bug") {
      styleClass = "border-[#FECACA] bg-[#FFF1F1] text-[#EF4444]";
      icon = "fa-brands fa-android";
    } else if (el === "help wanted") {
      styleClass = "border-[#D97706] bg-[#FFF8DB] text-[#D97706]";
      icon = "fa-solid fa-circle-radiation";
    } else if (el === "enhancement") {
      styleClass = "border-[#00A96E] bg-[#BBF7D080] text-[#00A96E]";
      icon = "fa-solid fa-wand-magic-sparkles";
    } else if (el === "documentation") {
      styleClass = "border-[#A855F7] bg-[#A855F725] text-[#A855F7]";
      icon = "fa-solid fa-paperclip";
    } else if (el === "good first issue") {
      styleClass = "border-[#0066FF] bg-[#E5F0FF] text-[#0052CC]";
      icon = "fa-solid fa-cookie";
    }
    return `<span class="${styleClass} border-2 rounded-2xl px-2 py-1 flex justify-center items-center gap-2 uppercase text-[12px]">
        <i class="${icon}"></i>
        <span class="whitespace-nowrap">${el}</span>
    </span>`;
  });
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
  }
};

const removeActive = () => {
    const filterButton = document.querySelectorAll(".filter-btn");

    filterButton.forEach((btn) => {
        btn.classList.remove("active");
    });
};

const toggleStyle = async(id) => { 
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  if (id === "open-btn") {
    manageSpinner(true);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickAllBtn = document.getElementById(id);
      clickAllBtn.classList.add("active");
      displayOpenIssues(data.data);
    });
  }
  else if(id === "close-btn"){
    manageSpinner(true);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickAllBtn = document.getElementById(id);
      clickAllBtn.classList.add("active");
      displayCloseIssues(data.data);
    })
  }
  else{
    manageSpinner(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          removeActive();
          const clickAllBtn = document.getElementById(id);
          clickAllBtn.classList.add("active");
          allIssuesDisplay(data.data);
        });

  }
};

const displayOpenIssues = (issues) => {
  // console.log(issues)
  const openIssues = issues.filter(issue => issue.status === "open")
  console.log(openIssues)
  allIssuesDisplay(openIssues)
};

const displayCloseIssues = (issues) =>{
  const closeIssues = issues.filter((issue) => issue.status === "closed");
  allIssuesDisplay(closeIssues)
}

const loadAllIssues = async () => {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();

  allIssuesDisplay(data.data);
};

const loadSingleCard = async(id) =>{
  const details = document.getElementById("details-container");
  details.innerHTML = `
            <h1 class="font-bold text-2xl">Fix broken image uploads</h1>
            <div class="flex gap-2 items-center">
                <div class=" bg-[#00A96E] text-white text-sm py-1 px-3 rounded-full text-nowrap">Opened</div>
                <div class="bg-[#64748B] rounded-full h-2 w-2"></div>
                <p class="text-sm text-[#64748B]">Opened by Fahim Ahmed</p>
                <div class="bg-[#64748B] rounded-full h-2 w-2"></div>
                <p class="text-sm text-[#64748B]">22/02/2026</p>
            </div>
            <div>
                <div class="flex items-center gap-2">Satues</div>
            </div>
            <p class="text-lg text-[#64748B] line-clamp-2">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
            
            <div class="flex gap-5 items-center">
                <div class="flex-1 h-full space-y-1 shadow-sm rounded-xl pl-2">
                    <p class="text-sm text-[#64748B]">22/02/2026</p>
                    <h2 class="font-semibold">Fahim Ahmed</h2>
                </div>
                <div class="flex-1 h-full space-y-1 shadow-sm rounded-xl pl-2">
                    <p class="text-sm text-[#64748B]">Priority:</p>
                    <div class="bg-red-700 text-white text-sm py-1 px-3 rounded-full text-nowrap w-15 text-center">High</div>
                </div>
            </div>
  `;

  document.getElementById("my_modal").showModal()
}

const allIssuesDisplay = (issues) => {
  const count = document.getElementById("count");
  count.innerText = issues.length;

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ``;
  issues.forEach((issue) => {

    let borderTop = "";
    let statusIcon = "";
    let priorityClass = "";
    const data = issue.createdAt.slice(0, 10);

    if (issue.status === "open") {
      borderTop = "border-t-4 border-[#00A96E]";
      statusIcon = "assets/Open-Status.png";
    } else {
      borderTop = "border-t-4 border-[#A855F7]";
      statusIcon = "assets/Closed- Status .png";
    }

    if (issue.priority === "high") {
      priorityClass = " text-[#EF4444] bg-[#FEECEC]";
    } else if (issue.priority === "medium") {
      priorityClass = " text-[#F59E0B] bg-[#FFF6D1]";
    } else {
      priorityClass = " text-[#9CA3AF] bg-[#EEEFF2]";
    }

    const card = document.createElement("div");
    card.innerHTML = `
                <div onclick="loadSingleCard(${issue.id})" class="${borderTop} rounded-md p-4 items-center space-y-4 bg-[#ffffff] shadow-md h-full">
                
                    <!-- card status -->
                    <div class="flex justify-between">
                        <div>
                            <img src="${statusIcon}" alt="">
                        </div>
                        <div class="px-6 rounded-lg ${priorityClass}">
                        ${issue.priority}
                        </div>
                    </div>
                
                    <!-- card details -->
                    <h2 class="font-semibold min-h-12.5">${issue.title}</h2>
                    <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
                
                    <!-- card bottom status -->
                    <div>
                        <div class="flex items-center gap-2">${createElement(issue.labels)}</div>
                    </div>
                
                    <!-- horizontal line -->
                    <div class="-mx-4">
                        <hr class="border-gray-300">
                    </div>
                    <div class="space-y-2">
                        <p class="text-gray">#${issue.id} by ${issue.author}</p>
                        <p class="text-gray">${data}</p>
                    </div>
                
                </div>
    `;
    cardContainer.append(card);
  });
  manageSpinner(false);
};
loadAllIssues();

// document.getElementById("btn-search").addEventListener("click",async()=>{
//   const input = document.getElementById("input-search");
//   const searchValue = input.value.replaceAll(" ", "").toLowerCase();

//   const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
//   const res =await fetch(url)
//   const data = await res.json()
//   console.log(data.data)
// });
