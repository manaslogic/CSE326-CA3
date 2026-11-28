// ================= DATA =================

// 15 medicines with real product photos
var medicines = [
  { name: "Paracetamol 500mg (10 tablets)", use: "Fever, body pain", price: 20, photo: "images/paracetamol.jpg" },
  { name: "ORS powder (1 sachet)", use: "Loose motion, dehydration", price: 20, photo: "images/ors.jpg" },
    { name: "Cetirizine 10mg (10 tablets)", use: "Allergy, running nose", price: 25, photo: "images/cetirizine.jpg" },
    { name: "Antacid syrup (170 ml)", use: "Acidity, gas", price: 100, photo: "images/antacid.jpg" },
  { name: "Cough syrup (100 ml)", use: "Cough", price: 90, photo: "images/cough_syrup.jpg" },
  { name: "Zinc 20mg (10 tablets)", use: "Used with ORS in loose motion", price: 40, photo: "images/zinc.jpg" },
    { name: "Cold balm (10 ml)", use: "Cold, headache", price: 45, photo: "images/cold_balm.jpg" },
    { name: "Antiseptic ointment (15 g)", use: "Cuts and wounds", price: 60, photo: "images/antiseptic_ointment.jpg" },
  { name: "Pain relief (30 capsules)", use: "Body and muscle pain", price: 130, photo: "images/pain_relief.jpg" },
  { name: "Iron-folic acid (10 tablets)", use: "Weakness, anaemia", price: 30, photo: "images/iron_folic_acid.jpg" },
    { name: "Vitamin C chewable (15 tablets)", use: "Weakness, cold", price: 30, photo: "images/vitamin_c.jpg" },
    { name: "Calamine lotion (60 ml)", use: "Itching, rash", price: 70, photo: "images/calamine_lotion.png" },
  { name: "Throat lozenges (8 pieces)", use: "Sore throat", price: 40, photo: "images/throat_lozenges.png" },
  { name: "Glucose powder (200 g)", use: "Weakness, tiredness", price: 70, photo: "images/glucose_powder.jpg" },
    { name: "Burn cream (20 g)", use: "Minor burns", price: 80, photo: "images/burn_cream.png" }
];

// 15 common health problems
var problems = [
  { name: "Fever", symptoms: "High body temperature, shivering, body ache", medicine: "Paracetamol, plenty of water, rest", doctor: "Fever for more than 3 days" },
  { name: "Common cold", symptoms: "Running nose, sneezing, mild fever", medicine: "Cetirizine, cold balm, Vitamin C", doctor: "Not better in 5 days" },
    { name: "Cough", symptoms: "Dry or wet cough, chest tightness", medicine: "Cough syrup, warm water", doctor: "Cough for more than 2 weeks" },
    { name: "Headache", symptoms: "Pain in head, tired eyes", medicine: "Paracetamol, cold balm, rest", doctor: "Sudden very bad headache" },
  { name: "Loose motion", symptoms: "Watery stool, stomach cramps, weakness", medicine: "ORS and Zinc", doctor: "Blood in stool or more than 2 days" },
  { name: "Acidity", symptoms: "Burning in chest or stomach, sour burps", medicine: "Antacid syrup, avoid spicy food", doctor: "Happens again and again" },
    { name: "Stomach ache", symptoms: "Pain or cramps in the belly", medicine: "Antacid syrup, light food", doctor: "Very severe pain" },
    { name: "Sore throat", symptoms: "Pain while swallowing, itchy throat", medicine: "Throat lozenges, warm salt water gargle", doctor: "Not better in 3 days" },
  { name: "Skin allergy", symptoms: "Itching, red rash, small bumps", medicine: "Cetirizine, Calamine lotion", doctor: "Rash spreads fast" },
  { name: "Minor cut", symptoms: "Small wound with a little bleeding", medicine: "Wash with clean water, Antiseptic ointment", doctor: "Deep cut or bleeding does not stop" },
    { name: "Body pain", symptoms: "Muscle pain, joint pain, tiredness", medicine: "Pain relief gel, Paracetamol", doctor: "Pain for more than a week" },
    { name: "Weakness", symptoms: "Tired, dizzy, pale skin", medicine: "Iron-folic acid, Glucose powder, Vitamin C", doctor: "Weakness does not go away" },
  { name: "Vomiting", symptoms: "Nausea, throwing up", medicine: "ORS in small sips, light food", doctor: "Cannot drink water" },
  { name: "Minor burn", symptoms: "Red painful skin, small blister", medicine: "Cool water for 10 minutes, Burn cream", doctor: "Large or deep burn" },
    { name: "Dehydration", symptoms: "Dry mouth, little urine, headache", medicine: "ORS, drink more water", doctor: "Very sleepy or confused" }
];

