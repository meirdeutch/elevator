
// const building1 = BuildingFactory.createBuilding(20, 4);
// const building2 = BuildingFactory.createBuilding(20, 7);
import { BuildingFactory } from './classes/Factories.js';

let buildingCount = 0;

function addBuildingFields() {
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

    container?.appendChild(div);

    document.getElementById(`remove-${buildingCount}`)?.addEventListener('click', () => removeBuilding(buildingCount));
}

function removeBuilding(id: number) {
    const div = document.getElementById(`building-${id}`);
    div?.remove();
}

function submitData() {
    const buildings: { floors: number; elevators: number }[] = [];
    const container = document.getElementById('buildings-container');
    const groups = container?.getElementsByClassName('building-group');

    if (!groups) return;

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i] as HTMLElement;
        const floorsInput = group.querySelector('input[name="floors"]') as HTMLInputElement | null;
        const elevatorsInput = group.querySelector('input[name="elevators"]') as HTMLInputElement | null;

        if (
            !floorsInput || !elevatorsInput ||
            floorsInput.value.trim() === '' || elevatorsInput.value.trim() === '' ||
            parseInt(floorsInput.value) < 1 || parseInt(elevatorsInput.value) < 1
        ) {
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
    container?.remove(); // מוחק את כל קבוצות הבניינים
    document.getElementById("header")?.remove();
    document.getElementById('add-building-btn')?.remove();
    document.getElementById('submit-btn')?.remove();
    for (const b of buildings) {
        BuildingFactory.createBuilding(b.floors, b.elevators);
    }
}

// כברירת מחדל בניין אחד
window.addEventListener('DOMContentLoaded', () => {
    addBuildingFields();

    document.getElementById('add-building-btn')?.addEventListener('click', addBuildingFields);
    document.getElementById('submit-btn')?.addEventListener('click', submitData);
});
