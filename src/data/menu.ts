import { DayPlan, Meal, MealType } from "@/models/meal";

export const demoDataNotice = "以下菜单为界面演示用虚构数据，不代表正式营养标准或个体化医学建议。";

const sharedSteps = [
  "提前清洗并切配食材，按需要腌制 5-10 分钟。",
  "使用少量植物油或清蒸、炖煮方式完成主菜。",
  "搭配主食和蔬菜，装盘后按个人口味少量调味。"
];

const meals: Meal[] = [
  {
    id: "d1-breakfast",
    day: 1,
    type: "breakfast",
    name: "燕麦鸡蛋早餐",
    calories: 420,
    protein: 24,
    reason: "适合通勤前快速准备，主食和蛋白质比较均衡。",
    timeMinutes: 12,
    difficulty: "简单",
    ingredients: [
      { name: "燕麦", amount: "45g", substitutes: ["全麦面包", "杂粮馒头"] },
      { name: "鸡蛋", amount: "2 个", substitutes: ["豆腐", "无糖酸奶"] },
      { name: "蓝莓", amount: "60g", substitutes: ["苹果", "时令水果"] }
    ],
    steps: ["煮燕麦 5 分钟。", "鸡蛋水煮或煎熟。", "搭配水果食用。"],
    nutritionSummary: "模拟：热量 420 kcal，蛋白质 24g。",
    tags: ["快手", "早餐"]
  },
  {
    id: "d1-lunch",
    day: 1,
    type: "lunch",
    name: "杂粮饭配番茄牛肉",
    calories: 640,
    protein: 38,
    reason: "番茄和牛肉适合工作日便当，饱腹感较好。",
    timeMinutes: 35,
    difficulty: "适中",
    ingredients: [
      { name: "杂粮饭", amount: "180g", substitutes: ["糙米饭", "玉米"] },
      { name: "牛肉片", amount: "120g", substitutes: ["鸡胸肉", "北豆腐"] },
      { name: "番茄", amount: "2 个", substitutes: ["彩椒", "西葫芦"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 640 kcal，蛋白质 38g。",
    tags: ["便当", "高蛋白"]
  },
  {
    id: "d1-dinner",
    day: 1,
    type: "dinner",
    name: "清蒸鱼配时令蔬菜",
    calories: 520,
    protein: 36,
    reason: "晚餐口味清淡，减少重油烹饪负担。",
    timeMinutes: 30,
    difficulty: "适中",
    ingredients: [
      { name: "鲈鱼", amount: "180g", substitutes: ["鳕鱼", "虾仁"] },
      { name: "西兰花", amount: "180g", substitutes: ["菜心", "油麦菜"] },
      { name: "红薯", amount: "120g", substitutes: ["土豆", "南瓜"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 520 kcal，蛋白质 36g。",
    tags: ["清淡", "晚餐"]
  },
  {
    id: "d1-snack",
    day: 1,
    type: "snack",
    name: "无糖酸奶和苹果",
    calories: 180,
    protein: 9,
    reason: "下午加餐控制份量，帮助减少晚餐前饥饿。",
    timeMinutes: 2,
    difficulty: "简单",
    ingredients: [
      { name: "无糖酸奶", amount: "150g", substitutes: ["低糖豆浆"] },
      { name: "苹果", amount: "1 个", substitutes: ["梨", "橙子"] }
    ],
    steps: ["清洗水果。", "与酸奶分开食用或切块搭配。"],
    nutritionSummary: "模拟：热量 180 kcal，蛋白质 9g。",
    tags: ["加餐"]
  },
  {
    id: "d2-breakfast",
    day: 2,
    type: "breakfast",
    name: "全麦鸡肉三明治",
    calories: 450,
    protein: 30,
    reason: "适合带走，减少早高峰买高油早餐的概率。",
    timeMinutes: 15,
    difficulty: "简单",
    ingredients: [
      { name: "全麦吐司", amount: "2 片", substitutes: ["杂粮馒头"] },
      { name: "鸡胸肉", amount: "90g", substitutes: ["鸡蛋", "金枪鱼"] },
      { name: "生菜", amount: "50g", substitutes: ["黄瓜", "番茄"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 450 kcal，蛋白质 30g。",
    tags: ["通勤", "早餐"]
  },
  {
    id: "d2-lunch",
    day: 2,
    type: "lunch",
    name: "豆腐菌菇盖饭",
    calories: 590,
    protein: 28,
    reason: "豆制品和菌菇组合温和，适合少肉日。",
    timeMinutes: 28,
    difficulty: "简单",
    ingredients: [
      { name: "北豆腐", amount: "180g", substitutes: ["鸡蛋", "虾仁"] },
      { name: "香菇", amount: "100g", substitutes: ["口蘑", "金针菇"] },
      { name: "糙米饭", amount: "170g", substitutes: ["杂粮饭"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 590 kcal，蛋白质 28g。",
    tags: ["少肉", "便当"]
  },
  {
    id: "d2-dinner",
    day: 2,
    type: "dinner",
    name: "虾仁冬瓜汤配玉米",
    calories: 480,
    protein: 32,
    reason: "汤菜搭配主食，晚间更清爽。",
    timeMinutes: 25,
    difficulty: "简单",
    ingredients: [
      { name: "虾仁", amount: "140g", substitutes: ["鱼片", "鸡肉丸"] },
      { name: "冬瓜", amount: "250g", substitutes: ["丝瓜", "白菜"] },
      { name: "玉米", amount: "1 根", substitutes: ["红薯", "土豆"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 480 kcal，蛋白质 32g。",
    tags: ["汤菜", "晚餐"]
  },
  {
    id: "d3-breakfast",
    day: 3,
    type: "breakfast",
    name: "豆浆鸡蛋杂粮包",
    calories: 430,
    protein: 23,
    reason: "贴近日常早餐店选择，便于执行。",
    timeMinutes: 8,
    difficulty: "简单",
    ingredients: [
      { name: "无糖豆浆", amount: "300ml", substitutes: ["低脂牛奶"] },
      { name: "鸡蛋", amount: "1 个", substitutes: ["茶叶蛋"] },
      { name: "杂粮包", amount: "1 个", substitutes: ["玉米", "全麦面包"] }
    ],
    steps: ["加热豆浆。", "搭配鸡蛋和杂粮包。"],
    nutritionSummary: "模拟：热量 430 kcal，蛋白质 23g。",
    tags: ["外食友好"]
  },
  {
    id: "d3-lunch",
    day: 3,
    type: "lunch",
    name: "香煎鸡腿配荞麦面",
    calories: 660,
    protein: 40,
    reason: "工作日中午补充蛋白质，口味不单调。",
    timeMinutes: 35,
    difficulty: "适中",
    ingredients: [
      { name: "去皮鸡腿肉", amount: "150g", substitutes: ["鸡胸肉", "瘦猪肉"] },
      { name: "荞麦面", amount: "80g", substitutes: ["全麦意面", "杂粮饭"] },
      { name: "黄瓜", amount: "100g", substitutes: ["生菜", "彩椒"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 660 kcal，蛋白质 40g。",
    tags: ["午餐"]
  },
  {
    id: "d3-dinner",
    day: 3,
    type: "dinner",
    name: "番茄鸡蛋豆腐汤",
    calories: 500,
    protein: 29,
    reason: "常见食材，适合下班后快速完成。",
    timeMinutes: 22,
    difficulty: "简单",
    ingredients: [
      { name: "番茄", amount: "2 个", substitutes: ["娃娃菜"] },
      { name: "鸡蛋", amount: "2 个", substitutes: ["豆腐"] },
      { name: "嫩豆腐", amount: "150g", substitutes: ["虾仁"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 500 kcal，蛋白质 29g。",
    tags: ["快手"]
  },
  {
    id: "d4-breakfast",
    day: 4,
    type: "breakfast",
    name: "南瓜小米粥配鸡蛋",
    calories: 410,
    protein: 20,
    reason: "温和易入口，适合早晨胃口一般的人。",
    timeMinutes: 20,
    difficulty: "简单",
    ingredients: [
      { name: "小米", amount: "45g", substitutes: ["燕麦"] },
      { name: "南瓜", amount: "100g", substitutes: ["红薯"] },
      { name: "鸡蛋", amount: "1 个", substitutes: ["豆腐干"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 410 kcal，蛋白质 20g。",
    tags: ["早餐"]
  },
  {
    id: "d4-lunch",
    day: 4,
    type: "lunch",
    name: "清炒虾仁西兰花配杂粮饭",
    calories: 620,
    protein: 36,
    reason: "做法清楚，适合提前备菜。",
    timeMinutes: 30,
    difficulty: "简单",
    ingredients: [
      { name: "虾仁", amount: "150g", substitutes: ["鱼片", "鸡胸肉"] },
      { name: "西兰花", amount: "200g", substitutes: ["菜花", "芦笋"] },
      { name: "杂粮饭", amount: "180g", substitutes: ["糙米饭"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 620 kcal，蛋白质 36g。",
    tags: ["便当"]
  },
  {
    id: "d4-dinner",
    day: 4,
    type: "dinner",
    name: "青椒牛肉丝配凉拌菠菜",
    calories: 540,
    protein: 35,
    reason: "保留家常风味，同时控制油量。",
    timeMinutes: 32,
    difficulty: "适中",
    ingredients: [
      { name: "瘦牛肉", amount: "120g", substitutes: ["鸡胸肉", "豆腐干"] },
      { name: "青椒", amount: "120g", substitutes: ["彩椒"] },
      { name: "菠菜", amount: "180g", substitutes: ["油麦菜"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 540 kcal，蛋白质 35g。",
    tags: ["家常"]
  },
  {
    id: "d5-breakfast",
    day: 5,
    type: "breakfast",
    name: "酸奶坚果水果碗",
    calories: 440,
    protein: 18,
    reason: "无需开火，适合忙碌早晨。",
    timeMinutes: 5,
    difficulty: "简单",
    ingredients: [
      { name: "无糖酸奶", amount: "200g", substitutes: ["无糖豆浆"] },
      { name: "香蕉", amount: "半根", substitutes: ["苹果"] },
      { name: "坚果", amount: "10g", substitutes: ["南瓜籽"] }
    ],
    steps: ["水果切块。", "加入酸奶和少量坚果。"],
    nutritionSummary: "模拟：热量 440 kcal，蛋白质 18g。",
    tags: ["免烹饪"]
  },
  {
    id: "d5-lunch",
    day: 5,
    type: "lunch",
    name: "鸡胸肉蔬菜饭团",
    calories: 610,
    protein: 37,
    reason: "方便携带，适合会议日或外出办公。",
    timeMinutes: 30,
    difficulty: "适中",
    ingredients: [
      { name: "鸡胸肉", amount: "130g", substitutes: ["金枪鱼", "豆腐干"] },
      { name: "米饭", amount: "170g", substitutes: ["杂粮饭"] },
      { name: "胡萝卜", amount: "80g", substitutes: ["玉米粒"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 610 kcal，蛋白质 37g。",
    tags: ["便携"]
  },
  {
    id: "d5-dinner",
    day: 5,
    type: "dinner",
    name: "豆腐菌菇煲配青菜",
    calories: 500,
    protein: 27,
    reason: "热乎但不厚重，适合周五晚餐。",
    timeMinutes: 28,
    difficulty: "简单",
    ingredients: [
      { name: "北豆腐", amount: "200g", substitutes: ["冻豆腐"] },
      { name: "混合菌菇", amount: "180g", substitutes: ["香菇"] },
      { name: "小白菜", amount: "180g", substitutes: ["菜心"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 500 kcal，蛋白质 27g。",
    tags: ["暖食"]
  },
  {
    id: "d6-breakfast",
    day: 6,
    type: "breakfast",
    name: "玉米鸡蛋牛奶早餐",
    calories: 430,
    protein: 24,
    reason: "周末也能保持简单稳定的早餐结构。",
    timeMinutes: 12,
    difficulty: "简单",
    ingredients: [
      { name: "玉米", amount: "1 根", substitutes: ["红薯"] },
      { name: "鸡蛋", amount: "2 个", substitutes: ["豆腐干"] },
      { name: "低脂牛奶", amount: "250ml", substitutes: ["无糖豆浆"] }
    ],
    steps: ["蒸玉米。", "煮鸡蛋。", "搭配牛奶食用。"],
    nutritionSummary: "模拟：热量 430 kcal，蛋白质 24g。",
    tags: ["周末"]
  },
  {
    id: "d6-lunch",
    day: 6,
    type: "lunch",
    name: "清蒸鱼杂粮饭套餐",
    calories: 650,
    protein: 42,
    reason: "适合家庭午餐，口味清淡但不寡淡。",
    timeMinutes: 40,
    difficulty: "适中",
    ingredients: [
      { name: "鲈鱼", amount: "200g", substitutes: ["鳕鱼"] },
      { name: "杂粮饭", amount: "180g", substitutes: ["糙米饭"] },
      { name: "油麦菜", amount: "180g", substitutes: ["西兰花"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 650 kcal，蛋白质 42g。",
    tags: ["家庭餐"]
  },
  {
    id: "d6-dinner",
    day: 6,
    type: "dinner",
    name: "番茄牛肉蔬菜锅",
    calories: 560,
    protein: 36,
    reason: "一锅完成，减少周末做饭复杂度。",
    timeMinutes: 35,
    difficulty: "适中",
    ingredients: [
      { name: "牛肉片", amount: "130g", substitutes: ["鸡腿肉"] },
      { name: "番茄", amount: "2 个", substitutes: ["菌菇"] },
      { name: "娃娃菜", amount: "200g", substitutes: ["白菜"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 560 kcal，蛋白质 36g。",
    tags: ["一锅端"]
  },
  {
    id: "d7-breakfast",
    day: 7,
    type: "breakfast",
    name: "全麦吐司配牛油果鸡蛋",
    calories: 460,
    protein: 22,
    reason: "周末早餐稍有变化，但仍保持清爽。",
    timeMinutes: 12,
    difficulty: "简单",
    ingredients: [
      { name: "全麦吐司", amount: "2 片", substitutes: ["杂粮面包"] },
      { name: "牛油果", amount: "半个", substitutes: ["黄瓜"] },
      { name: "鸡蛋", amount: "1 个", substitutes: ["豆腐"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 460 kcal，蛋白质 22g。",
    tags: ["早餐"]
  },
  {
    id: "d7-lunch",
    day: 7,
    type: "lunch",
    name: "瘦肉蔬菜荞麦面",
    calories: 630,
    protein: 34,
    reason: "比普通外卖面更容易控制份量和蔬菜比例。",
    timeMinutes: 28,
    difficulty: "简单",
    ingredients: [
      { name: "瘦猪肉", amount: "110g", substitutes: ["鸡胸肉", "虾仁"] },
      { name: "荞麦面", amount: "90g", substitutes: ["全麦面"] },
      { name: "上海青", amount: "180g", substitutes: ["菠菜"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 630 kcal，蛋白质 34g。",
    tags: ["面食"]
  },
  {
    id: "d7-dinner",
    day: 7,
    type: "dinner",
    name: "虾仁豆腐蒸蛋配水果",
    calories: 500,
    protein: 33,
    reason: "作为一周收尾晚餐，做法柔和、份量清楚。",
    timeMinutes: 25,
    difficulty: "简单",
    ingredients: [
      { name: "虾仁", amount: "120g", substitutes: ["鱼片"] },
      { name: "嫩豆腐", amount: "120g", substitutes: ["鸡蛋"] },
      { name: "橙子", amount: "1 个", substitutes: ["苹果"] }
    ],
    steps: sharedSteps,
    nutritionSummary: "模拟：热量 500 kcal，蛋白质 33g。",
    tags: ["轻晚餐"]
  }
];

const imageByMealId: Record<string, string> = {
  "d1-breakfast": "oatEggBreakfast",
  "d1-lunch": "tomatoBeefGrainBowl",
  "d1-dinner": "steamedFishVegetables",
  "d1-snack": "yogurtFruitBowl",
  "d2-breakfast": "wholeWheatChickenSandwich",
  "d2-lunch": "tofuMushroomBowl",
  "d2-dinner": "leafyGreensGrain",
  "d3-breakfast": "eggVegetableBreakfast",
  "d3-lunch": "chickenVegetablePlate",
  "d3-dinner": "homestyleTofuSet",
  "d4-breakfast": "eggVegetableBreakfast",
  "d4-lunch": "chickenVegetablePlate",
  "d4-dinner": "beefGrainMeal",
  "d5-breakfast": "yogurtFruitBowl",
  "d5-lunch": "chickenVegetablePlate",
  "d5-dinner": "tofuMushroomBowl",
  "d6-breakfast": "oatEggBreakfast",
  "d6-lunch": "steamedFishVegetables",
  "d6-dinner": "tomatoBeefGrainBowl",
  "d7-breakfast": "eggVegetableBreakfast",
  "d7-lunch": "leafyGreensGrain",
  "d7-dinner": "homestyleTofuSet"
};

export const weeklyPlans: DayPlan[] = Array.from({ length: 7 }, (_, index) => {
  const day = index + 1;
  return {
    day,
    title: `第 ${day} 天`,
    meals: meals.filter((meal) => meal.day === day).map(withMealImage)
  };
});

export function getMealById(id: string) {
  const meal = meals.find((item) => item.id === id);
  return meal ? withMealImage(meal) : undefined;
}

export function getReplacementMeal(currentId: string, type: MealType, currentDay: number) {
  const candidates = meals
    .filter((meal) => meal.type === type && meal.id !== currentId)
    .sort((first, second) => {
      const firstDistance = (first.day - currentDay + 7) % 7;
      const secondDistance = (second.day - currentDay + 7) % 7;
      return firstDistance - secondDistance;
    });

  return candidates[0] ? withMealImage(candidates[0]) : undefined;
}

function withMealImage(meal: Meal): Meal {
  return {
    ...meal,
    image: meal.image ?? imageByMealId[meal.id]
  };
}
