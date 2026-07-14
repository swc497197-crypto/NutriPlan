import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Notice } from "@/components/Notice";
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
    <Screen>
      <View>
        <AppText variant="h1" weight="700">
          本周购物清单
        </AppText>
        <AppText muted>
          已购买 {checkedCount}/{allShoppingItems.length} 项
        </AppText>
      </View>
      <Notice text="数量为演示估算，用于帮助界面预览，不代表真实采购建议。" />

      {allShoppingItems.length === 0 ? (
        <Card>
          <EmptyState title="暂无清单" text="生成计划后会在这里汇总一周食材。" />
        </Card>
      ) : null}

      {categories.map((category) => {
        const items = allShoppingItems.filter((item) => item.category === category);
        if (items.length === 0) return null;
        return (
          <Card key={category}>
            <AppText variant="h3" weight="700">
              {category}
            </AppText>
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
                    size={24}
                    color={checked ? colors.primary : colors.textMuted}
                  />
                  <View style={styles.itemText}>
                    <AppText weight="600" style={checked && styles.checkedText}>
                      {item.name}
                    </AppText>
                    <AppText variant="small" muted>
                      {item.amount}
                    </AppText>
                  </View>
                </Pressable>
              );
            })}
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  itemText: {
    flex: 1
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: colors.textMuted
  }
});
