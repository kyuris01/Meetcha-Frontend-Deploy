import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: "always", // 새로고침 시 무조건 refetch
      staleTime: 0, // 캐시 즉시 stale
      retry: 1,
    },
  },
});


/*
if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass", // 처리 핸들러 없는 요청은 실제 서버로 보냄
  });
}
*/
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="124678612470-l0adtvcmdc1664nvmsovqoa7qtc0peoh.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        autoClose={2000}
        closeButton={false}
        draggable={false}
        hideProgressBar
        className="custom-toast-container"
        toastClassName="custom-toast"
        limit={1}
        icon={false}
      />
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