// sample hospitals (change names and numbers to real ones)
var hospitals = [
  { name: "Primary Health Centre (PHC)", distance: "2 km", type: "Government", phone: "9876500001" },
  { name: "Community Health Centre", distance: "5 km", type: "Government", phone: "9876500002" },
    { name: "City Care Clinic", distance: "7 km", type: "Private", phone: "9876500003" },
    { name: "Civil Hospital", distance: "12 km", type: "Government", phone: "9876500004" },
  { name: "Sunrise Hospital", distance: "15 km", type: "Private", phone: "9876500005" },
  { name: "District Hospital", distance: "20 km", type: "Government", phone: "9876500006" }
];

// ================= CALLS =================

// If you build a small server later, put its link here, like "http://localhost:3000"
var serverLink = "";

// get saved calls from the browser
var calls = JSON.parse(localStorage.getItem("calls")) || [];

function showCalls() {
  var box = document.getElementById("callList");
  if (calls.length == 0) {
    box.innerHTML = "<p>No calls yet.</p>";
    return;
  }
  var html = "";
  for (var i = calls.length - 1; i >= 0; i--) {
      html += '<div class="call-item">';
      html += '<a href="tel:' + calls[i].number + '">' + calls[i].number + '</a>';
      html += '<span class="small">' + calls[i].time + '</span>';
      html += '</div>';
  }
  box.innerHTML = html;
}

function addCall(number) {
    calls.push({ number: number, time: new Date().toLocaleString() });
    localStorage.setItem("calls", JSON.stringify(calls));
    showCalls();
}

document.getElementById("addBtn").onclick = function () {
  var input = document.getElementById("phone");
  var number = input.value.trim();
  if (number == "") {
      alert("Please enter a phone number");
      return;
  }
  addCall(number);
  input.value = "";
};

// if a server link is given, check for new calls every 5 seconds
function getCallsFromServer() {
  fetch(serverLink + "/calls")
    .then(function (res) { return res.json(); })
    .then(function (data) {
        calls = data;
        showCalls();
    });
}
if (serverLink != "") {
  setInterval(getCallsFromServer, 5000);
}

// ================= SHOW DATA =================

function showProblems() {
  var html = "";
  for (var i = 0; i < problems.length; i++) {
      var p = problems[i];
      html += '<div class="card">';
      html += '<h3>' + p.name + '</h3>';
      html += '<p><b>Symptoms:</b> ' + p.symptoms + '</p>';
      html += '<p><b>Medication:</b> ' + p.medicine + '</p>';
      html += '<p class="small"><b>See a doctor:</b> ' + p.doctor + '</p>';
      html += '</div>';
  }
  document.getElementById("problemList").innerHTML = html;
}

function showMedicines() {
    var html = "";
    for(var i = 0; i < medicines.length; i++) {
      var m = medicines[i];
      html += '<div class="card">';
      html += '<div class="photo"><img src="' + m.photo + '" alt="' + m.name + '" onerror="this.parentElement.innerText=\'No photo available\'"></div>';
      html += '<h3>' + m.name + '</h3>';
      html += '<p>' + m.use + '</p>';
      html += '<p class="price">Rs. ' + m.price + ' (approx.)</p>';
      html += '</div>';
    }
    document.getElementById("medicineList").innerHTML = html;
}

function showHospitals() {
  var html = "";
  for (var i = 0; i < hospitals.length; i++) {
    var h = hospitals[i];
      html += '<div class="hospital">';
      html += '<b>' + h.name + '</b> <span class="small">(' + h.type + ', ' + h.distance + ' away)</span><br>';
      html += 'Call: <a href="tel:' + h.phone + '">' + h.phone + '</a>';
      html += '</div>';
  }
  document.getElementById("hospitalList").innerHTML = html;
}

// run everything when page opens
showCalls();
showProblems();
showMedicines();
showHospitals();