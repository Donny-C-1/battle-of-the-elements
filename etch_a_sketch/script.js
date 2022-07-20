"use strict"

setup();

// setBoardSize(100);

/* Functions */

function addColumns(number) {
    if (number < 1) return;
    let rows = document.querySelectorAll('.row');
    rows.forEach((row) => {
        let column = row.querySelector('.pixel');
        let extraColumns = number;
        while (extraColumns) {
            let clone = column.cloneNode(true);
            row.append(clone);
            extraColumns--;
        }
    })
    return;
}

function addRows(number) {
    if (number < 1) return;
    let row = document.querySelector('.row');
    while (number) {
        let clone = row.cloneNode(true);
        row.parentElement.append(clone);
        number--;
    }
    return;
}

function changeBgColor(e, color = "red", props) {
    if (props.randomColor === true) props.color = `rgb(${Math.ceil(Math.random()*255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}`;
    e.target.style.backgroundColor = props.color || color;
}

function clear() {
    document.querySelectorAll('.pixel').forEach((pixel) => {
        pixel.style.backgroundColor = "#fff";
    })
}

function removeColumns(number) {
    if (number > -1) return;
    let rows = document.querySelectorAll('.row');
    rows.forEach((row) => {
        let extraColumns = number;
        while (extraColumns) {
            row.querySelector('.pixel').remove();
            extraColumns++;
        }
    })
    return;
}

function removeRows(number) {
    if (number > -1) return;
    while (number) {
        document.querySelector('.row').remove();
        number++;
    }
    return;
}

function setBoardSize(num) {
    if (num < 1) return;
    setRows(num);
    setColumns(num);
    return;
}

function setColumns(number) {
    let row = document.querySelector('.row');
    let columns = row.querySelectorAll('.pixel');
    let missingColumns = number - columns.length;
    if (missingColumns === 0) return;
    switch (missingColumns > 0) {
        case true:
            addColumns(missingColumns);
            break;
        case false:
            removeColumns(missingColumns);
            break;
    }
    return;
}

function setRows(number) {
    let rows = document.querySelectorAll('.row');
    let missingRows = number - rows.length;
    if (missingRows === 0) return;
    switch (missingRows > 0) {
        case true:
            addRows(missingRows);
            break;
        case false:
            removeRows(missingRows);
            break;
    }
    return;
}

function setup() {
    const props = {
        color: "black",
        mousedown: false,
        randomColor: false
    }


    const resetBtn = document.querySelector('[data-function="reset"]');
    const colorBtn = document.querySelector('[data-function="choose-color"]');
    const sizeBtn = document.querySelector('[data-function="change-size"]');
    const sketchPad = document.querySelector('.sketch-pad');
    const randomColorBtn = document.querySelector('[data-function="randomize-colour"]');
    const eraser = document.querySelector('.eraser');


    resetBtn.addEventListener('click', clear);
    colorBtn.addEventListener('input', (e) => {
        props.color = e.target.value;
        props.randomColor = false;
    })
    eraser.addEventListener('click', () => {
        props.color = "white";
    })

    randomColorBtn.addEventListener('click', () => {
        props.randomColor = props.randomColor === true? false:true;
    })

    sizeBtn.addEventListener('input', (e) => {
        clear();
        setBoardSize(e.target.value);
    })
    sketchPad.addEventListener('mouseover', (e) => {
        if (e.target === e.currentTarget) return;
        if (props.mousedown) {
            changeBgColor(e, props.color, props);
        }
    })
    sketchPad.addEventListener('mouseup', () => {
        props.mousedown = false;
    })
    sketchPad.addEventListener('mousedown', (e) => {
        if (e.target === e.currentTarget) return;
        props.mousedown = true;
        changeBgColor(e, props.color, props);
    })
    sketchPad.addEventListener('mouseout', (e) => {
        if (e.target === e.currentTarget) props.mousedown = false;
    })
}