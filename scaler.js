"use strict";
/**
 * Scaler Concept - AI Augmented Version
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
exports.Scaler = void 0;
var Scaler = /** @class */ (function () {
    function Scaler() {
        this.recipes = new Map();
    }
    Scaler.prototype.addRecipe = function (name, originalPeople, targetPeople, ingredients, cookingMethods) {
        var scaleFactor = targetPeople / originalPeople;
        var newRecipe = {
            name: name,
            scaleFactor: scaleFactor,
            ingredients: ingredients,
            cookingMethods: cookingMethods
        };
        this.recipes.set(name, newRecipe);
    };
    Scaler.prototype.scaleManually = function (name) {
        var recipe = this.recipes.get(name);
        if (!recipe) {
            throw new Error("Recipe \"".concat(name, "\" not found."));
        }
        return recipe.ingredients.map(function (ing) { return ({
            item: ing.item,
            quantity: parseFloat((ing.quantity * recipe.scaleFactor).toFixed(2)),
            unit: ing.unit,
            scalingContext: ing.scalingContext
        }); });
    };
    Scaler.prototype.scaleRecipe = function (llm, name) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe, prompt_1, response, sanitizedResponse, parsedResponse, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recipe = this.recipes.get(name);
                        if (!recipe) {
                            throw new Error("Recipe \"".concat(name, "\" not found."));
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log('🤖 Requesting scaled recipe from Gemini AI...');
                        prompt_1 = this.createScalePrompt(recipe);
                        return [4 /*yield*/, llm.executeLLM(prompt_1)];
                    case 2:
                        response = _a.sent();
                        console.log('✅ Received response from Gemini AI!');
                        console.log('\n🤖 RAW GEMINI RESPONSE');
                        console.log('======================');
                        console.log(response);
                        console.log('======================\n');
                        sanitizedResponse = response.replace(/```(?:json)?/g, '').trim();
                        parsedResponse = JSON.parse(sanitizedResponse);
                        return [2 /*return*/, parsedResponse.ingredients];
                    case 3:
                        error_1 = _a.sent();
                        console.error('❌ Error scaling recipe using AI:', error_1.message);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create the prompt for Gemini with hardwired preferences
     */
    Scaler.prototype.createScalePrompt = function (recipe) {
        return "\n        You are a helpful AI assistant that scales ingredients for recipes.\n\n        - Input: A recipe with a name, scale factor, list of ingredients, and cooking methods.\n        - Output: A JSON object with the scaled ingredients, maintaining the scaling context for each ingredient.\n\n        - Each ingredient has:\n            - item: The name of the ingredient.\n            - quantity: The original quantity of the ingredient.\n            - unit: The unit of measurement for the ingredient.\n            - scalingContext: A description of helpful information to be used when deciding on how much to scale the ingredient.\n\n        The final output list of ingredients should be able to feed the specified number of people based on the scale factor.\n        Each ingredient should be scaled appropriately, considering its scaling context (some ingredients might not need to be scaled exactly according to the scale factor).\n\n        CRITICAL REQUIREMENTS:\n        - Scale the ingredients based on the scale factor provided (does NOT need to be followed strictly).\n        - Maintain the scaling context for each ingredient.\n        - Return the result in a strict JSON format as specified below.\n\n        Here is the recipe to scale:\n        ".concat(JSON.stringify(recipe, null, 2), "\n\n        Return your response as a JSON object with this exact structure:\n        {\n        \"name\": \"Example Recipe\",\n        \"ingredients\": [\n            {\n            \"item\": \"Ingredient Name\",\n            \"quantity\": 0,\n            \"unit\": \"Unit of Measurement\",\n            \"scalingContext\": \"Scaling Context Description\"\n            }\n        ]\n        }\n\n        Return ONLY the JSON object, no additional text.");
    };
    return Scaler;
}());
exports.Scaler = Scaler;
