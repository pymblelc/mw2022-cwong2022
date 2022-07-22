/*
https://www.embracepetinsurance.com/waterbowl/article/measuring-my-cats-body-mass-index-the-fbmi
ribCage float Circumference of your cat's rib cage in inches. (The level of the 9th rib is ideal).
legLength float Length in inches of your cat's rear leg from knee to ankle. 
If the result is >= 42, your cat is overweight!
 */
/*
window.onload = () => {
    let button = document.querySelector("#btn");
    // Function for calculating BMI
    button.addEventListener("click", calculateBMI);
};
*/
var apikey = '61a3fa9b34abfc7f972efc08';
var url = 'https://cwong2022-aba2.restdb.io/rest/majorproject';

var apikey2 = '61a3fa9b34abfc7f972efc08';
var url2 = 'https://cwong2022-aba2.restdb.io/rest/catdata';

var apikey3 = '61a3fa9b34abfc7f972efc08';
var url3 = 'https://cwong2022-aba2.restdb.io/rest/chatboard';

var arrLogin = [''];

$('#calContainer').hide();
$('#registerContainer').hide();
$('#breedContainer').hide();
$('#chatContainer').hide();

$('#createAccount').click(function () {
    $('#createAccount').hide();
    $('#existedUser').hide();
    $('#registerContainer').show();
    registerContainer.style.top = "120px";
    visible = 'a';
});

$('#existedUser').click(function () {
    $('#existedUser').hide();
    $('#createAccount').hide();
    $('#breedContainer').show();
    visible = 'b';
});

$('#FBMIcal').click(function () {
    $('#calContainer').show();
    $('#createAccount').hide();
    $('#existedUser').hide();
    $('#registerContainer').hide();
    $('#breedContainer').hide();
    $('#chatContainer').hide();
    visible = 'c';
});

$('#user').click(function () {
    $('#calContainer').hide();
    $('#registerContainer').hide();
    $('#breedContainer').hide();
    $('#chatContainer').hide();
    $('#existedUser').show();
    $('#createAccount').show();
    visible = 'd';
});

$('#chatboard').click(function () {
    $('#chatContainer').show()
    $('#calContainer').hide();
    $('#registerContainer').hide();
    $('#breedContainer').hide();
    $('#existedUser').hide();
    $('#createAccount').hide();
    visible = 'e';
    getComment(url, apikey);
});

function calculateFBMI(ribCage, legLength) {
    // Checking the user providing a proper value or not
    console.log(ribCage);
    console.log(legLength);
    if (ribCage === "" || isNaN(ribCage)) {
        result.innerHTML = "Provide a valid Rib Cage Circumference!";
        document.getElementById('commend').innerHTML = "";
    }

    else if (legLegth === "" || isNaN(legLength)) {
        result.innerHTML = "Provide a valid Leg Legth!";
        document.getElementById('commend').innerHTML = "";
    }

    // If both input is valid, calculate the bmi
    else {
        // Fixing upto 2 decimal places
        let fbmi = ((ribCage / .7062 - legLength) / .9156 - legLength);
        console.log(fbmi);
        document.getElementById('result').innerHTML = fbmi;

        // Dividing as per the bmi conditions
        if (fbmi < 15) {
            document.getElementById('commend').innerHTML = "Under Weight";
            document.querySelector("#arrowImg").style.transform = "rotate(-90deg)";
            $('#arrowImg').animate({ top: "220px", left: "80px", transform: 'rotate(-90deg)' }, 4000);

        }
        else if (fbmi >= 15 && fbmi < 29.9) {
            document.getElementById('commend').innerHTML = "Normal";
            document.querySelector("#arrowImg").style.transform = "rotate(0deg)";
            $('#arrowImg').animate({ top: "190px", left: "135px", transform: 'rotate(0deg)' }, 4000);
        }
        else if (fbmi >= 30 && fbmi < 41.0) {
            document.getElementById('commend').innerHTML = "Over weight";
            document.querySelector("#arrowImg").style.transform = "rotate(90deg)";
            $('arrowImg').animate({ top: "220px", left: "190px", transform: 'rotate(90eg)' }, 4000);
            arrow.play();
        }
        else if (fbmi >= 42) {
            document.getElementById('commend').innerHTML = "Obese";
            document.querySelector("#arrowImg").style.transform = "rotate(90deg)";
            $('arrowImg').animate({ top: "220px", left: "190px", transform: 'rotate(90eg)' }, 4000);
            arrow.play();
        }
    }
}

// Get cat details from major project db
function getCat(url, apikey, username, password) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        searchCat(response, username, password);
    });
}

function getCatSick(catBreed) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url2,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey2,
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log("Inside sickness");
        var sicknessFound = false;
        //match the cat breed and return the potential sickness
        for (var i = 0; i < response.length; i++) {
            if (response[i].Breed === catBreed) {
                document.getElementById('catSick').innerHTML = "<h2> The potential sickness of your cat is " + response[i].disease + "  </h2>";
                sicknessFound = true;
            }
        }
        if (!sicknessFound) {

            document.getElementById('catSick').innerHTML = "<h2>No data for potential dieases in DB</h2>";
        }

    });
}

