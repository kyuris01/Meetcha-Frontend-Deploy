import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "normalize.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: "always", // 새로고침 시 무조건 refetch
      staleTime: 1000 * 60 * 5, // 캐시 즉시 stale
      retry: 1,
    },
  },
});

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass", // 처리 핸들러 없는 요청은 실제 서버로 보냄
  });
}

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="214919872484-j05rks059n5hbtm083spk9s5dvg6m9cu.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        containerId="timerClose"
        autoClose={2000}
        closeButton={false}
        draggable={false}
        hideProgressBar
        className="toast-container-timer"
        toastClassName="toast-timer"
        limit={1}
        icon={false}
      />
      <ToastContainer
        containerId="clickClose"
        autoClose={false}
        closeButton={false}
        draggable={false}
        hideProgressBar
        closeOnClick={false}
        className="toast-container-click"
        toastClassName="toast-click"
        icon={false}
        onClick={() => toast.dismiss({ containerId: "clickClose" })}
      />
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
