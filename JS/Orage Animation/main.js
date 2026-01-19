const video = document.querySelector("#video");
const boxes = document.querySelectorAll(".box");

function draw(){
    boxes.forEach((box)=>{
        const canvas = box.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        const rect = box.getBoundingClientRect();

        canvas.width= rect.width;
        canvas.height = rect.height;
        
        ctx.imageSmoothingEnabled=true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            video,
            -rect.left,
            -rect.top,
            window.innerWidth,
            window.innerHeight,
        );
    });
    requestAnimationFrame(draw);
    
}

video.addEventListener("loadedmetadata", () => {
    video.play();
    draw();

});

boxes.forEach(box=>{
    let isDragging = false;
    let offsetX, offsetY;

    box.addEventListener("mousedown", (e) => {
        isDragging= true;
        box.style.cursor = "grabbing";
        offsetX= e.clientX - box.offsetLeft;
        offsetY= e.clientY - box.offsetTop;
    })

    document.addEventListener("mouseup", () => {
        isDragging = false;
        box.style.cursor = "grab";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            box.style.left = `${e.clientX - offsetX}px`;
            box.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", (e)=>{
        isDragging=false;
        box.style.cursor
    })
});