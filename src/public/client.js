const mainDiv = document.getElementById("main");
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

window.onload = () => {
  let store = {
    user: Immutable.Map({ name: "Javier" }),
    apod: "",
    rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"])
    //rovers: ["Curiosity", "Opportunity", "Spirit"]
  };
  mainDiv.innerHTML = renderOptions(store.rovers);
};

const renderOptions = rovers => {
  let menu = "";
  rovers.map(rover => {
    menu += `<button class="card" onclick="createUI('${rover}')">
    ${rover}
  </button>`;
  });
  return menu;
};

const App = data => {
  console.log(data);

  return `<header></header>
    <main>
      <section>
          <div>
          ${displayRoverData(data.photos[0])}
          </div>
          <button class ="back" onclick="chooseAgain()">
          Go back
        </button>
          <div class = "photocontainer">${displayRoverPictures(data.photos)} 
          
          </div>
          
      </section>
  </main>
  <footer></footer>
`;
};

const createUI = async rover => {
  mainDiv.style.display = "none";
  root.style.display = "block";
  const data = await roverData(rover);
  //const data = "foo";
  root.innerHTML = App(data);
};

const chooseAgain = () => {
  mainDiv.style.display = "flex";
  root.innerHTML = ``;
  root.style.display = "none";
};

//roverData("Curiosity").then(d => displayRover(d.photos));

const displayRoverData = roverData => {
  return `
  <h1>Name: ${roverData.rover.name}</h1>
  <h1>Launch Date: ${roverData.rover["launch_date"]}</h1>
  <h1>Landing Date: ${roverData.rover["landing_date"]}</h1>
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

// API call to server to get data from rovers
const roverData = async rover => {
  const url = "/roverData";
  const data = { rover: rover };
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(data)
  });
  return response.json();
};
