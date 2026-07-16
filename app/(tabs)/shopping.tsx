import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { ShoppingCategory } from "@/models/meal";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

const categories: ShoppingCategory[] = ["蔬菜水果", "肉蛋奶和豆制品", "主食", "调料", "其他"];

export default function ShoppingScreen() {
  const { allShoppingItems, checkedItems, toggleShoppingItem } = useAppStore();
  const checkedCount = checkedItems.length;

  return (
    <Screen compact>
      <View style={styles.header}>
        <View>
          <AppText variant="h2" weight="700">
            本周购物清单
          </AppText>
          <AppText variant="small" muted>
            已购买 {checkedCount}/{allShoppingItems.length} 项 · 数量为演示估算
          </AppText>
        </View>
      </View>

      {allShoppingItems.length === 0 ? (
        <Card>
          <EmptyState title="暂无清单" text="生成计划后会在这里汇总一周食材。" />
        </Card>
      ) : null}

      <Card style={styles.listCard}>
        {categories.map((category) => {
          const items = allShoppingItems.filter((item) => item.category === category);
          if (items.length === 0) return null;
          return (
            <View key={category} style={styles.categoryBlock}>
              <View style={styles.categoryHeader}>
                <AppText variant="small" weight="700">
                  {category}
                </AppText>
                <AppText variant="tiny" muted>
                  {items.length} 项
                </AppText>
              </View>
              <View style={styles.items}>
                {items.map((item) => {
                  const checked = checkedItems.includes(item.id);
                  return (
                    <Pressable
                      key={item.id}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked }}
                      style={styles.item}
                      onPress={() => toggleShoppingItem(item.id)}
                    >
                      <Ionicons
                        name={checked ? "checkmark-circle" : "ellipse-outline"}
                        size={18}
                        color={checked ? colors.primary : colors.textMuted}
                      />
                      <AppText variant="small" weight="600" numberOfLines={1} style={[styles.itemName, checked && styles.checkedText]}>
                        {item.name}
                      </AppText>
                      <AppText variant="tiny" muted>
                        {item.amount}
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </Card>

      <AppText variant="tiny" muted>
        当前清单用于界面预览，不代表真实采购建议。
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs
  },
  listCard: {
    padding: spacing.sm,
    gap: spacing.xs
  },
  categoryBlock: {
    gap: spacing.xs
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  items: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2
  },
  item: {
    minHeight: 24,
    width: "49%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  itemName: {
    flex: 1
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: colors.textMuted
  }
});
