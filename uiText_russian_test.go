package main

import "testing"

func TestUITextRussianDispatch(t *testing.T) {
	const (
		sEn = "sentinel-en"
		sZh = "sentinel-zh"
		sJa = "sentinel-ja"
		sRu = "sentinel-ru"
	)
	cases := []struct {
		locale string
		want   string
	}{
		{"en", sEn},
		{"zh-CN", sZh},
		{"ja", sJa},
		{"ru", sRu},
		{"fr-FR", sEn},
	}
	for _, tc := range cases {
		if got := uiText(tc.locale, sEn, sZh, sJa, sRu); got != tc.want {
			t.Errorf("uiText(%q, ...) = %q, want %q", tc.locale, got, tc.want)
		}
	}
}

func TestUnsavedChangesDialogRussianLabels(t *testing.T) {
	title := uiText("ru", "Unsaved changes", "有未保存的修改", "未保存の変更", "Несохранённые изменения")
	save := uiText("ru", "Save and continue", "保存并继续", "保存して続行", "Сохранить и продолжить")
	discard := uiText("ru", "Continue without saving", "不保存并继续", "保存せずに続行", "Продолжить без сохранения")
	cancel := uiText("ru", "Cancel", "取消", "キャンセル", "Отмена")
	if title == "" {
		t.Fatalf("russian dialog title is empty")
	}
	buttons := []string{save, discard, cancel}
	for i, label := range buttons {
		if label == "" {
			t.Fatalf("russian button label #%d is empty", i)
		}
		for j := i + 1; j < len(buttons); j++ {
			if label == buttons[j] {
				t.Fatalf("russian button labels #%d and #%d are duplicates: %q", i, j, label)
			}
		}
	}
}
