export enum Priority {
    Low = "LOW",
    Medium = "MEDIUM",
    High = "HIGH",
    Critical = "CRITICAL"
}

// 優先度の順序を定義する配列
export const PRIORITY_ORDER: Priority[] = [
    Priority.Low,
    Priority.Medium,
    Priority.High,
    Priority.Critical
];

// 優先度の数値を取得する関数（ソート用）
export function getPriorityValue(priority: Priority): number {
    return PRIORITY_ORDER.indexOf(priority);
}
