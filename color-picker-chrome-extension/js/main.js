const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const clearAll = document.querySelector(".clear-all");

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied";
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

const showColors = () => {
    if (!pickedColors.length) return;
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background : ${color}; border: 1px solid ${color == '#ffffff' ? "#ccc" : color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>`
    ).join("");

    document.querySelector(".picked-colors").classList.remove("hide");
    //copy color event listener
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });

}
showColors();

const activateEyeDropper = async () => {
    document.body.style.display = "none";
    setTimeout(async () => {
        try {
            //opening eyedropper and getting selected color
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);

            //adding color to list if it doesnt already exist
            if (!pickedColors.includes(sRGBHex)) {
                pickedColors.push(sRGBHex);
                localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
                showColors();
            }

        } catch (error) {
            console.log("Failed to copy the color code!");
        }
    }, 10);

    document.body.style.display = "block";
}

const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearAllColors);