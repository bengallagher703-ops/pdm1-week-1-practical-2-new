import { getCanvasPixelValues, getImagePixelValues, pixelValuesMatch, checkCanvasSize,
         TestResults, getShapes,
         checkSettingCalledBeforeShapes,
         NO_STROKE,
         TestSquare,
         checkShapesWithMultipleSolutions,
         advanceToFrame,
         checkBackgroundIsCalledInDraw} from "https://cdn.jsdelivr.net/gh/Supportive-IDE/p5js-testing-demo@latest/p5jsTestingLibrary.js";
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
    const solutionPixels = await getImagePixelValues("./assets/exercise2-1.png", 800, 800);
    const resultsDiv = document.getElementById("results");
    const pixelsMatch = pixelValuesMatch(canvasPixels, solutionPixels);
    if (pixelsMatch) {
        TestResults.addPass("Your sketch exactly matches the expected output!");
    } else {
        checkCanvasSize(400, 400);
        checkSettingCalledBeforeShapes(NO_STROKE.re, "noStroke()", true, true);
        checkBackgroundIsCalledInDraw();
        const backgrounds = [];
        // black square and grey square, white background
        const solution1 = [new TestSquare(0, 0, 200, CORNER, false, true, color(0)),
                           new TestSquare(200, 200, 200, CORNER, false, true, color(150))];
        backgrounds.push(color(255));
        // black square, grey square, two white squares
        const solution2 = [new TestSquare(0, 0, 200, CORNER, false, true, color(0)),
                            new TestSquare(200, 200, 200, CORNER, false, true, color(150)),
                            new TestSquare(200, 0, 200, CORNER, false),
                            new TestSquare(0, 200, 200, CORNER, false)];
        backgrounds.push(null);
        // black background, grey square, two white squares
        const solution3 = [new TestSquare(200, 200, 200, CORNER, false, true, color(150)),
                            new TestSquare(200, 0, 200, CORNER, false),
                            new TestSquare(0, 200, 200, CORNER, false)];
        backgrounds.push(color(0));
        // grey background, black square, two white squares
        const solution4 = [new TestSquare(0, 0, 200, CORNER, false, true, color(0)),
                            new TestSquare(200, 0, 200, CORNER, false),
                            new TestSquare(0, 200, 200, CORNER, false)];
        backgrounds.push(color(150));
        checkShapesWithMultipleSolutions([solution1, solution2, solution3, solution4], backgrounds, getShapes(), false, true);
        
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);