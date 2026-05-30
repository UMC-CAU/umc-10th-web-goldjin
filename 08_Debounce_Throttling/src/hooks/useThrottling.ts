import { useEffect, useRef, useState } from "react";

export const useThrottle = <T>(value: T, interval = 3000) => {
const [throttledValue, setThrottledValue] = useState<T>(value);
  
    // 2. 마지막으로 값이 업데이트된 시점을 기록할 ref
    const lastExecuted = useRef<number>(Date.now());
    
    // 3. 타이머 인스턴스를 저장할 ref (클린업용)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const now = Date.now();
        const timeElapsed = now - lastExecuted.current;

        // 타이머가 이미 돌고 있다면 중복 생성을 막기 위해 정리
        if (timerRef.current) {
        clearTimeout(timerRef.current);
        }

        // 설정한 인터벌 시간이 이미 지났다면 즉시 업데이트
        if (timeElapsed >= interval) {
        setThrottledValue(value);
        lastExecuted.current = now;
        } else {
        // 아직 시간이 안 지났다면, 남은 시간(interval - timeElapsed) 후에 
        // 마지막으로 들어온 최신 값을 반영하도록 타이머를 설정합니다.
        timerRef.current = setTimeout(() => {
            setThrottledValue(value);
            lastExecuted.current = Date.now();
        }, interval - timeElapsed);
        }

        // 4. 언마운트되거나 의존성이 바뀔 때 타이머를 깨끗하게 정리 (메모리 누수 방지)
        return () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        };
    }, [value, interval]);

    return throttledValue;
}