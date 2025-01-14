import { useEffect } from 'react';

export const usePageLeaveWarning = (
  shouldWarn: boolean = true,
  message: string = 'Are you sure you want to leave? Any unsaved changes will be lost.'
): void => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldWarn) {
        // Modern browsers require returnValue to be set
        event.preventDefault();
        event.returnValue = message;
        // For older browsers
        return message;
      }
    };

    window.addEventListener(
      'beforeunload',
      handleBeforeUnload as EventListener
    );

    return () => {
      window.removeEventListener(
        'beforeunload',
        handleBeforeUnload as EventListener
      );
    };
  }, [shouldWarn, message]);
};
