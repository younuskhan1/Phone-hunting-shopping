const byDefaultPhoneShow = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        showingPhones(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const loadPhoneDataBySearch = async () => {
    contentIsLoading(true);
    const inputField = document.getElementById("input-field");
    const inputName = inputField.value;
    // console.log(inputName);
    inputField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputName}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        showingPhones(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const showingPhones = (phones) => {
    // console.log(phones)
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = "";
    const noPhoneFound = document.getElementById("no-phone-found");

    if (phones.length === 0) {
        noPhoneFound.classList.remove("hidden");
    } else {
        for (let phone of phones) {
            // console.log(phone);
            const div = document.createElement("div");
            div.classList = `card bg-base-100 shadow-xl rounded-none`;
            div.innerHTML = ` 
                <figure class="px-2 m-3 py-4 bg-[#deeff5] rounded-none">
                    <img class="w-4/5 rounded-3xl" src="${phone.image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p class="break-all">${phone.slug}</p>
                    <p>${phone.brand}</p>
                    <div class="card-actions">
                        <button class="btn btn-secondary" onClick="loadingShowDetailsData('${phone.slug}')">Show Details</button>
                    </div>
                </div>
            `;
            phoneContainer.appendChild(div);
            noPhoneFound.classList.add("hidden");
        }
    }
    contentIsLoading(false);
}

const loadingShowDetailsData = async (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    try {
        const response = await fetch(url);
        const individualPhoneData = await response.json();
        displayShowDetails(individualPhoneData.data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayShowDetails = (phone) => {
    console.log(phone);
    const showDetailsContainer = document.getElementById("showDetailsContainer");
    showDetailsContainer.innerHTML = `
        <dialog id="my_modal_5" class="modal">
        <div class="modal-box">
            <div class="flex justify-center mb-4"><img class="w-2/5" src="${phone.image}" alt="Shoes" class="rounded-xl" /></div>
            <h3 class="font-bold text-lg text-center">Phone Name : ${phone.name}</h3>
            <p class="text-center"> Bluetooth : ${phone.others ? phone.others.Bluetooth : "Bluetooth is not available"}</p>
            <p class="text-center"> Release Date : ${phone.releaseDate ? phone.releaseDate : "Release Date not available"}</p>
            <p class="text-center"> GPS : ${phone.others ? phone.others.GPS : "GPS is not available"}</p>
            <p class="text-center"> Storage : ${phone.mainFeatures.storage}</p>
            <p class="text-center"> WLAN : ${phone.others ? phone.others.WLAN : "WLAN is not available"}</p>

            <form method="dialog">
               <div class="flex justify-center mt-4"><button class="btn btn-primary">Close the Modal</button></div>
            </form>
        </div>
        </dialog>
    `;
    my_modal_5.showModal()

}




const contentIsLoading = (isLoading) => {
    const spinnerContainer = document.getElementById("spinner");
    if (isLoading) {
        spinnerContainer.classList.remove("hidden");
    } else {
        spinnerContainer.classList.add("hidden");
    }
}

byDefaultPhoneShow();