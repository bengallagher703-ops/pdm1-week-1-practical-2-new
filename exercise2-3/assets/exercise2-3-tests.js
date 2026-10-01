import { getCanvasPixelValues, getImagePixelValues, pixelValuesMatch, checkCanvasSize,
         TestResults, getShapes,
         checkSettingCalledBeforeShapes,
         BACKGROUND,
         checkBackground,
         TestSquare,
         TestCircle,
         checkShapes,
         advanceToFrame,
         checkOrderedPairOfShapes,
         testSettingIsCalled,
         NO_STROKE} from "https://cdn.jsdelivr.net/gh/Supportive-IDE/p5js-testing-demo@latest/p5jsTestingLibrary.js";
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
    const solutionPixels1 = await getImagePixelValues("./assets/exercise2-3.png", 600, 600);
    const resultsDiv = document.getElementById("results");
    const pixelsMatch = pixelValuesMatch(canvasPixels, solutionPixels1);
    if (pixelsMatch) {
        TestResults.addPass("Your sketch exactly matches the expected output!");
    } else {
        checkCanvasSize(300, 300);
        checkSettingCalledBeforeShapes(BACKGROUND.re, "background()", true, true);
        checkBackground(color(255), "white");
        const actualShapes = getShapes();
        const expectedShapes = [new TestSquare(0, 0, 100, "CORNER", true, true, color(0)),
                                new TestSquare(100, 100, 100, "CORNER", true, true, color(0)),
                                new TestSquare(200, 200, 100, "CORNER", true, true, color(0)),
                                new TestCircle(50, 50, 100, "CENTER", true, true, color(150)),
                                new TestCircle(150, 150, 100, "CENTER", true, true, color(150)),
                                new TestCircle(250, 250, 100, "CENTER", true, true, color(150))];
        checkShapes(expectedShapes, actualShapes, false, true);
        checkOrderedPairOfShapes(expectedShapes[0], expectedShapes[3], actualShapes, false);
        checkOrderedPairOfShapes(expectedShapes[1], expectedShapes[4], actualShapes, false);
        checkOrderedPairOfShapes(expectedShapes[2], expectedShapes[5], actualShapes, false);
        if (testSettingIsCalled(NO_STROKE.re, true, true)) {
            TestResults.addWarning("<code>noStroke()</code> is called. The shapes in the expected output have the default stroke. If you are confident your shapes match otherwise, remove <code>noStroke()</code> and all tests should pass.");
        }
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);