// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

  function applyFilter (filterFunction) {
    for (let colorArray of image) {
      let singleArray = colorArray;
      for (let i = 0; i < singleArray.length; i++) {
        let rgbString = singleArray[i];
        console.log(singleArray[i])
        let rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        singleArray[i] = rgbString;
      }
    }
  }

// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function

function keepInBounds (num) {
  return (num < 0) ? 0 : (num > 255) ? 255 : num;
}

// TODO 3: Create reddify function

//this makes the image red.
function reddify (array) {
  array[RED] = 200;
}

function decreaseBlue (array) {
  array[BLUE] = keepInBounds(array[BLUE] -= 50);
}

// TODO 6: Create more filter functions


// CHALLENGE code goes below here
