import { trpc } from "@/lib/trpc";

export function useServerHealth() {
  return trpc.health.ping.useQuery(undefined);
}

export function useViewer(enabled: boolean) {
  return trpc.viewer.me.useQuery(undefined, { enabled });
}

export function useUpdateViewerProfile() {
  const utils = trpc.useUtils();

  return trpc.viewer.updateProfile.useMutation({
    onSuccess: async () => {
      await utils.viewer.me.invalidate();
    },
  });
}
