import { createContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    userId: number | null;
    login: (token: string, userId: number) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [userId, setUserId] = useState<number | null>(() => {
        const storedUserId = localStorage.getItem("userId");
        return storedUserId ? Number(storedUserId) : null;
    });

    const login = (token: string, userId: number) => {

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId.toString());

        setToken(token);
        setUserId(userId);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                userId,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};