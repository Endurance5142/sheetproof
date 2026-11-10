import { describe, expect, it } from "vitest";
import { en } from "./messages/en";
import { zhCN } from "./messages/zh-CN";
import { ja } from "./messages/ja";
import { ru } from "./messages/ru";

const catalogs = { en, "zh-CN": zhCN, ja, ru } as const;

describe("desktop message catalogs", () => {
  it("keeps exactly the same semantic keys in every locale", () => {
    const expected = Object.keys(en).sort();
    for (const messages of Object.values(catalogs)) expect(Object.keys(messages).sort()).toEqual(expected);
  });

  it("contains localized welcome, toolbar, repository, context, external-change, and UGit text", () => {
    for (const messages of Object.values(catalogs)) {
      for (const key of ["welcome.title", "toolbar.nextDifference", "repository.currentBranch", "context.copyCells", "externalChange.reload", "toolbar.configureUGit"] as const) {
        expect(messages[key]).toBeTypeOf("string");
        expect(messages[key]).not.toBe(key);
      }
    }
    expect(zhCN["welcome.title"]).toContain("仓库");
    expect(ja["welcome.title"]).toContain("リポジトリ");
    expect(ru["welcome.title"]).toContain("репозитори");
  });

  it("uses locale-aware complete templates for dynamic quantities", () => {
    expect(en["toolbar.copyCellsToLeft"]({ count: 1 })).toBe("Copy left (1)");
    expect(en["toolbar.copyCellsToLeft"]({ count: 3 })).toBe("Copy left (3)");
    expect(zhCN["toolbar.copyCellsToLeft"]({ count: 3 })).toBe("复制到左侧（3）");
    expect(ja["toolbar.copyCellsToLeft"]({ count: 3 })).toBe("左側へ反映（3）");
    expect(ru["toolbar.copyCellsToLeft"]({ count: 3 })).toBe("Применить слева (3)");
  });

  it("uses Russian plural forms for counts ending in 1, 2-4, 5-20, and 11-14", () => {
    expect(ru["diff.count"]({ count: 1 })).toBe("1 различие");
    expect(ru["diff.count"]({ count: 21 })).toBe("21 различие");
    expect(ru["diff.count"]({ count: 2 })).toBe("2 различия");
    expect(ru["diff.count"]({ count: 22 })).toBe("22 различия");
    expect(ru["diff.count"]({ count: 5 })).toBe("5 различий");
    expect(ru["diff.count"]({ count: 11 })).toBe("11 различий");
    expect(ru["diff.count"]({ count: 112 })).toBe("112 различий");
    expect(ru["diff.selectedCells"]({ count: 21 })).toBe("Выбрана 21 ячейка");
    expect(ru["diff.selectedCells"]({ count: 3 })).toBe("Выбраны 3 ячейки");
    expect(ru["diff.selectedCells"]({ count: 12 })).toBe("Выбрано 12 ячеек");
    expect(ru["context.selectedRows"]({ count: 1, row: 7 })).toBe("Строка 7");
    expect(ru["context.selectedRows"]({ count: 21, row: 7 })).toBe("Выбрано строк: 21");
  });
});
