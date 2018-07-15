var config = {
    apiKey: "AIzaSyDzh_he-SzcQS9KqX6CPHGu7bUWqSzlOFU",
    authDomain: "train-homework-2.firebaseapp.com",
    databaseURL: "https://train-homework-2.firebaseio.com",
    projectId: "train-homework-2",
    storageBucket: "train-homework-2.appspot.com",
    messagingSenderId: "743001518413"
  };
  firebase.initializeApp(config);

var database = firebase.database();

  




var train = "";
var destination = "";
var trainTime = 0;
var frequency = 0;



  
now = moment().format("HH:mm");
console.log(now);  

$("#submit").on("click", function(event) {
    event.preventDefault();

    
    

    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();

      

        
    

    var trainObject = {
        
        train: train,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    };

    database.ref().push(trainObject);
            

    database.ref().on("child_added", function(snapshot) {
            var x = snapshot.val();

            var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);
            var currentTime = moment().format("HH:mm");
            console.log("Current Time: " + currentTime);
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("Difference In Time: " + diffTime);

            var tRemainder = diffTime % frequency;
            console.log(tRemainder);

            var minutesUntilNextTrain = frequency - tRemainder;
            console.log("Minutes Till Next Train: " + minutesUntilNextTrain);
            //var freqConversion = moment(frequency, "mm");
            var nextTrain = moment(minutesUntilNextTrain).add(nextTrain, "minutes");
            console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
            var timeDisplay = moment.unix(nextTrain).format("HH:mm");

            var timeOfNextTrain = moment().add(minutesUntilNextTrain, "minutes");

            
            

            console.log(x);
            $("#upcoming-trains > tbody").append("<tr><td>" + x.train + "</td><td>" + x.destination + "</td><td>" + x.frequency + "</td><td>" + moment(timeOfNextTrain).format("hh:mm") +"</td><td>" + minutesUntilNextTrain + "</td>");


    });
});
  

