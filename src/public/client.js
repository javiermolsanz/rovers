const mainDiv = document.getElementById("main");
const root = document.getElementById("root");
const initialmessage = document.getElementById("initialmessage");

// const updateStore = (store, newState) => {
//   store = Object.assign(store, newState);
//   render(root, store);
// };

window.onload = () => {
  let store = {
    user: Immutable.Map({ name: "Javier" }),
    apod: "",
    rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"])
  };
  mainDiv.innerHTML = renderOptions(store.rovers);
};

const renderOptions = rovers => {
  let menu = "";
  rovers.map(rover => {
    menu += `<button class="card" onclick="createUI('${rover}', App)">
    ${rover}
  </button>`;
  });
  return menu;
};

//Higher order function
const createUI = async (rover, callback) => {
  initialmessage.style.display = "none";
  mainDiv.style.display = "none";
  root.style.display = "block";
  const data = await roverData(rover, handleError);
  root.innerHTML = callback(data);
};

const App = data => {
  if (data) {
    return `<header>
    <div class="head">Rovers Project<div>
    </header>
    <main>
      <section>
          <div class="infocontainer">
          ${displayRoverData(data.latest_photos[0])}
          </div>
          <button class ="back" onclick="chooseAgain()">
          Choose Again
        </button>
          <div class = "photocontainer">${displayRoverPictures(
            data.latest_photos
          )} 
          
          </div>
          
      </section>
  </main>
  <footer></footer>
`;
  } else {
    return `<header></header>
    <main></main>
    <button class ="back" onclick="chooseAgain()">
    <h1>Sorry, something went wrong. Try again later</h1>
    <footer></footer>
    `;
  }
};

const chooseAgain = () => {
  mainDiv.style.display = "flex";
  root.innerHTML = ``;
  root.style.display = "none";
  initialmessage.style.display = "block";
};

//roverData("Curiosity").then(d => displayRover(d.photos));

const displayRoverData = roverData => {
  return `
  <h1>Name: ${roverData.rover.name}</h1>
  <h1>Launch Date: ${roverData.rover["launch_date"]}</h1>
  <h1>Landing Date: ${roverData.rover["landing_date"]}</h1>
  <h1>Photo Date: ${roverData["earth_date"]}</h1>
  <h1>Status: ${roverData.rover.status}</h1>
  `;
};

const displayRoverPictures = roverData => {
  let images = ``;
  roverData.map(rover => {
    images += `<img src="${rover.img_src}" class="image"/>`;
  });
  return images;
};
// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

// Example of a pure function that renders infomation requested from the backend

// ------------------------------------------------------  API CALLS

// API call to server to get data from rovers, this is also a higher order function
const roverData = async (rover, errorHandler) => {
  const url = "/roverData";
  const data = { rover: rover };
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (e) {
    errorHandler(e);
  }
};

const handleError = e => {
  alert(`There was a problem fetching the data: ${e}`);
};
