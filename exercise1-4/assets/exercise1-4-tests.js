import { getCanvasPixelValues, getImagePixelValues, pixelValuesMatch, checkCanvasSize, checkBackground,
         TestResults, checkShapes, getShapes, TestCircle, advanceToFrame } from "https://cdn.jsdelivr.net/gh/Supportive-IDE/p5js-testing-demo@latest/p5jsTestingLibrary.js";
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
    // advanceToFrame(2);
    const canvasPixels = getCanvasPixelValues(canvas);
    const solutionPixels = await getImagePixelValues("./assets/exercise1-4.png", 400, 400);
    const resultsDiv = document.getElementById("results");
    const pixelsMatch = pixelValuesMatch(canvasPixels, solutionPixels);
    if (pixelsMatch) {
        TestResults.addPass("Your sketch exactly matches the expected output!");
    } else {
        checkBackground(color(255), "white");
        checkCanvasSize(200, 200);
        const expectedShapes = [new TestCircle(50, 50, 200), 
                                new TestCircle(120, 120, 50)];
        checkShapes(expectedShapes, getShapes(), true, true);
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);