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
          <p>
          ${displayRoverData(data.photos[0])}
          
          </p>
          
      </section>
  </main>
  <footer></footer>
`;
};

const createUI = async rover => {
  const data = await roverData(rover);
  //const data = "foo";
  root.innerHTML = App(data);

  // const render = async (root, state) => {
  //     root.innerHTML = App(state);
  //   };
  // const data = await roverData(rover);
  // displayRoverData(data.photos[0]);
  // displayRoverPictures(data.photos);
  //constroverData(rover).then(d => displayRover(d.photos));
};
// listening for load event because page should load before any JS is called
// window.addEventListener("load", () => {
//   render(root, store);
// });

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
  roverData.map(rover => {
    return `<img src="${rover.img_src}" height="350px" width="100%" />`;
  });
};
// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = name => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = apod => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
  }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = state => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then(res => res.json())
    .then(apod => updateStore(store, { apod }));

  return data;
};
