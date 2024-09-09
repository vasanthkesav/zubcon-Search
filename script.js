
// Initialize zoho js API
ZOHO.CREATOR.init()
  .then(function (data) {

    // Get Records from ZOho Creator
    const getRecords = async () => {
      const config = {
        appName: "zubcon-backup-j25",
        reportName: "Backend_Search_Results"
      }
      try {
        const response = await ZOHO.CREATOR.API.getAllRecords(config);
        return response.data;
      } catch (error) {
        console.log(error);
      }

    }


// Append Item list in the UI
    const appendItems = (all_items) => {
      const list = document.querySelector(".list");
      let tag = "";
      for (let i = 0; i < all_items.length; i++) {
        tag += `<a class="item text-dark" target='_blank'>${all_items[i].Name}</a>`;
      }
      list.innerHTML = tag;
    }
    document.addEventListener("DOMContentLoaded", async () => {
      const nameArr = await getRecords();
      appendItems(nameArr);
    })


    // Input Actions
    document.querySelector("#search").addEventListener("input", async (event) => {
      const val = event.target.value;
      const list = document.querySelector(".list");
      if (val) {
        list.classList.remove("d-none");
      }
      else {
        list.classList.add("d-none");
      }
      const nameArr = await getRecords();
      const new_arr = nameArr.filter(item => item.Name.toLowerCase().includes(val.toLowerCase()));
      appendItems(new_arr);
    })



  });
