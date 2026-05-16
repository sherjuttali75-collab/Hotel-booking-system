// ===============================
// PAGE SWITCHING FUNCTION
// ===============================
function showPage(pageId) {

    let pages = document.querySelectorAll("section");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}



// ===============================
// ROOM PRICES OBJECT
// ===============================
const roomPrices = {
    "Single Room": 50,
    "Double Room": 90,
    "Suite": 150
};



// ===============================
// BOOKING FUNCTION
// ===============================
function bookHotel() {

    // Get form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let roomType = document.getElementById("roomType").value;
    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;

    // ===== CHECK EMPTY FIELDS =====
    if (name === "" || email === "" || phone === "" || roomType === "" || checkin === "" || checkout === "") {
        alert("Please fill all fields!");
        return false;
    }

    // ===== EMAIL VALIDATION =====
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter valid email address!");
        return false;
    }

    // ===== PHONE VALIDATION =====
    let phonePattern = /^[0-9]{10,15}$/;
    if (!phone.match(phonePattern)) {
        alert("Enter valid phone number (10-15 digits)!");
        return false;
    }

    // ===== DATE VALIDATION =====
    let checkinDate = new Date(checkin);
    let checkoutDate = new Date(checkout);

    if (checkoutDate <= checkinDate) {
        alert("Check-out date must be after check-in date!");
        return false;
    }

    // ===== CALCULATE DAYS =====
    let timeDiff = checkoutDate - checkinDate;
    let days = timeDiff / (1000 * 3600 * 24);

    // ===== CALCULATE TOTAL PRICE =====
    let pricePerNight = roomPrices[roomType];
    let totalAmount = days * pricePerNight;

    // ===== SAVE DATA IN LOCAL STORAGE =====
    let bookingData = {
        name: name,
        email: email,
        phone: phone,
        roomType: roomType,
        checkin: checkin,
        checkout: checkout,
        days: days,
        totalAmount: totalAmount
    };

    localStorage.setItem("hotelBooking", JSON.stringify(bookingData));

    // ===== SHOW CONFIRMATION =====
    alert(
        "Booking Confirmed!\n\n" +
        "Name: " + name +
        "\nRoom: " + roomType +
        "\nDays: " + days +
        "\nTotal Amount: $" + totalAmount
    );

    // Reset form
    document.querySelector("form").reset();

    return false; // Prevent page reload
}