import { useEffect, useState } from "react";

interface MSWProviderProps {
  children: React.ReactNode;
}

export const MSWProvider = ({ children }: MSWProviderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./browser");
        await worker.start({
          onUnhandledRequest: "bypass", // 처리 핸들러 없는 요청은 실제 서버로 보냄
        });
      }
      setIsReady(true);
    };

    initMSW();
  }, []);

  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>MSW로딩중...</p>
      </div>
    );
  }

  return <>{children}</>;
};
