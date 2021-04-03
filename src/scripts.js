const userRepository = new UserRepository(userData);
const hydration = new Hydration(hydrationData, userRepository.currentUser.id)
let selectedDate = '2019/09/22';
let startDate = '2019/09/16';
let endDate = '2019/09/22';


const userInfoButton = document.getElementById('userinfoButton');
const userInfoDropdown = document.getElementById('userInfoPage');
const userEmail = document.getElementById('userinfoEmail');
const userStepGoal = document.getElementById('userinfoGoal');
const averageStepGoal = document.getElementById('averageStepGoal');
const userNameDisplay = document.getElementById('userName');
const averageOunces = document.getElementById('averageOunces')
const selectedDateHydration = document.getElementById('selectedDateHydration');
const selectedWeekHydration = document.getElementById('selectedWeekHydration');
const hoursSleptLastNight = document.getElementById('hoursSleptLastNight');
const picker = datepicker(document.getElementById('date-picker'), {
  onSelect: (instance, date) => {
    if (date) {
      let stringifiedDateAndTime = JSON.stringify(date);
      let stringifiedDate = stringifiedDateAndTime.split('T')[0];
      let formattedDate = stringifiedDate.replaceAll('-', '/');
      selectedDate = formattedDate.substring(1);
      showHydrationData();
    }
  },
  startDate: new Date(2019, 8, 1),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2019, 8, 22),
})

const start = datepicker(document.getElementById('dateRangePickerStart'), {
  id: 'dateRangePicker',
  startDate: new Date(2019, 8, 1),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2019, 8, 22),
});
const end = datepicker(document.getElementById('dateRangePickerEnd'), {
  id: 'dateRangePicker',
  startDate: new Date(2019, 8, 1),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2019, 8, 22),
  onSelect: (instance, date) => {
    let stringifiedRange = JSON.stringify(end.getRange());
    let splitRange = stringifiedRange.split("\"");
    let startRange = splitRange[3]
    let endRange = splitRange[7]
    startDate = startRange.substring(0, 10).replaceAll('-', '/');
    endDate = endRange.substring(0, 10).replaceAll('-', '/');
    showHydrationData();
  }
});

window.addEventListener('load', displayUserInfo);
userInfoButton.addEventListener('click', showDropdown);



function displayUserInfo() {
  showHydrationData();
  userNameDisplay.innerText = `Welcome ${userRepository.currentUser.returnFirstName()}`;
  userEmail.innerText = `Email Address: ${userRepository.currentUser.email};`
  userStepGoal.innerText = `Daily Step Goal: ${userRepository.currentUser.dailyStepGoal}`;
  averageStepGoal.innerText = calculateStepDifference();
}


function calculateStepDifference() {
  let averageSteps = userRepository.returnAverageStepGoal();
  let userSteps = userRepository.currentUser.dailyStepGoal;
  let stepDifferece = averageSteps - userSteps;
  if (stepDifferece < 0) {
    return `Your step goal is ${Math.abs(stepDifferece)} steps more than the average user`
  } else if (stepDifferece > 0) {
    return `Your step goal is ${stepDifferece} steps less than the average user`
  } else {
    return 'Your step goal is on par with the average user'
  }
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showHydrationData() {
  averageOunces.innerText = `Average Daily water intake: ${hydration.calculateAverageOunces()}`
  selectedDateHydration.innerText = `Intake for ${selectedDate}: ${hydration.calculateDailyOunces(selectedDate)} fl oz`
  selectedWeekHydration.innerText = `Intake for Selected Week: ${hydration.calculateWeeklyOz(startDate)}`
}

// function showSleepData() {
//   hoursSleptLastNight.innerText = `Hours slept last night: ${sleep.}`
// }
