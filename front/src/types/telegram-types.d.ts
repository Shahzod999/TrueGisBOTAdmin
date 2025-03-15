/**
 * Определения типов для Telegram WebApp API
 */
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        BiometricManager: {
          isInited: boolean;
          isBiometricAvailable: boolean;
          biometricType: string;
          isAccessRequested: boolean;
          isAccessGranted: boolean;
          deviceId: string;
          isBiometricTokenSaved: boolean;
          
          init(): void;
          requestAccess(params: {
            reason?: string;
          }, callback: (accessGranted: boolean) => void): void;
          authenticate(params: {
            reason?: string;
          }, callback: (success: boolean, token?: string) => void): void;
          updateBiometricToken(token: string, callback: (updated: boolean) => void): void;
          openSettings(): void;
        };
        onEvent(eventName: string, callback: () => void): void;
        offEvent(eventName: string, callback: () => void): void;
      };
    };
  }
}

// Это пустой export чтобы TypeScript считал файл модулем
export {}; 