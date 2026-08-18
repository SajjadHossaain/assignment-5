const loadAllIssues = async () => {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
  const data = await res.json();

  allIssuesDisplay(data.data);
};


const allIssuesDisplay = (issues) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  issues.forEach(issue => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="border-t-4 border-[#00A96E] rounded-md p-4 items-center space-y-4 bg-[#ffffff] shadow-md">

                    <!-- card status -->
                    <div class="flex justify-between">
                        <div>
                            <img src="assets/Open-Status.png" alt="">
                        </div>
                        <div>
                            <p class="text-[#EF4444]">High</p>
                        </div>
                    </div>

                    <!-- card details -->
                    <h2 class="font-semibold">Fix navigation menu on mobile devices</h2>
                    <p class="text-[#64748B] line-clamp-2">The navigation menu doesn't collapse properly on mobile
                        devices...</p>

                    <!-- card bottom status -->
                    <div class="flex gap-4">
                        <div class="badge badge-success badge-outline">a</div>
                        <div class="badge badge-success badge-outline">b</div>
                    </div>

                    <!-- horizontal line -->
                    <div class="-mx-4">
                        <hr class="border-gray-300">
                    </div>
                    <div class="space-y-2">
                        <p class="text-gray">#1by john_doe</p>
                        <p class="text-gray">18 August 2026</p>
                    </div>

                </div>

    `;
    cardContainer.append(card)
  });
};

loadAllIssues()
