const createElement = (arr) =>{
  const htmlElements = arr.map((el) =>{
    let styleClass = " ";
    let icon = " "
    if(el === "bug"){
      styleClass = "border-[#FECACA] bg-[#FFF1F1] text-[#EF4444]";
      icon = "fa-brands fa-android"
    }
    else if(el === "help wanted"){
      styleClass = "border-[#D97706] bg-[#FFF8DB] text-[#D97706]";
      icon = "fa-solid fa-circle-radiation"
    }
    else if(el === "enhancement"){
      styleClass = "border-[#00A96E] bg-[#BBF7D080] text-[#00A96E]";
      icon = "fa-solid fa-wand-magic-sparkles";
    }
    else if (el === "documentation") {
      styleClass = "border-[#A855F7] bg-[#A855F725] text-[#A855F7]";
      icon = "fa-solid fa-paperclip";
    }
    else if (el === "good first issue") {
      styleClass = "border-[#0066FF] bg-[#E5F0FF] text-[#0052CC]";
      icon = "fa-solid fa-cookie";
    }
    return `<span class="${styleClass} border-2 rounded-2xl px-[8px] py-[4px] flex justify-center items-center gap-2 uppercase text-[12px]">
        <i class="${icon}"></i>
        <span class="whitespace-nowrap">${el}</span>
    </span>`;
  }
  );
    return htmlElements.join(" ")
}
const loadAllIssues = async () => {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
  const data = await res.json();

  allIssuesDisplay(data.data);
};

const allIssuesDisplay = (issues) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ``;
  issues.forEach(issue => {
    const card = document.createElement("div");
    card.innerHTML = `
                <div class="border-t-4 border-[#00A96E] rounded-md p-4 items-center space-y-4 bg-[#ffffff] shadow-md h-full">
                
                    <!-- card status -->
                    <div class="flex justify-between">
                        <div>
                            <img src="assets/Open-Status.png" alt="">
                        </div>
                        <div class="bg-[#FEECEC] px-6 rounded-lg">
                            <p class="text-[#EF4444]">${issue.priority}</p>
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
                        <p class="text-gray">#1${issue.author}</p>
                        <p class="text-gray">18 August 2026</p>
                    </div>
                
                </div>
    `;
    cardContainer.append(card)
  });
};

loadAllIssues()
