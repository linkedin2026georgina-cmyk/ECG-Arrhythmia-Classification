import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

/**
 * This Hook manages the global state of notifications.
 * It uses a simple observer pattern to allow any part of the ECG app
 * to trigger alerts without causing unnecessary re-renders.
 */

const NOTIFICATION_LIMIT = 1; // Keeping it focused on one critical alert at a time
const AUTO_DISMISS_DELAY = 5000; // 5 seconds is standard for medical alerts

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Internal action types for the state reducer
const ActionTypes = {
  ADD: "ADD_TOAST",
  UPDATE: "UPDATE_TOAST",
  DISMISS: "DISMISS_TOAST",
  REMOVE: "REMOVE_TOAST",
} as const;

let toastCounter = 0;

function generateUniqueId() {
  toastCounter = (toastCounter + 1) % Number.MAX_SAFE_INTEGER;
  return `alert-${toastCounter}`;
}

interface State {
  toasts: ToasterToast[];
}

const toastTimerMap = new Map<string, ReturnType<typeof setTimeout>>();

const queueForRemoval = (toastId: string) => {
  if (toastTimerMap.has(toastId)) return;

  const timer = setTimeout(() => {
    toastTimerMap.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, AUTO_DISMISS_DELAY);

  toastTimerMap.set(toastId, timer);
};

export const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, NOTIFICATION_LIMIT),
      };

    case ActionTypes.UPDATE:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case ActionTypes.DISMISS:
      const { toastId } = action;
      if (toastId) queueForRemoval(toastId);
      else state.toasts.forEach((t) => queueForRemoval(t.id));

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };

    case ActionTypes.REMOVE:
      if (action.toastId === undefined) return { ...state, toasts: [] };
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    
    default:
      return state;
  }
};

const stateListeners: Array<(state: State) => void> = [];
let globalState: State = { toasts: [] };

function dispatch(action: any) {
  globalState = reducer(globalState, action);
  stateListeners.forEach((listener) => listener(globalState));
}

export function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = generateUniqueId();

  const update = (props: ToasterToast) => dispatch({ type: ActionTypes.UPDATE, toast: { ...props, id } });
  const dismiss = () => dispatch({ type: ActionTypes.DISMISS, toastId: id });

  dispatch({
    type: ActionTypes.ADD,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => { if (!open) dismiss(); },
    },
  });

  return { id, dismiss, update };
}

export function useToast() {
  const [state, setState] = React.useState<State>(globalState);

  React.useEffect(() => {
    stateListeners.push(setState);
    return () => {
      const index = stateListeners.indexOf(setState);
      if (index > -1) stateListeners.splice(index, 1);
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: ActionTypes.DISMISS, toastId }),
  };
}