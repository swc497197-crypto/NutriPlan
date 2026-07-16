import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { ShoppingItem } from "@/models/meal";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type ShoppingRange = "today" | "threeDays" | "week";
type CategoryKind = "veg" | "protein" | "staple" | "seasoning" | "other";
type SectionKind = "fresh" | "pantry";

const rangeOptions: { value: ShoppingRange; label: string; hint: string }[] = [
  { value: "today", label: "今天", hint: "只买今天要用的" },
  { value: "threeDays", label: "3天", hint: "推荐，减少浪费" },
  { value: "week", label: "本周", hint: "集中采购和备货" }
];

const rangeItemIds: Record<ShoppingRange, string[]> = {
  today: ["veg-1", "veg-2", "protein-1", "protein-2", "staple-2", "seasoning-1"],
  threeDays: [
    "veg-1",
    "veg-2",
    "veg-3",
    "veg-4",
    "protein-1",
    "protein-2",
    "protein-3",
    "protein-5",
    "staple-1",
    "staple-2",
    "seasoning-1"
  ],
  week: []
};

const amountOverrides: Record<ShoppingRange, Record<string, string>> = {
  today: {
    "veg-1": "2 个",
    "veg-2": "半颗",
    "protein-1": "2 个",
    "protein-2": "180g",
    "staple-2": "1 小碗",
    "seasoning-1": "少量"
  },
  threeDays: {
    "veg-1": "4 个",
    "veg-2": "1 颗",
    "veg-3": "各 2 个",
    "veg-4": "约 500g",
    "protein-1": "6 个",
    "protein-2": "350g",
    "protein-3": "250g",
    "protein-5": "2 杯",
    "staple-1": "半袋",
    "staple-2": "500g",
    "seasoning-1": "少量"
  },
  week: {}
};

const categoryMeta: Record<CategoryKind, { label: string; icon: keyof typeof Ionicons.glyphMap; section: SectionKind }> = {
  veg: { label: "蔬菜水果", icon: "leaf-outline", section: "fresh" },
  protein: { label: "肉蛋奶和豆制品", icon: "egg-outline", section: "fresh" },
  staple: { label: "主食", icon: "nutrition-outline", section: "pantry" },
  seasoning: { label: "调料", icon: "flask-outline", section: "pantry" },
  other: { label: "其他", icon: "bag-outline", section: "pantry" }
};

const sectionMeta: Record<SectionKind, { title: string; description: string; icon: keyof typeof Ionicons.glyphMap }> = {
  fresh: {
    title: "新鲜食材",
    description: "建议 2-3 天补一次，减少腐烂和浪费。",
    icon: "leaf-outline"
  },
  pantry: {
    title: "常备食材",
    description: "主食、调料和小包装食材可以按周准备。",
    icon: "file-tray-stacked-outline"
  }
};

function getCategoryKind(item: ShoppingItem): CategoryKind {
  if (item.id.startsWith("veg")) return "veg";
  if (item.id.startsWith("protein")) return "protein";
  if (item.id.startsWith("staple")) return "staple";
  if (item.id.startsWith("seasoning")) return "seasoning";
  return "other";
}

function getRangeItems(items: ShoppingItem[], range: ShoppingRange) {
  if (range === "week") return items;
  const allowedIds = new Set(rangeItemIds[range]);
  return items.filter((item) => allowedIds.has(item.id));
}

function getAmount(item: ShoppingItem, range: ShoppingRange) {
  return amountOverrides[range][item.id] ?? item.amount;
}

