var easy_hard = document.getElementsByClassName("mode");
var colorDisplay = document.getElementById("colorDisplay");
var reset = document.getElementById("reset");
var square = document.getElementsByClassName("square");
var message = document.getElementById("message");
var correct_answer ;
var found = false;
var num_of_squares= 6;
var diff = true;

reset.addEventListener("click", generate_new_colors);


// now all works 
function generate_number()
{
	var red = Math.floor(Math.random() * 256);      // returns a random integer from 0 to 256
	var green = Math.floor(Math.random() * 256);      // returns a random integer from 0 to 256
	var blue = Math.floor(Math.random() * 256); 
	var col  = [red, green, blue];
	if (red === 25  && green === 25 && blue === 25)
		return generate_number(); 
	return [red, green, blue];
}
function generate_new_colors()
{
	var numbers = generate_number();
	correct_answer = "rgb(" + numbers[0] + ", " + numbers[1] + ", " + numbers[2] + ")";
	colorDisplay.innerHTML = "Color (" + numbers[0] + "," + numbers[1] + "," + numbers[2] + ")";

	for(var i = 0; i<square.length;i++)
	{
		square[i].style.display = "none";
	}
	if(diff)
		num_of_squares = 6 ;
	else 
	num_of_squares = 3 ;

	var correct = Math.floor(Math.random() * num_of_squares);
	square[correct].style.background = "rgb(" + numbers[0] + ", " + numbers[1] + ", " + numbers[2] + ")";

	for(var i = 0 ; i <num_of_squares; i ++)
	{
		square[i].style.display = "block";
		if(correct != i){
		var numbers = generate_number();
		square[i].style.background = "rgb(" + numbers[0] + ", " + numbers[1] + ", " + numbers[2] + ")" ;
		}
	}
	found  = false;
	message.textContent = "";

}
generate_new_colors();

for(var i = 0 ;i < easy_hard.length; i++)
{
	easy_hard[i].addEventListener("click", function()
	{
		easy_hard[0].classList.toggle("selected");
		easy_hard[1].classList.toggle("selected");
		diff = ! diff;
		generate_new_colors();
		console.log(diff);
	}
	);
}
for (var i = 0; i < square.length;i++)
{
	square[i].index = i ;
	square[i].addEventListener("click", function(e)
	{
		
		var target = e.target;
		// target.style.display = "none";
		if (target.style.background === correct_answer)
		{
				message.textContent = "Congratulations !!";
				
				found = true;
		}
		if (found === false)
		{
			console.log("clicked = "+ target.style.background); 
			console.log("ans  = "+ correct_answer);
			target.style.background = "#232323";
			message.textContent = "Try Again!";

		
		}
	}
	);
}