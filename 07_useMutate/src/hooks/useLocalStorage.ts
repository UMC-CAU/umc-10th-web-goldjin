export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try{
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error("localStorage에 값을 저장하는 중 오류가 발생했습니다.", error)
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (error) {
            console.error(error)
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error(error)
        }   
    };

    return { setItem, getItem, removeItem }
};