import { BuildingFactory } from './classes/Factories.js';
let buildingCount = 0;
function addBuildingFields() {
    var _a;
    console.log("addBuildingFields ran!");
    buildingCount++;
    const container = document.getElementById('buildings-container');
    const div = document.createElement('div');
    div.className = 'building-group';
    div.id = `building-${buildingCount}`;
    div.innerHTML = `
        <label>floors:</label>
        <input type="number" name="floors" min="1" required />
        <label>elevators:</label>
        <input type="number" name="elevators" min="1" required />
        <button type="button" id="remove-${buildingCount}">❌ delete</button>
    `;
    container === null || container === void 0 ? void 0 : container.appendChild(div);
    (_a = document.getElementById(`remove-${buildingCount}`)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => removeBuilding(buildingCount));
}
function removeBuilding(id) {
    const div = document.getElementById(`building-${id}`);
    div === null || div === void 0 ? void 0 : div.remove();
}
function submitData() {
    var _a, _b, _c;
    const buildings = [];
    const container = document.getElementById('buildings-container');
    const groups = container === null || container === void 0 ? void 0 : container.getElementsByClassName('building-group');
    if (!groups)
        return;
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const floorsInput = group.querySelector('input[name="floors"]');
        const elevatorsInput = group.querySelector('input[name="elevators"]');
        if (!floorsInput || !elevatorsInput ||
            floorsInput.value.trim() === '' || elevatorsInput.value.trim() === '' ||
            parseInt(floorsInput.value) < 1 || parseInt(elevatorsInput.value) < 1) {
            alert('אנא מלא את כל השדות עם מספרים תקינים (1 ומעלה)');
            return;
        }
        buildings.push({
            floors: parseInt(floorsInput.value),
            elevators: parseInt(elevatorsInput.value),
        });
    }
    document.body.classList.remove('body-form-mode');
    document.body.classList.add('body-simulation-mode');
    container === null || container === void 0 ? void 0 : container.remove();
    (_a = document.getElementById("header")) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = document.getElementById('add-building-btn')) === null || _b === void 0 ? void 0 : _b.remove();
    (_c = document.getElementById('submit-btn')) === null || _c === void 0 ? void 0 : _c.remove();
    for (const b of buildings) {
        BuildingFactory.createBuilding(b.floors, b.elevators);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    addBuildingFields();
    (_a = document.getElementById('add-building-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addBuildingFields);
    (_b = document.getElementById('submit-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', submitData);
});
