//variable that holds the radio button value
let selectedPersonality;
//varable for student assigned house
let studentHouse;
//var for student name
let studentName;
//var for student mentor
let studentMentor;
//var for common room for the house assigned
let locationCommonRoom;
//var for the password to access common room
let commonRoomPassword;

//Dom that connects the button from the HTML to jacascript
const button = document.getElementById('btn');

//Dom that connects the button from Html to find the mentor
const buttonFindMentor = document.getElementById('findMentor');

//Dom that connects the button from Html to find the mentor
const buttonFindCommonRoom = document.getElementById('findCommonRoom');

//Array that holds all the options of the radio buttons
const radioButtons = document.querySelectorAll('input[name="personality"]');

//once the user click "Click" the follow event will happen:
button.addEventListener('click', async () => {
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
    houseAssigned.innerText = selectedPersonality
        ? await fetchFunction(selectedPersonality)
        : `You haven't selected any option`;
});

//function used to fetch the data from the API using the selected personality as parameter
//as later the house chosen will be on the screen according to the personality trait selected.
let fetchFunction = async (selectedPersonality) => {
    //variable that holds the API URL address
    const urlTest = 'https://wizard-world-api.herokuapp.com/Houses';

    //the fetch thing
    let resp = await fetch(urlTest);
    let data = await resp.json();
    try {
        //here this array is holding all the data returned from the fetch
        let wizardWorldDataArray = data;

        //here we will check each data returned to see if it is matching with the user input
        for (wizardWorldData of wizardWorldDataArray) {
            if (selectedPersonality == wizardWorldData.name) {
                //assigning the new student house with the house found on the fetch
                studentHouse = wizardWorldData.name;
                studentMentor =
                    wizardWorldData.heads[0].firstName +
                    ' ' +
                    wizardWorldData.heads[0].lastName;
                console.log(studentHouse);
                console.log(studentMentor);
                break;
            }

        }        
            console.log(data);

            console.log(studentHouse);


        console.log(studentHouse);
    } catch (e) {
        console.warn('Something went wrong in the fetch function');
    }

    //WHY IS THIS UNDEFINED?????????????
    console.log(studentHouse);
    console.log(studentName);
    //return the result of the school house chosen by the "hat"
    return studentHouse;
};

let assignNewStudentName = () => {
    //Assigning the name input to the new student

        studentName = document.getElementById("nameInput").value;
        outputName.innerText = 'Hi ' + studentName;
        console.log(studentName);
    
}


buttonFindMentor.addEventListener('click', () => {
    console.log(studentMentor);
    mentor.innerText = studentMentor;
});

buttonFindCommonRoom.addEventListener('click', () => {



    if (studentHouse == "Gryffindor") {
        locationCommonRoom = "Gryffindor Tower, through the Fat Lady's portrait";
        commonRoomPassword = "Caput Draconis";
    } else if (studentHouse == "Ravenclaw") {
        locationCommonRoom = "West side of the castle, top of the spiral staircase starting on the fifth floor. Door without a doorknob or keyhole, with a bronze knocker in the shape of an eagle.";
        commonRoomPassword = "Must answer a riddle asked by the eagle knocker";
    } else if (studentHouse == "Hufflepuff") {
        locationCommonRoom = "Below ground level behind a stack of barrels near the kitchens";
        commonRoomPassword = "Tap the barrel two from the bottom, middle of the second row, in the rhythm of the founder of the house";
    } else if (studentHouse == "Slytherin") {
        locationCommonRoom = "In the dungeons, behind an apparently blank stretch of wall.";
        commonRoomPassword = "Serpent";
    } else {
        locationCommonRoom = "It did not work!!!";
        commonRoomPassword = "It did not work!!!";

    }

    commonRoom.innerText =
        'The location of your common room is: ' +
        locationCommonRoom +
        ' PASSWORD: ' +
        commonRoomPassword;
});
