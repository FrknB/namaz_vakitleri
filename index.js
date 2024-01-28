/*  !!!!!
    The website from which I got the API
    https://collectapi.com/

*/


const cityInput = document.getElementById("cityInput");
const hancleClick = document.getElementById("hancleClick");
const bottom = document.getElementById("bt");
const dayBox = document.getElementById("day-box");
const currentDate = document.getElementById("date");

const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const date = new Date();
const day = (date.getDate() < 10) ? "0" + date.getDate()
                                 : date.getDate();
const month = date.getMonth();
const today = days[date.getDay()];

let monthName;
switch (month) {
    case 0:
        monthName = "Ocak";
        break;
    case 1:
        monthName = "Şubat";
        break;
    case 2:
        monthName = "Mart";
        break;
    case 3:
        monthName = "Nisan";
        break;
    case 4:
        monthName = "Mayıs";
        break;
    case 5:
        monthName = "Haziran";
        break;
    case 6:
        monthName = "Temmuz";
        break;
    case 7:
        monthName = "Ağustos";
        break;
    case 8:
        monthName = "Eylül";
        break;
    case 9:
        monthName = "Ekim";
        break;
    case 10:
        monthName = "Kasım";
        break;
    case 11:
        monthName = "Aralık";
        break;
    default:
        monthName = "Bilinmeyen Ay";
}

hancleClick.addEventListener("click", () =>{
    const token = "YOUR API KEY";
    const uri = `https://api.collectapi.com/pray/all?data.city=${cityInput.value}`;

    fetch(uri, {
        method: 'GET',
        headers:{
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        bottom.innerHTML = '';
        day.innerHTML = '';
        bottom.classList = "bottom";
        data.result.forEach(items => {
            const records = document.createElement("div");
            records.className = 'times';
            records.innerHTML = `<span class="vakit">${items.vakit}</span>
                                <span class="sure">${items.saat}</span>`;
            bottom.appendChild(records);

            currentDate.classList ="day";
            currentDate.innerHTML = `
                            <span id="date">${day + " "+monthName+ " "+ today}</span>
                        `;
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});