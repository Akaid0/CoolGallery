const track = document.getElementById("image-track"); //connect track to the div image-track

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX; //handleOnDown will register the position of the cursor when click is activated

const handleOnUp = () => { 
    track.dataset.mouseDownAt = "0"; //define the value of cursor position when activating click to "0"
    track.dataset.prevPercentage = track.dataset.percentage; //make the previous position on the scroll bar become the actual position (avoid reset to initial position)
}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return; //update the values of position when cursor stop moving

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) -e.clientX, //parseFloat return a number after analysing the string, here to calculate the diffrence between the cursor starting point and its actual position
          maxDelta = window.innerWidth /2; //Define the maximum scrolling difference to half the window (without = unlimited scroll of the gallery)

    const percentage = (mouseDelta / maxDelta) * -100, //Calculate the percentage of advancement of the position of teh cursor on the scroll bar
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage, //calculate the value of the new position on the scrollbar
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0),-100);// math.min or max return the smallest or biggest number in an array
                                                                                // Calculate if the new value is between the beggining and the ending of the scrollbar, if not it returns 0 = the beggining
    track.dataset.percentage = nextPercentage; //the new value on the scrollbar become the actual value

    track.animate({ 
        transform: `translate(${nextPercentage}%, -50%)` //set the moving animation of the picture based on the scrollbar movement/ percentage 
    }, { duration: 1200, fill: "forwards" }); //amount of time it's going and direction

    for(const image of track.getElementsByClassName("image")) { //set the animation on every images in the same time 
        image.animate({
            objectPosition: `${100 + nextPercentage}% center` //set the animation on the object-position of the image (css)
        }, { duration: 1200, fill: "forwards" }); //same amount of time and direction
    }
}

//declare the function ^
//express the function v

window.onmousedown = e => handleOnDown(e); 

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

