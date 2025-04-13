import { useState, useEffect, useCallback } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isMetered, setIsMetered] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  const updateConnectionStatus = useCallback((state: NetInfoState) => {
    setIsConnected(state.isConnected ?? true);
    setIsMetered(state.details?.isMetered ?? false);
    setConnectionType(state.type);
  }, []);

  useEffect(() => {
    NetInfo.fetch().then(updateConnectionStatus);

    const unsubscribe = NetInfo.addEventListener(updateConnectionStatus);

    return () => {
      unsubscribe();
    };
  }, [updateConnectionStatus]);

  return {
    isConnected,
    isMetered,
    connectionType,
    shouldDownload: useCallback(() => {
      return isConnected && (!isMetered || connectionType === "wifi");
    }, [isConnected, isMetered, connectionType]),
  };
}
