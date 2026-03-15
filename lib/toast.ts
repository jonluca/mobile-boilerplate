import * as Burnt from "burnt";
import { useAppStore } from "@/store";

type ToastTone = "success" | "error" | "info";

interface ShowToastOptions {
  title: string;
  message?: string;
  tone?: ToastTone;
}

const toastPresetByTone = {
  error: "error",
  info: "none",
  success: "done",
} as const;

const toastHapticByTone = {
  error: "error",
  info: "none",
  success: "success",
} as const;

export function showToast({ title, message, tone = "success" }: ShowToastOptions) {
  const enableHaptics = useAppStore.getState().enableHaptics;

  return Burnt.toast({
    duration: 5,
    from: "top",
    haptic: enableHaptics ? toastHapticByTone[tone] : "none",
    message,
    preset: toastPresetByTone[tone],
    title,
  });
}
