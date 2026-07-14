export const genderOptions = [
  { label: "女性", value: "female" },
  { label: "男性", value: "male" },
  { label: "其他/暂不说明", value: "other" }
] as const;

export const activityOptions = [
  { label: "久坐为主", value: "low" },
  { label: "每周运动 1-3 次", value: "medium" },
  { label: "运动较规律", value: "high" }
] as const;

export const goalOptions = [
  { label: "改善日常饮食", value: "balanced" },
  { label: "温和减脂", value: "gentleFatLoss" }
] as const;

export const cookingTimeOptions = [
  { label: "15 分钟内", value: "under15" },
  { label: "30 分钟内", value: "under30" },
  { label: "45 分钟内", value: "under45" }
] as const;

export const dietStyleOptions = ["普通中式", "少油少盐", "可接受轻食", "工作日便当", "少肉日"];

export const kitchenToolOptions = ["电饭煲", "炒锅", "蒸锅", "空气炸锅", "微波炉"];

export const geneticOptions = [
  { label: "乳糖消化需要关注", value: "lactose" },
  { label: "咖啡因代谢需要关注", value: "caffeine" },
  { label: "叶酸代谢需要关注", value: "folate" },
  { label: "盐摄入需要关注", value: "salt" },
  { label: "暂无相关检测信息", value: "none" }
] as const;
