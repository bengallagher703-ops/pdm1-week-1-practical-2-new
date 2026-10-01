import { getCanvasPixelValues, getImagePixelValues, pixelValuesMatch, checkCanvasSize, checkBackground,
         TestResults, checkShapes, getShapes, TestEllipse, TestRectangle, advanceToFrame } from "https://cdn.jsdelivr.net/gh/Supportive-IDE/p5js-testing-demo@latest/p5jsTestingLibrary.js";
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
    advanceToFrame(2);
    const canvasPixels = getCanvasPixelValues(canvas);
    const solutionPixels = await getImagePixelValues("./assets/exercise1-3.png", 400, 400);
    const resultsDiv = document.getElementById("results");
    const pixelsMatch = pixelValuesMatch(canvasPixels, solutionPixels);
    if (pixelsMatch) {
        TestResults.addPass("Your sketch exactly matches the expected output!");
    } else {
        checkCanvasSize(200, 200);
        checkBackground(color(150), "grey (150)");
        const expectedShapes = [new TestEllipse(100, 50, 80, 20), 
                                new TestRectangle(100, 125, 100, 50, CENTER, true, true, color(0))];
        checkShapes(expectedShapes, getShapes(), false, true);
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);