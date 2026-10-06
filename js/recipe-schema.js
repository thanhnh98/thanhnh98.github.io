/**
 * Recipe JSON-LD cho trang chi-tiet-mon-an.html, dựng từ data/foods/<id>.json.
 * UMD: dùng trong trình duyệt (window.RecipeSchema) và trong test Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RecipeSchema = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var SITE_ORIGIN = 'https://saptet.vn';
  var DEFAULT_IMAGE = SITE_ORIGIN + '/assets/images/img_sharing.png';

  // "2 giờ", "12-14 giờ", "1 giờ 30 phút", "1.5 tiếng", "90 phút" → ISO 8601 (PT2H, PT1H30M…).
  // Khoảng thời gian lấy cận dưới; chuỗi không có số (vd. "Không cần nấu") → null.
  function parseVnDuration(text) {
    if (!text) return null;
    var value = String(text).toLowerCase().replace(/,/g, '.');
    var hourMatch = value.match(/(\d+(?:\.\d+)?)(?:\s*-\s*\d+(?:\.\d+)?)?\s*(?:giờ|tiếng)/);
    var minuteMatch = value.match(/(\d+)(?:\s*-\s*\d+)?\s*phút/);
    var totalMinutes = (hourMatch ? Math.round(parseFloat(hourMatch[1]) * 60) : 0)
      + (minuteMatch ? parseInt(minuteMatch[1], 10) : 0);
    if (!totalMinutes) return null;

    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    return 'PT' + (hours ? hours + 'H' : '') + (minutes ? minutes + 'M' : '');
  }

  function durationMinutes(iso) {
    var match = iso && iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
    return match ? (parseInt(match[1] || '0', 10) * 60) + parseInt(match[2] || '0', 10) : 0;
  }

  function ingredientText(item) {
    if (typeof item !== 'object' || !item) return String(item);
    return [item.amount, item.name].filter(Boolean).join(' ') + (item.note ? ' (' + item.note + ')' : '');
  }

  // Trả về null khi món không có nguyên liệu/cách làm (vd. mứt Tết, dưa hấu): không phát Recipe rỗng.
  function buildRecipeSchema(dish, id) {
    var ingredients = Array.isArray(dish.ingredients) ? dish.ingredients : [];
    var steps = Array.isArray(dish.instructions) ? dish.instructions : [];
    if (!ingredients.length || !steps.length) return null;

    var url = SITE_ORIGIN + '/chi-tiet-mon-an.html?id=' + encodeURIComponent(id);
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: dish.name,
      description: dish.description || ('Cách làm ' + dish.name + ' truyền thống ngày Tết.'),
      image: [dish.image || DEFAULT_IMAGE],
      url: url,
      author: { '@type': 'Organization', name: 'Sắp Tết', url: SITE_ORIGIN + '/' },
      recipeCuisine: 'Việt Nam',
      recipeIngredient: ingredients.map(ingredientText),
      recipeInstructions: steps.map(function (step, index) {
        var text = typeof step === 'object' && step ? step.description : String(step);
        var item = { '@type': 'HowToStep', position: index + 1, text: text };
        if (step && step.title) item.name = step.title;
        return item;
      }),
      keywords: ['món ăn Tết', dish.name, dish.primary_region].filter(Boolean).join(', '),
    };

    if (dish.category) schema.recipeCategory = dish.category;
    if (dish.servings) schema.recipeYield = String(dish.servings);

    var prepTime = parseVnDuration(dish.prep_time);
    var cookTime = parseVnDuration(dish.cooking_time);
    if (prepTime) schema.prepTime = prepTime;
    if (cookTime) schema.cookTime = cookTime;
    if (prepTime && cookTime) {
      var total = durationMinutes(prepTime) + durationMinutes(cookTime);
      schema.totalTime = 'PT' + (Math.floor(total / 60) ? Math.floor(total / 60) + 'H' : '') + (total % 60 ? (total % 60) + 'M' : '');
    }
    if (dish.nutrition_facts && dish.nutrition_facts.calories) {
      var calories = String(dish.nutrition_facts.calories).replace(/\bcalo\b/i, 'kcal');
      schema.nutrition = { '@type': 'NutritionInformation', calories: /^\d+$/.test(calories) ? calories + ' kcal' : calories };
    }

    return schema;
  }

  return { buildRecipeSchema: buildRecipeSchema, parseVnDuration: parseVnDuration, DEFAULT_IMAGE: DEFAULT_IMAGE };
});
