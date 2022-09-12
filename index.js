
//Student class: holds all the information of new students
class Student {
    constructor(name, house, mentor) {
        this.name = name;
        this.house = house;
        this.mentor = mentor;
    }
}

//variable that holds the radio button value
let selectedPersonality;
let house;

//instanciating a new Student and assigning their new attribute values
let newStudent = new Student();

//Dom that connects the button from the HTML to jacascript
const button = document.getElementById('btn');

//Dom that connects the button from Html to find the mentor
const buttonFindMentor = document.getElementById('findMentor');

//Dom that connects the button from Html to find the mentor
const buttonFindCommonRoom = document.getElementById('findCommonRoom');

//Array that holds all the options of the radio buttons
const radioButtons = document.querySelectorAll('input[name="personality"]');


//once the user click "Click" the follow event will happen:
button.addEventListener('click', () => {

    assignNewStudentName();

    //on this for I'm checking wether any radio button was selected or not
    for (const radioButton of radioButtons) {

        //condition to check if at least one radio buttons is selected
        if (radioButton.checked) {
            //assigning to a variable which value of the radio button was selected
            selectedPersonality = radioButton.value;
            break;
        }
    }

    //here the condition checks if any option was selected, if it was then it will call the fetch function to access the 
    //harry potter API, if none was selected a message will apear in the screen saying nothing was selected
    output.innerText = selectedPersonality ? fetchFunction(selectedPersonality) : `You haven't selected any option`;

});

//function used to fetch the data from the API using the selected personality as parameter
//as later the house chosen will be on the screen according to the personality trait selected.
let fetchFunction = (selectedPersonality) => {

    //variable that holds the API URL address
    const urlTest = 'https://wizard-world-api.herokuapp.com/Houses';

    //the fetch thing
    fetch(urlTest)
        .then(resp => resp.json())
        .then(data => {

            //here this array is holding all the data returned from the fetch
            let wizardWorldDataArray = data;

            //here we will check each data returned to see if it is matching with the user input
            for (wizardWorldData of wizardWorldDataArray) {
                if (selectedPersonality == wizardWorldData.name) {
                    //assigning the new student class parameter "house" with the house found on the fetch
                    newStudent.house = wizardWorldData.name;
                    newStudent.mentor = wizardWorldData.heads[0].firstName + ' ' + wizardWorldData.heads[0].lastName;
                    console.log(newStudent.house);
                    console.log(newStudent.mentor);
                    break;
                }
            }
            console.log(data);
            newStudent.house = house;
            console.log(newStudent.house);

        });

    //WHY IS THIS UNDEFINED?????????????
    console.log(newStudent.house);
    console.log(newStudent.name);
    //return the result of the school house chosen by the "hat"
    return `Hi ${newStudent.name}. Your house will be ${newStudent.house}`;
}

let assignNewStudentName = () => {
    //Assigning the name input to the new student
    newStudent.name = document.getElementById("nameInput").value;
    console.log(newStudent.name);
}

buttonFindMentor.addEventListener('click', () => {
    console.log(newStudent.mentor);
    mentor.innerText = 'Your house mentor is: ' + newStudent.mentor;
});

buttonFindCommonRoom.addEventListener('click', () => {
    let locationCommonRoom;
    let commonRoomPassword;

    if (newStudent.house == "Gryffindor") {
        locationCommonRoom = "Gryffindor Tower, through the Fat Lady's portrait";
        commonRoomPassword = "Caput Draconis";
    } else if (newStudent.house == "Ravenclaw") {
        locationCommonRoom = "West side of the castle, top of the spiral staircase starting on the fifth floor. Door without a doorknob or keyhole, with a bronze knocker in the shape of an eagle.";
        commonRoomPassword = "Must answer a riddle asked by the eagle knocker";
    } else if (newStudent.house == "Hufflepuff") {
        locationCommonRoom = "Below ground level behind a stack of barrels near the kitchens";
        commonRoomPassword = "Tap the barrel two from the bottom, middle of the second row, in the rhythm of the founder of the house";
    } else if (newStudent.house == "Slytherin") {
        locationCommonRoom = "In the dungeons, behind an apparently blank stretch of wall.";
        commonRoomPassword = "Serpent";
    }else{
        locationCommonRoom = "It did not work!!!";
        commonRoomPassword = "It did not work!!!";
    }

    commonRoom.innerText = 'The location of your common room is: ' + locationCommonRoom + ' PASSWORD: ' + commonRoomPassword;
});

