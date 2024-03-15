const AppError = require("../utils/AppError");
const { randomUUID } = require("crypto");
const checkIfIsASimilarString = require("../utils/checkIfIsASimilarString");

class MealsService {
    constructor(mealsRepository) {
        this.mealsRepository = mealsRepository;
    }

    async create({ image_path, name, category, ingredients, price, description }) {
        if (!image_path || !name || !category || !ingredients || !price || !description) {
            throw new AppError("Preencha todos os campos para cadastrar um novo prato");
        }

        const meal_id = randomUUID();

        await this.mealsRepository.create({ meal_id, image_path, name, category, price, description })

        ingredients.map(async (ingredient) => {
            const ingredient_id = randomUUID();

            await this.mealsRepository.createIngredient({ ingredient_id, ingredient, meal_id });
        })
    }

    async fetchMeals(search) {
        const meals = await this.mealsRepository.fetchMeals(search);

        return meals;
    }

    async fetchMeal(meal_id) {
        const meal = await this.mealsRepository.fetchMeal(meal_id);

        return meal;
    }

    async update({
        meal_id,
        image_path,
        name,
        category,
        ingredients,
        preco,
        description
    }) {
        const meal = await this.mealsRepository.fetchMeal(meal_id);

        meal.image_path = image_path ?? meal.image_path;
        meal.name = name ?? meal.name;
        meal.category = category ?? meal.category;
        meal.preco = preco ?? meal.preco;
        meal.description = description ?? meal.description;

        const statusMeal = await this.mealsRepository.updateMeal({
            meal_id,
            image_path,
            name,
            category,
            preco,
            description
        });

        if (ingredients) {
            const requestIngredients = ingredients.map(ingredient => {
                return { name: ingredient }
            })

            let mealIngredients = await this.mealsRepository.fetchIngredients(meal_id);

            // check if any ingredients have been removed

            function CheckIfAIngredientHaveBeenExcluded(reqIngredients, dbIngredients) {
                const results = [];
                const ingredientsToRemove = [];

                dbIngredients.map(dbIngredient => {
                    let aux = false;
                    reqIngredients.map(reqIngredient => {
                        aux = aux || dbIngredient.name.includes(reqIngredient.name.toLowerCase());
                    })

                    let correspondingString;
                    const limit = 3;

                    for (let ingredient of reqIngredients) {
                        if (checkIfIsASimilarString(ingredient.name.toLowerCase(), dbIngredient.name.toLowerCase()) <= limit) {
                            correspondingString = true;
                        }
                    }

                    if (!aux && !correspondingString) {
                        ingredientsToRemove.push(dbIngredient.name)
                    }

                    results.push(aux);
                })

                let result = true;
                for (let i = 0; results.length > i; i++) {
                    result = result && results[i];
                }

                return { result, ingredientsToRemove };
            }

            const { result, ingredientsToRemove } = CheckIfAIngredientHaveBeenExcluded(requestIngredients, mealIngredients);

            // console.log("Algum ingrediente foi removido? ", (!result && ingredientsToRemove.length > 0));

            if (!result && ingredientsToRemove.length > 0) {
                // console.log("Lista para remover: ", ingredientsToRemove);

                ingredientsToRemove.map(async (ingredientToRemove) => {
                    await this.mealsRepository.deleteIngredient({ name: ingredientToRemove, meal_id });
                })

                mealIngredients = await this.mealsRepository.fetchIngredients(meal_id);
            }

            // check if any ingredients have been changed

            function checkIfIngredientsIsChange(reqIngredients, dbIngredients) {
                const results = [];
                const ingredientsToChange = [];
                const valuesToChangeIngredients = [];

                dbIngredients.map(dbIngredient => {
                    let aux = false;

                    reqIngredients.map(reqIngredient => {
                        aux = aux || reqIngredient.name === dbIngredient.name
                        // console.log(`${reqIngredient.name} === ${dbIngredient.name}: ${aux}`)
                    })

                    if (!aux) {
                        ingredientsToChange.push(dbIngredient.name);

                        const limit = 3;

                        for (let ingredient of reqIngredients) {
                            if (checkIfIsASimilarString(ingredient.name.toLowerCase(), dbIngredient.name.toLowerCase()) <= limit) {
                                valuesToChangeIngredients.push(ingredient.name);
                            }
                        }

                    }

                    results.push(aux);
                })

                let result = true;
                results.forEach(resultValue => {
                    result = result && resultValue;
                });

                return { result, ingredientsToChange, valuesToChangeIngredients };
            }

            const { result: ingredientsHaveChanged, ingredientsToChange, valuesToChangeIngredients } = checkIfIngredientsIsChange(requestIngredients, mealIngredients);

            // console.log("Tem algo para mudar? ", !ingredientsHaveChanged);

            if (!ingredientsHaveChanged) {
                // console.log("Lista de ingredientes para mudar: ", ingredientsToChange);
                // console.log("Valores dos itens que vão mudar: ", valuesToChangeIngredients);

                ingredientsToChange.map(async (ingredientsToChange, index) => {
                    await this.mealsRepository.updateIngredient({
                        oldValue: ingredientsToChange,
                        newValue: valuesToChangeIngredients[index],
                        meal_id
                    })
                })

                mealIngredients = await this.mealsRepository.fetchIngredients(meal_id);
            }

            // check if any ingredients have been created

            function checkIngredientCreated(reqIngredients, dbIngredients) {
                const resultsOfIsEqual = [];
                const ingredientsToCreate = [];

                reqIngredients.map(reqIngredient => {
                    let isEqual = false;

                    dbIngredients.map(dbIngredient => {
                        isEqual = isEqual || reqIngredient.name === dbIngredient.name;
                    })

                    if(!isEqual){
                        ingredientsToCreate.push(reqIngredient.name);    
                    }

                    resultsOfIsEqual.push(isEqual);
                })

                let result = true;
                resultsOfIsEqual.forEach(resultValue => {
                    result = result && resultValue;
                });

                return {result, ingredientsToCreate}
            }

            const {result: hasIngredientsToCreate, ingredientsToCreate} = checkIngredientCreated(requestIngredients, mealIngredients)

            // console.log("Tem algum ingrediente novo? ", !hasIngredientsToCreate);

            if(!hasIngredientsToCreate){
                // console.log("Lista de ingredientes para criar: ", ingredientsToCreate);

                ingredientsToCreate.map(async hasIngredientToCreate => {
                    const ingredient_id = randomUUID();
                    await this.mealsRepository.createIngredient({ 
                        ingredient_id, 
                        ingredient: hasIngredientToCreate, 
                        meal_id 
                    });
                })
            }
        }

        if (statusMeal) {
            return "Prato atualizado";
        } else {
            return "Não foi possível atualizar o prato";
        }
    }

    async delete(meal_id) {
        const status = await this.mealsRepository.delete(meal_id);

        if (status) {
            return "Deletado com sucesso";
        } else {
            return "Não foi possível deletar";
        }
    }
}

module.exports = MealsService;