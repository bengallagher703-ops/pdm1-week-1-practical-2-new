import { getCanvasPixelValues, getImagePixelValues, pixelValuesMatch, checkCanvasSize,
         TestResults, getShapes,
         checkSettingCalledBeforeShapes,
         BACKGROUND,
         getLastBackgroundCallBeforeShapes,
         convertArgStringToColor,
         coloursMatch,
         advanceToFrame,
         canvasStatus} from "https://cdn.jsdelivr.net/gh/Supportive-IDE/p5js-testing-demo@latest/p5jsTestingLibrary.js";
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

function allShapesAreColour(allShapes, colour) {
    for (const shape of allShapes) {
        if (!coloursMatch(shape.fillColour, colour)) return false;
    }
    return allShapes > 0;
}

function checkAllPossibleColourCombinations() {
    const lastBackgroundCall = getLastBackgroundCallBeforeShapes();
    const actualShapes = getShapes();
    const WHITE = color(255);
    const BLACK = color(0);
    const TRANSPARENT = color(255, 255, 255, 0);
    const bgColour = canvasStatus.backgroundColour
    if (actualShapes.length === 0) {
        TestResults.addFail("You have not drawn any shapes.");
    } else {
        if (coloursMatch(bgColour, WHITE)) {
            const allShapesAreBlack = allShapesAreColour(actualShapes, BLACK);
            if (allShapesAreBlack) {
                TestResults.addPass("The background is white and all your shapes are black.");
            } else {
                TestResults.addFail("The background is white so all your shapes should be black.");
            }
        } else if (coloursMatch(bgColour, BLACK)) {
            const allShapesAreWhite = allShapesAreColour(actualShapes, WHITE);
            if (allShapesAreWhite) {
                TestResults.addPass("The background is black and all your shapes are white.");
            } else {
                TestResults.addFail("The background is black so all your shapes should be white.");
            }
        } else if (coloursMatch(bgColour, TRANSPARENT)) {
            TestResults.addFail("The background colour is not set. The default background colour is transparent, which may appear white against a white page, but it is not the same. Set background to white.");
        }
    }
}


async function runTests(canvas) {
    advanceToFrame(2);
    const canvasPixels = getCanvasPixelValues(canvas);
    const solutionPixels1 = await getImagePixelValues("./assets/exercise2-2-white_bg.png", 600, 600);
    const solutionPixels2 = await getImagePixelValues("./assets/exercise2-2-white_bg_noStroke.png", 600, 600);
    const solutionPixels3 = await getImagePixelValues("./assets/exercise2-2-black_bg.png", 600, 600);
    const resultsDiv = document.getElementById("results");
    const pixelsMatch = pixelValuesMatch(canvasPixels, solutionPixels1) || pixelValuesMatch(canvasPixels, solutionPixels2)
                        || pixelValuesMatch(canvasPixels, solutionPixels3);
    if (pixelsMatch) {
        TestResults.addPass("Your sketch exactly matches the expected output!");
    } else {
        TestResults.addFail("Your sketch does not match the expected output. Check the other test results to find out why. If there are no other failing tests, then it is likely the shapes you have drawn aren't quite right. Look carefully at each shape's position and dimensions.");
        checkCanvasSize(300, 300);
        checkSettingCalledBeforeShapes(BACKGROUND.re, "background()", true, true);
        checkAllPossibleColourCombinations();
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);