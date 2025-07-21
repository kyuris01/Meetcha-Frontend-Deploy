import { useEffect, useState } from "react";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log("useAPI hook 실행됨");
export const useAPIs = (
  path: string,
  method = "GET",
  data?: any,
  withAuth = false,
  manual = false // 수동 실행 여부 추가
) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(!manual);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false); // 실행 트리거

  const access_token = sessionStorage.getItem("access-token");
  
  useEffect(() => {
    if (manual && !trigger) return;
    const fetchData = async () => {
      try {
        
        const res = await fetch(`${API_BASE}${path}`, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            ...(withAuth && { Authorization: `Bearer ${access_token}` }),
          },
          ...(data && { body: JSON.stringify(data) }),
        });
        
        const jsonData = await res.json();
       
        setResponse(jsonData);
      
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
  
    };

    fetchData();
  }, [trigger, path, method]); // trigger 변화 시 실행

  const fire = () => {
    setLoading(true);
    setTrigger((prev) => !prev); // toggle to retrigger
  };

  return { response, loading, error, fire };
};