export default function ShoppingScreen() {
  const { allShoppingItems, checkedItems, toggleShoppingItem } = useAppStore();
  const [selectedRange, setSelectedRange] = useState<ShoppingRange>("threeDays");
  const visibleItems = useMemo(
    () => getRangeItems(allShoppingItems, selectedRange),
    [allShoppingItems, selectedRange]
  );
  const visibleIds = useMemo(() => new Set(visibleItems.map((item) => item.id)), [visibleItems]);
  const checkedCount = checkedItems.filter((id) => visibleIds.has(id)).length;
  const progress = visibleItems.length > 0 ? checkedCount / visibleItems.length : 0;
  const selectedRangeOption = rangeOptions.find((option) => option.value === selectedRange) ?? rangeOptions[1];
  const sections = useMemo(
    () =>
      (["fresh", "pantry"] as SectionKind[]).map((section) => ({
        section,
        groups: Object.entries(categoryMeta)
          .filter(([, meta]) => meta.section === section)
          .map(([kind, meta]) => ({
            kind: kind as CategoryKind,
            meta,
            items: visibleItems.filter((item) => getCategoryKind(item) === kind)
          }))
          .filter((group) => group.items.length > 0)
      })),
    [visibleItems]
  );

  return (
    <Screen compact>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <AppText variant="small" muted>
              按当前计划生成
            </AppText>
            <AppText variant="h2" weight="700">
              购物清单
            </AppText>
            <AppText variant="small" muted>
              {selectedRangeOption.hint}
            </AppText>
          </View>
          <View style={styles.progressBadge}>
            <AppText variant="h2" weight="700" style={styles.progressText}>
              {checkedCount}
            </AppText>
            <AppText variant="tiny" muted>
              / {visibleItems.length}
            </AppText>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
      </View>

      <View style={styles.rangeTabs}>
        {rangeOptions.map((option) => {
          const selected = selectedRange === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[styles.rangeTab, selected && styles.rangeTabActive]}
              onPress={() => setSelectedRange(option.value)}
            >
              <AppText variant="small" weight="700" style={selected ? styles.rangeTextActive : styles.rangeText}>
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.quickTip}>
        <Ionicons name="information-circle-outline" size={17} color={colors.primary} />
        <AppText variant="small" weight="600" style={styles.quickTipText}>
          默认 3 天采购更适合新鲜蔬菜、肉蛋奶；本周清单适合周末备货。
        </AppText>
      </View>

      {visibleItems.length === 0 ? (
        <View style={styles.emptyCard}>
          <EmptyState title="暂无清单" text="生成计划后会在这里汇总食材。" />
        </View>
      ) : null}

      <View style={styles.sections}>
        {sections.map(({ section, groups }) => {
          if (groups.length === 0) return null;
          const meta = sectionMeta[section];

          return (
            <View key={section} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons name={meta.icon} size={18} color={colors.primary} />
                </View>
                <View style={styles.sectionText}>
                  <AppText variant="h3" weight="700">
                    {meta.title}
                  </AppText>
                  <AppText variant="tiny" muted>
                    {meta.description}
                  </AppText>
                </View>
              </View>

              <View style={styles.groups}>
                {groups.map((group) => {
                  const groupCheckedCount = group.items.filter((item) => checkedItems.includes(item.id)).length;
                  return (
                    <View key={group.kind} style={styles.groupBlock}>
                      <View style={styles.groupHeader}>
                        <View style={styles.groupTitleRow}>
                          <Ionicons name={group.meta.icon} size={15} color={colors.primary} />
                          <AppText variant="small" weight="700">
                            {group.meta.label}
                          </AppText>
                        </View>
                        <AppText variant="tiny" muted>
                          {groupCheckedCount}/{group.items.length}
                        </AppText>
                      </View>

                      <View style={styles.items}>
                        {group.items.map((item) => {
                          const checked = checkedItems.includes(item.id);
                          return (
                            <Pressable
                              key={item.id}
                              accessibilityRole="checkbox"
                              accessibilityState={{ checked }}
                              style={[styles.itemRow, checked && styles.itemRowChecked]}
                              onPress={() => toggleShoppingItem(item.id)}
                            >
                              <Ionicons
                                name={checked ? "checkmark-circle" : "ellipse-outline"}
                                size={20}
                                color={checked ? colors.primary : colors.textMuted}
                              />
                              <AppText
                                variant="small"
                                weight="700"
                                numberOfLines={1}
                                style={[styles.itemName, checked && styles.checkedText]}
                              >
                                {item.name}
                              </AppText>
                              <AppText variant="tiny" muted>
                                {getAmount(item, selectedRange)}
                              </AppText>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 18,
    backgroundColor: "#FFFDF7",
    padding: spacing.md,
    gap: spacing.md
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  progressBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center"
  },
  progressText: {
    color: colors.primary
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceMuted,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.primary
  },
  rangeTabs: {
    borderRadius: 18,
    backgroundColor: colors.surface,
    flexDirection: "row",
    padding: spacing.xs,
    gap: spacing.xs
  },
  rangeTab: {
    flex: 1,
    minHeight: 36,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  rangeTabActive: {
    backgroundColor: colors.primary
  },
  rangeText: {
    color: colors.text
  },
  rangeTextActive: {
    color: "#FFFFFF"
  },
  quickTip: {
    minHeight: 44,
    borderRadius: 16,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md
  },
  quickTipText: {
    flex: 1
  },
  emptyCard: {
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: spacing.md
  },
  sections: {
    gap: spacing.md
  },
  sectionCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.md
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center"
  },
  sectionText: {
    flex: 1
  },
  groups: {
    gap: spacing.md
  },
  groupBlock: {
    gap: spacing.sm
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  groupTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  items: {
    gap: spacing.xs
  },
  itemRow: {
    minHeight: 38,
    borderRadius: 13,
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm
  },
  itemRowChecked: {
    backgroundColor: colors.surfaceMuted
  },
  itemName: {
    flex: 1
  },
  checkedText: {
    color: colors.textMuted,
    textDecorationLine: "line-through"
  }
});
