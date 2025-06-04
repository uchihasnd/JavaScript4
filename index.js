import { universityInformation } from "./info.js";

//Function that returns all states without repeating
const getUniqueStates = (statesArray) => {
  return [...new Set(statesArray)];
};

function locationsTransformer(infoUniversity) {
  const statesArray = infoUniversity.features.map(
    ({ attributes: { State } }) => State
  );

  const university = infoUniversity.features.map(
    ({ attributes: { University_Chapter, State }, geometry: { x, y } }) => ({
      state: State,
      locationName: University_Chapter,
      latLng: [x, y],
    })
  );

  const states = getUniqueStates(statesArray);

  return { states, university };
}

const { states, university: universities } = locationsTransformer(
  universityInformation
);

//Display States in a list
const statesContainer = document.querySelector(".states");
const ul = document.createElement("ul");

states.forEach((state) => {
  const li = document.createElement("li");
  li.textContent = state;
  ul.appendChild(li);
});

statesContainer.appendChild(ul);

//Display the Universities and their coordinates in a table
const tbody = document.querySelector(".universities-table tbody");

universities.forEach((university) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${university.state}</td>
    <td class="university-title">${university.locationName}</td>
    <td>${university.latLng[0].toFixed(6)}</td>
    <td>${university.latLng[1].toFixed(6)}</td>
  `;
  tbody.appendChild(row);
});
