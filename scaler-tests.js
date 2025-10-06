"use strict";
/**
 * Scaler Test Cases
 *
 * Demonstrates both manual scheduling and LLM-assisted scheduling
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleOutputTest = simpleOutputTest;
exports.llmOutputTest = llmOutputTest;
exports.scalingUpTest = scalingUpTest;
exports.scalingDownTest = scalingDownTest;
exports.manualScalingTest = manualScalingTest;
var scaler_1 = require("./scaler");
var gemini_llm_1 = require("./gemini-llm");
var console_1 = require("console");
/**
 * Load configuration from config.json
 */
function loadConfig() {
    try {
        var config = require('./config.json');
        return config;
    }
    catch (error) {
        console.error('❌ Error loading config.json. Please ensure it exists with your API key.');
        console.error('Error details:', error.message);
        process.exit(1);
    }
}
/*
    * Test case 1: Output for scaling
    * Demonstrates adding a recipe and scaling it using the LLM and printing the results
    */
function simpleOutputTest() {
    return __awaiter(this, void 0, void 0, function () {
        var scaler, ingredients, scaledIngredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n🧪 TEST CASE 1: Scaling Output');
                    console.log('==================================');
                    scaler = new scaler_1.Scaler();
                    ingredients = [
                        { item: 'Chicken Breast', quantity: 4, unit: 'pieces', scalingContext: 'main protein' },
                        { item: 'Olive Oil', quantity: 2, unit: 'tablespoons', scalingContext: 'cooking fat' },
                        { item: 'Garlic', quantity: 4, unit: 'cloves', scalingContext: 'flavoring. doesnt need to scale as much' },
                        { item: 'Lemon Juice', quantity: 2, unit: 'tablespoons', scalingContext: 'acid. scales more than regular ingredients' },
                        { item: 'Salt', quantity: 1, unit: 'teaspoon', scalingContext: 'seasoning. doesnt need to scale as much' },
                        { item: 'Black Pepper', quantity: 0.5, unit: 'teaspoon', scalingContext: 'seasoning. doesnt need to scale as much' },
                        { item: 'Mixed Vegetables', quantity: 4, unit: 'cups', scalingContext: 'side dish' }
                    ];
                    scaler.addRecipe('Lemon Garlic Chicken', 4, 12, ingredients, ['the chicken is dry without lemon so make sure to use a lot of that']);
                    return [4 /*yield*/, scaler.scaleRecipe(new gemini_llm_1.GeminiLLM(loadConfig()), 'Lemon Garlic Chicken')];
                case 1:
                    scaledIngredients = _a.sent();
                    console.log('\n🍽️ Scaled Ingredients for 10 people:');
                    scaledIngredients.forEach(function (ing) {
                        console.log("- ".concat(ing.quantity, " ").concat(ing.unit, " ").concat(ing.item, " (").concat(ing.scalingContext, ")"));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
/*
    * Test case 2: Output for scaling with LLM
    * Demonstrates adding a mulitple recipes and scaling the correct one
    */
function llmOutputTest() {
    return __awaiter(this, void 0, void 0, function () {
        var scaler, ingredients1, ingredients2, ingredients3, scaledIngredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n🧪 TEST CASE 2: Mulitple recipes');
                    console.log('==================================');
                    scaler = new scaler_1.Scaler();
                    ingredients1 = [
                        { item: 'Spaghetti', quantity: 400, unit: 'grams', scalingContext: 'main carbohydrate' },
                        { item: 'Ground Beef', quantity: 500, unit: 'grams', scalingContext: 'main protein' },
                        { item: 'Tomato Sauce', quantity: 2, unit: 'cups', scalingContext: 'sauce' }
                    ];
                    ingredients2 = [
                        { item: 'Chicken Breast', quantity: 4, unit: 'pieces', scalingContext: 'main protein' },
                        { item: 'Olive Oil', quantity: 2, unit: 'tablespoons', scalingContext: 'cooking fat' },
                        { item: 'Garlic', quantity: 4, unit: 'cloves', scalingContext: 'flavoring. doesnt need to scale as much' }
                    ];
                    ingredients3 = [
                        { item: 'Rice', quantity: 2, unit: 'cups', scalingContext: 'main carbohydrate' },
                        { item: 'Mixed Vegetables', quantity: 3, unit: 'cups', scalingContext: 'side dish' },
                        { item: 'Soy Sauce', quantity: 2, unit: 'tablespoons', scalingContext: 'flavoring' }
                    ];
                    scaler.addRecipe('Spaghetti Bolognese', 4, 8, ingredients1, ['the sauce is important so make sure to have enough']);
                    scaler.addRecipe('Lemon Garlic Chicken', 4, 12, ingredients2, ['the chicken is dry without lemon so make sure to use a lot of that']);
                    scaler.addRecipe('Vegetable Stir Fry', 4, 6, ingredients3, ['make sure to keep it healthy']);
                    return [4 /*yield*/, scaler.scaleRecipe(new gemini_llm_1.GeminiLLM(loadConfig()), 'Lemon Garlic Chicken')];
                case 1:
                    scaledIngredients = _a.sent();
                    (0, console_1.assert)(scaledIngredients.length > 0, 'No ingredients returned from scaling.');
                    (0, console_1.assert)(scaledIngredients.some(function (ing) { return ing.item === 'Chicken Breast'; }), 'Scaled ingredients do not include Chicken Breast.');
                    (0, console_1.assert)(scaledIngredients.some(function (ing) { return ing.item === 'Olive Oil'; }), 'Scaled ingredients do not include Olive Oil.');
                    (0, console_1.assert)(scaledIngredients.some(function (ing) { return ing.item === 'Garlic'; }), 'Scaled ingredients do not include Garlic.');
                    return [2 /*return*/];
            }
        });
    });
}
/*
    * Test case 3: Scaling a recipe up
    * Demonstrates scaling a recipe up where not every ingredient scales linearly
    */
function scalingUpTest() {
    return __awaiter(this, void 0, void 0, function () {
        var scaler, ingredients, scaledIngredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n🧪 TEST CASE 3: Scaling Up');
                    console.log('==================================');
                    scaler = new scaler_1.Scaler();
                    ingredients = [
                        { item: 'Pasta', quantity: 200, unit: 'grams', scalingContext: 'main carbohydrate' },
                        { item: 'Tomato Sauce', quantity: 1, unit: 'cup', scalingContext: 'sauce' },
                        { item: 'Parmesan Cheese', quantity: 0.5, unit: 'cup', scalingContext: 'topping. doesnt need to scale as much' },
                        { item: 'Basil', quantity: 5, unit: 'leaves', scalingContext: 'garnish. doesnt need to scale as much' }
                    ];
                    scaler.addRecipe('Pasta with Tomato Sauce', 2, 10, ingredients, ['the sauce is important so make sure to have enough']);
                    return [4 /*yield*/, scaler.scaleRecipe(new gemini_llm_1.GeminiLLM(loadConfig()), 'Pasta with Tomato Sauce')];
                case 1:
                    scaledIngredients = _a.sent();
                    (0, console_1.assert)(scaledIngredients.length > 0, 'No ingredients returned from scaling.');
                    (0, console_1.assert)(scaledIngredients.some(function (ing) { return ing.item === 'Parmesan Cheese'; }), 'Scaled ingredients do not include Cheese.');
                    (0, console_1.assert)(scaledIngredients.find(function (ing) { return ing.item === 'Parmesan Cheese'; }).quantity < 3, 'Cheese scaled too much.');
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Test case 4: Scaling a recipe down
 * Demonstrates scaling a recipe down where not every ingredient scales linearly
 */
function scalingDownTest() {
    return __awaiter(this, void 0, void 0, function () {
        var scaler, ingredients, scaledIngredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n🧪 TEST CASE 4: Scaling Down');
                    console.log('==================================');
                    scaler = new scaler_1.Scaler();
                    ingredients = [
                        { item: 'Pasta', quantity: 800, unit: 'grams', scalingContext: 'main carbohydrate' },
                        { item: 'Tomato Sauce', quantity: 4, unit: 'cups', scalingContext: 'sauce. do not scale down linearly to prevent dry noodles' },
                        { item: 'Parmesan Cheese', quantity: 2, unit: 'cups', scalingContext: 'topping. doesnt need to scale as much' },
                        { item: 'Basil', quantity: 20, unit: 'leaves', scalingContext: 'garnish. doesnt need to scale as much' }
                    ];
                    scaler.addRecipe('Pasta with Tomato Sauce', 8, 3, ingredients, ['the sauce is important so make sure to have enough']);
                    return [4 /*yield*/, scaler.scaleRecipe(new gemini_llm_1.GeminiLLM(loadConfig()), 'Pasta with Tomato Sauce')];
                case 1:
                    scaledIngredients = _a.sent();
                    (0, console_1.assert)(scaledIngredients.length > 0, 'No ingredients returned from scaling.');
                    (0, console_1.assert)(scaledIngredients.some(function (ing) { return ing.item === 'Parmesan Cheese'; }), 'Scaled ingredients do not include Cheese.');
                    (0, console_1.assert)(scaledIngredients.find(function (ing) { return ing.item === 'Parmesan Cheese'; }).quantity > 0.75, 'Cheese scaled too much.');
                    (0, console_1.assert)(scaledIngredients.some(function (ing) { return ing.item === 'Tomato Sauce'; }), 'Scaled ingredients do not include Tomato Sauce.');
                    (0, console_1.assert)(scaledIngredients.find(function (ing) { return ing.item === 'Tomato Sauce'; }).quantity > 1.5, 'Sauce scaled too much.');
                    return [2 /*return*/];
            }
        });
    });
}
/*
    * Test case 5: Manual Scaling Test
    * Demonstrates adding a recipe and scaling it manually without the LLM
    */
function manualScalingTest() {
    console.log('\n🧪 TEST CASE 5: Manual Scaling');
    console.log('==================================');
    var scaler = new scaler_1.Scaler();
    // Example recipe for 4 people
    var ingredients = [
        { item: 'Chicken Breast', quantity: 4, unit: 'pieces', scalingContext: 'main protein' },
        { item: 'Olive Oil', quantity: 2, unit: 'tablespoons', scalingContext: 'cooking fat' },
        { item: 'Garlic', quantity: 4, unit: 'cloves', scalingContext: 'flavoring. doesnt need to scale as much' },
        { item: 'Lemon Juice', quantity: 2, unit: 'tablespoons', scalingContext: 'acid. scales more than regular ingredients' },
        { item: 'Salt', quantity: 1, unit: 'teaspoon', scalingContext: 'seasoning. doesnt need to scale as much' },
        { item: 'Black Pepper', quantity: 0.5, unit: 'teaspoon', scalingContext: 'seasoning. doesnt need to scale as much' },
        { item: 'Mixed Vegetables', quantity: 4, unit: 'cups', scalingContext: 'side dish' }
    ];
    scaler.addRecipe('Lemon Garlic Chicken', 4, 12, ingredients, ['the chicken is dry without lemon so make sure to use a lot of that']);
    var result = scaler.scaleManually('Lemon Garlic Chicken');
    (0, console_1.assert)(result.length > 0, 'No ingredients returned from manual scaling.');
    (0, console_1.assert)(result.some(function (ing) { return ing.item === 'Chicken Breast'; }), 'Scaled ingredients do not include Chicken Breast.');
    (0, console_1.assert)(result.find(function (ing) { return ing.item === 'Chicken Breast'; }).quantity === 12, 'Chicken Breast quantity incorrect.');
    (0, console_1.assert)(result.some(function (ing) { return ing.item === 'Lemon Juice'; }), 'Scaled ingredients do not include Lemon Juice.');
    (0, console_1.assert)(result.find(function (ing) { return ing.item === 'Lemon Juice'; }).quantity === 6, 'Lemon Juice quantity incorrect.');
    (0, console_1.assert)(result.some(function (ing) { return ing.item === 'Salt'; }), 'Scaled ingredients do not include Salt.');
    (0, console_1.assert)(result.find(function (ing) { return ing.item === 'Salt'; }).quantity === 3, 'Salt quantity incorrect.');
    console.log('\nManually Scaled Ingredients for 12 people:');
    result.forEach(function (ing) {
        console.log("- ".concat(ing.quantity, " ").concat(ing.unit, " ").concat(ing.item, " (").concat(ing.scalingContext, ")"));
    });
}
/**
 * Main function to run all test cases
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🎓 Scaler Test Suite');
                    console.log('========================\n');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    // Run manual scheduling test
                    return [4 /*yield*/, simpleOutputTest()];
                case 2:
                    // Run manual scheduling test
                    _a.sent();
                    return [4 /*yield*/, llmOutputTest()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, scalingUpTest()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, scalingDownTest()];
                case 5:
                    _a.sent();
                    manualScalingTest();
                    console.log('\n🎉 All test cases completed successfully!');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('❌ Test error:', error_1.message);
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Run the tests if this file is executed directly
if (require.main === module) {
    main();
}
