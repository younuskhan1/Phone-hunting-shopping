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
    for (let phone of phones) {
        console.log(phone);
        const div = document.createElement("div");
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = ` 
            <figure class="px-2 pt-4">
                <img class="w-4/5" src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p class="break-all">${phone.slug}</p>
                <p>${phone.brand}</p>
                <div class="card-actions">
                    <button class="btn btn-secondary">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    }
}

byDefaultPhoneShow();