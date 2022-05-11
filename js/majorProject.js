/*
https://www.embracepetinsurance.com/waterbowl/article/measuring-my-cats-body-mass-index-the-fbmi
ribCage float Circumference of your cat's rib cage in inches. (The level of the 9th rib is ideal).
legLength float Length in inches of your cat's rear leg from knee to ankle. 
If the result is >= 42, your cat is overweight!
 */

window.onload = () => {
    let button = document.querySelector("#btn");
    // Function for calculating BMI
    button.addEventListener("click", calculateFBMI);
};
  
function calculateFBMI(ribCage, legLength) {
    /* Getting input from user's pet into ribCage cariable*/
    let ribCage = parseInt(document.querySelector("#ribCage").value);
  
    /* Getting input from user's pet into legLength cariable*/
    let legLength = parseInt(document.querySelector("#legLength").value);
  
    let result = document.querySelector("#result");
  
    // Checking the user providing a proper value or not
    if (ribCage === "" || isNaN(ribCage)) 
        result.innerHTML = "Provide a valid Rib Cage Circumference!";
  
    else if (legLegth === "" || isNaN(legLength)) 
        result.innerHTML = "Provide a valid Leg Length!";
  
    // If both input is valid, calculate the bmi
    else {

        // Fixing upto 2 decimal places

        let fbmi=((ribCage / 0.7062 - legLength) / 0.9156 - legLength).toFIxed(2);
        
        // Dividing as per the bmi conditions
        if (fbmi < 15) result.innerHTML =
            `Under Weight : <span>${fbmi}</span>`;
  
        else if (fbmi >= 15 && fbmi < 29.9) 
            result.innerHTML = 
            `Normal : <span>${fbmi}</span>`;
        
        else if (fbmi >= 30 && fbmi < 42) 
            result.innerHTML = 
            `Over Weight : <span>${fbmi}</span>`;

        else result.innerHTML =
            `Obese : <span>${fbmi}</span>`;
    }
}