function searchCat(listOFCat, username, password) {
    var matched = false;
    var catBreed = '';
    for (var i = 0; i < listOFCat.length; i++) {
        // match the account details and return cat details   
        if (username === listOFCat[i].UserName && password === listOFCat[i].Password && isNaN(username) && isNaN(password)) {
            //    var catItem = '<div class="cat" id="' + listOFCat[i]._id + '"><img class="animalImg" src="' + listOFCat[i].ImgURL +'">'+ listOFCat[i].CatBreed + "</div>";
            //    $("body").append(catItem);
            document.getElementById('catPic').innerHTML = '<img class="animalImg" src="' + listOFCat[i].ImgURL + '">';
            document.getElementById('catInfo').innerHTML = "<h2> The breed of your cat is " + listOFCat[i].CatBreed + "  </h2>";
            catBreed = listOFCat[i].CatBreed
            getCatSick(catBreed);
            console.log("matched");
            matched = true;

        }
    }

    if (!matched) {
        document.getElementById('catInfo').innerHTML = "<h2>No match please try again or register below </h2></br> ";
        $('#registerContainer').show();
        registerContainer.style.top = '300px';
        document.getElementById('catPic').innerHTML = "";
        document.getElementById('catSick').innerHTML = "";
    }

}

// Add user information to DB
function addUser(item, url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log('Item successfully added');
        console.log(response);
    });

}

$('#btnRegister').click(function () {
    console.log('submitted');
    var tempItem = {
        ImgURL: $('#ImgURL').val(), UserName: $('#regisName').val(),
        Password: $('#regisPW').val(), CatBreed: $('#Breed').val()
    };
    addUser(tempItem, url, apikey);
})

$('#btnSearch').click(function () {
    console.log('Searching');
    var username = $('#InputUsername').val()
    var password = $('#InputPassword').val()
    console.log(username);
    console.log(password);
    getCat(url, apikey, username, password);
    $('#registerContainer').hide();
})

//chatboard testing 
//add comment to DB
function addComment(item, url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log('Message successfully added');
        console.log(response);
    });

}
//get comment data from DB
function getComment(url, apikey) {
    var serviceURL = url;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serviceURL,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        searchUser(response, userName, passWord); 
        var userFound = false;
        //match the user and retuen comment posted
        for (var i = 0; i < response.length; i++) {
            document.getElementById("displayComment").innerHTML += "<p>" + response[i].displayComment + "</p>";
            //username and password match
            // if ($('#chatName').val() == $('#chatPW').val()) {
            //     document.getElementById('user').innerHTML = response[i].user + ":" + response[i].commentMsg;
            //     userFound = true;
            // }
            if (userName === response[i].UserName && passWord === response[i].Password && isNaN(userName) && isNaN(passWord)){
                dispalyArea= displayUser + displayComment 
                document. getElementById('displayUser').innerHTML += "<p>" + response[i].userName + ":"; 
                document.getElementById('displayComment').innerHTML += + response[i].userComment + "</p>";

                //document. getElementById('displayArea').innerHTML += "<p>" + response[i].displayUser + response[i].displayComment + "</p>";
                userFound = true;
            };
        }
        // if (!userFound) {
        //     document.getElementById('user').innerHTML = "<h2>password or usernames is not matching</h2>";
        // }
    });

}

var userName = '';
var passWord = '';

$('#btnPost').click(function (){
    console.log('Posting');
    var userName = $('#chatName').val();
    var passWord = $('#chatPW').val();
    console.log(userName, passWord);
    getComment(url, apikey, userName, passWord); 
});


//search user from database 
function searchUser(listOFCat, username, password) {
    var matched = false;
    var userItem = '';
    for (var i = 0; i < listOFCat.length; i++) {
        //matchuser and store comment 
        console.log(listOFCat[i].UserName);
        console.log(username);
        // match the account details and return cat details   
        if (userName === listOFCat[i].UserName && passWord === listOFCat[i].Password && isNaN(username) && isNaN(password)) {
            addComment(userItem); 
            //var userItem = ''; 
            $("displayArea").append(userItem);
            matched = true;v
        }
    }

    // if (!matched) {
    //     document.getElementById('displayArea').innerHTML = "<h2>No match please try again or register below";
    // }

    $('#btnPost').click(function () {
        console.log('Posting');
        searchUser();
        var tempItem = { 
            "UserName": $('#chatName').val(), 
            "Password": $('#chatPW').val(), 
            "comment": $('#comment').val() 
        };
        addComment(tempItem, url, apikey);
        var username = $('#InputUsername').val()
        var password = $('#InputPassword').val()
        console.log(username);
        console.log(password);
        console.log(comment);
        getComment(url, apikey);
    })
}



//filter bad-words 
var filterWords = ["fool", "dumb"];
// "i" is to ignore case and "g" for global
var rgx = new RegExp(filterWords.join(""), "gi");

function wordFilter(str) {
    return str.replace(rgx, "****");
}
//run function 
wordFilter("abcd")

//random comment show in display area 
function shuffle(comment) {
    let currentIndex = comment.length, randomIndex;
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [comment[currentIndex], comment[randomIndex]] = [
            comment[randomIndex], comment[currentIndex]];
    }

    return comment;
}

// Used like so
// var arr = [comment];
// shuffle(arr);
// console.log(arr);