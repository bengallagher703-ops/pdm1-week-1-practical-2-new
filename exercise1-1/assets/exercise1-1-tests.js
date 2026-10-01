import { getCanvasPixelValues, getImagePixelValues, pixelValuesMatch, 
        checkCanvasSize, checkBackground, checkStrokeColour,
        getShapes, checkShapes, TestCircle, TestResults, advanceToFrame, canvasStatus } from "https://cdn.jsdelivr.net/gh/Supportive-IDE/p5js-testing-demo@latest/p5jsTestingLibrary.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

async function runTests(canvas) {
    await advanceToFrame(2);
    const canvasPixels = getCanvasPixelValues(canvas);
    const solutionPixels = await getImagePixelValues("./assets/exercise1-1.png", 400, 400);
    const resultsDiv = document.getElementById("results");
    const pixelsMatch = pixelValuesMatch(canvasPixels, solutionPixels);
    if (pixelsMatch) {
        TestResults.addPass("Your sketch exactly matches the expected output!");
    } else {
        checkCanvasSize(200, 200);
        checkBackground(color(0), "black");
        checkStrokeColour(color(255), "white");
        const expectedShapes = [new TestCircle(100, 100, 100, CENTER, true, true, color(150), color(255), 1)];
        checkShapes(expectedShapes, getShapes(), false);
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
