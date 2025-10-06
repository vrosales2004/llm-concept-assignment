# Recipe Scaler
A recipe scaler. This concept stores recipes and intelligently or manually scales these recipes to the desired level.

## Concept: [Original] Scaler

**Purpose**: Meant to store recipe and scale to the input factor \
**Principle**: recipe either manually inputted or uploaded along with scale factor
	    on scale, ingredient counts are scaled by the given factor

### Core State
- **Recipes**: Set of recipes with a name, scale factor, set of ingredients, and some cooking methods
- **Ingredients**: (Another concept) Ingredients include name, quantity, unit, and scaling context

### Core Actions
- `addRecipe(name: string, originalPeople: number, targetPeople: number, ingredients: Ingredient[], cookingMethods: string[])`
- `removeRecipe(name: string)`
- `scaleRecipe(name: string): Ingredient[]` - Linearly scales each ingredient

## Concept: [AI Augmented] Scaler

**Purpose**: Meant to store recipe and scale to the input factor \
**Principle**: recipe either manually inputted or uploaded along with scale factor
	    on scale, ingredient counts are scaled by the given factor
	    scale factor and entire recipe context taken into account through LLM when scaling

### Core State
- **Recipes**: Set of recipes with a name, scale factor, set of ingredients, and some cooking methods
- **Ingredients**: (Another concept) Ingredients include name, quantity, unit, and scaling context

### Core Actions
- `addRecipe(name: string, originalPeople: number, targetPeople: number, ingredients: Ingredient[], cookingMethods: string[])`
- `removeRecipe(name: string)`
- `scaleManually(name: string): Ingredient[]` - Manual scaler as fallback for AI version
- `scaleRecipe(name: string): Ingredient[]` - AI version of scaler

# User Journey
[User Interaction Sketches](./AI_Sketches.pdf)\
Just like before the AI implementation, the user will enter their entire recipe and the target number of people. After this step, the application will direct the user to wait until the LLM returns the new quantities of ingredients. This screen will show each of the ingredients with their new quantity. The user can then either click on each of the ingredients to show more context about the ingredient or directly ask the LLM about why an ingredient was scaled a certain way.

# Prompt Updates
### Prompt Change 1
The initial prompt update I decided to make was to make it clear that each of the ingredients could be scaled independently of each other, and they did not need to be linear. Upon initial testing, I could immediately notice that the LLM merely acted as a calculator, as it scaled each ingredient the exact same way. Making this change clear in the requirements encouraged the LLM to consider each ingredient independently of how others were scaled.

### Prompt Change 2
Another prompt change was making clearer notes for each ingredient. Initially, the “context” for each ingredient was meant to tell what the ingredient was used for (garnish, topping, side, etc.). It was clear that the LLM needed more information about each ingredient to be able to scale properly. For example, with a pasta scale-down test, the LLM removed much of the pasta sauce, so I updated the context to include that the sauce was still necessary even upon scaling down. The issue with this is that each context needs to be manually updated by the developer.

### Prompt Change 3
Another problem was that the LLM would sometimes give unusual amounts for certain ingredients. In the same pasta test case, I noticed that the basil leaves ingredient would sometimes be scaled to include a decimal. This does not make much sense since basil leaves are whole leaves and are not usually cut into fractions. Some better wording discouraged the LLM from assigning ingredients such as these with fractional amounts. This might still be need to be explicitly stated for less clear ingredients in the context of that ingredient.


# Possible LLM Issues / Validators
There are a few major issues that the LLM might produce. One problem could arise if the LLM doesn’t return all the ingredients that were input. This might happen when scaling down if the LLM decides to remove an ingredient altogether. Another issue is that an LLM does not take into account a cooking method. For example, some recipes require proteins to be cooked in a sauce, but this does not require scaling the sauce ingredients as much as the protein. Finally, the LLM might alter the ingredient quantities to unusual amounts. An example, a recipe might be scaled up to use 2.25 lemons because the LLM doesn’t know that this is an unusual number of lemons.

# How to run
Compile and run scaler-tests.ts