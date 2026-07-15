import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { DayPlan, Meal, ShoppingItem } from "@/models/meal";
import { GeneticPreference, OnboardingState } from "@/models/profile";
import { getReplacementMeal, weeklyPlans } from "@/data/menu";
import { shoppingItems } from "@/data/shopping";
import { emptyOnboarding, sampleOnboarding } from "@/store/defaults";

type AppStoreValue = {
  onboarding: OnboardingState;
  plans: DayPlan[];
  checkedItems: string[];
  isHydrating: boolean;
  planStatus: "ready" | "loading" | "empty" | "error";
  setProfile: (profile: OnboardingState["profile"]) => void;
  setPreferences: (preferences: OnboardingState["preferences"]) => void;
  setGenetics: (genetics: GeneticPreference[]) => void;
  completeOnboarding: () => void;
  loadSampleProfile: () => void;
  resetLocalData: () => void;
  regeneratePlan: () => void;
  replaceMeal: (meal: Meal) => void;
  replaceMealWith: (currentMeal: Meal, replacementMeal: Meal) => void;
  toggleShoppingItem: (id: string) => void;
  allShoppingItems: ShoppingItem[];
};

const STORAGE_KEY = "nutriplan.v1";

const AppStoreContext = createContext<AppStoreValue | undefined>(undefined);

export function AppStoreProvider({ children }: PropsWithChildren) {
  const [onboarding, setOnboarding] = useState<OnboardingState>(emptyOnboarding);
  const [plans, setPlans] = useState<DayPlan[]>(weeklyPlans);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isHydrating, setHydrating] = useState(true);
  const [planStatus, setPlanStatus] = useState<AppStoreValue["planStatus"]>("ready");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as Pick<AppStoreValue, "onboarding" | "checkedItems">;
        setOnboarding(saved.onboarding ?? emptyOnboarding);
        setCheckedItems(saved.checkedItems ?? []);
      })
      .catch(() => setPlanStatus("error"))
      .finally(() => setHydrating(false));
  }, []);

  useEffect(() => {
    if (isHydrating) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ onboarding, checkedItems })).catch(() =>
      setPlanStatus("error")
    );
  }, [checkedItems, isHydrating, onboarding]);

  const value = useMemo<AppStoreValue>(
    () => ({
      onboarding,
      plans,
      checkedItems,
      isHydrating,
      planStatus,
      setProfile: (profile) => setOnboarding((current) => ({ ...current, profile })),
      setPreferences: (preferences) => setOnboarding((current) => ({ ...current, preferences })),
      setGenetics: (genetics) => setOnboarding((current) => ({ ...current, genetics })),
      completeOnboarding: () => setOnboarding((current) => ({ ...current, completed: true })),
      loadSampleProfile: () => {
        setOnboarding(sampleOnboarding);
        setPlanStatus("ready");
      },
      resetLocalData: () => {
        setOnboarding(emptyOnboarding);
        setCheckedItems([]);
        setPlans(weeklyPlans);
        setPlanStatus("empty");
        AsyncStorage.removeItem(STORAGE_KEY).catch(() => setPlanStatus("error"));
      },
      regeneratePlan: () => {
        setPlanStatus("loading");
        setTimeout(() => {
          setPlans([...weeklyPlans].reverse().map((plan, index) => ({ ...plan, day: index + 1 })));
          setPlanStatus("ready");
        }, 650);
      },
      replaceMeal: (meal) => {
        const replacement = getReplacementMeal(meal.id, meal.type, meal.day);
        if (!replacement) {
          setPlanStatus("error");
          return;
        }
        setPlans((current) =>
          current.map((day) =>
            day.day === meal.day
              ? {
                  ...day,
                  meals: day.meals.map((item) =>
                    item.id === meal.id && item.type === meal.type
                      ? { ...replacement, day: meal.day, type: meal.type }
                      : item
                  )
                }
              : day
          )
        );
      },
      replaceMealWith: (currentMeal, replacementMeal) => {
        setPlans((current) =>
          current.map((day) =>
            day.day === currentMeal.day
              ? {
                  ...day,
                  meals: day.meals.map((item) =>
                    item.id === currentMeal.id && item.type === currentMeal.type
                      ? { ...replacementMeal, day: currentMeal.day, type: currentMeal.type }
                      : item
                  )
                }
              : day
          )
        );
      },
      toggleShoppingItem: (id) =>
        setCheckedItems((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        ),
      allShoppingItems: shoppingItems
    }),
    [checkedItems, isHydrating, onboarding, planStatus, plans]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error("useAppStore must be used inside AppStoreProvider");
  return store;
}
