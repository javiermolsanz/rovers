let store = {
  user: { name: "Student" },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"]
};
const mainDiv = document.getElementById("main");

// add our markup to the page
const root = document.getElementById("root");

mainDiv.addEventListener("click", () => {
  mainDiv.style.display = "none";
  root.style.display = "block";
  //root.innerHTML = App();
});

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

// const render = async (root, state) => {
//   root.innerHTML = App(state);
// };

// create content
// const App = state => {
//   let { rovers, apod } = state;

//   return `
//         <header></header>
//         <main>
//             ${Greeting(store.user.name)}
//             <section>
//                 <h3>Put things on the page!</h3>
//                 <p>Here is an example section.</p>
//                 <p>
//                 </p>
//                 ${ImageOfTheDay(apod)}
//             </section>
//         </main>
//         <footer></footer>
//     `;
// };

const App = data => {
  console.log(data);

  return `<header></header>
    <main>
      <section>
          <h3>Put things on the page!</h3>
          <div>
          <button onclick="chooseAgain()">
          Go back
        </button>
          ${displayRoverData(data.photos[0])}
          ${displayRoverPictures(data.photos)}
          </div>
          
      </section>
  </main>
  <footer></footer>
`;
};

const createUI = async rover => {
  const data = await roverData(rover);
  //const data = "foo";
  root.innerHTML = App(data);
};

const chooseAgain = () => {
  mainDiv.style.display = "flex";
  mainDiv.setAttribute("class", "main");
  root.innerHTML = ``;
  root.style.display = "none";
};

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
    images += `<img src="${rover.img_src}" height="350px" width="50%" />`;
  });
  return images;
};
// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

// Example of a pure function that renders infomation requested from the backend

// ------------------------------------------------------  API CALLS

// Example API call
