module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/services/api.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authAPI": (()=>authAPI),
    "ridesAPI": (()=>ridesAPI),
    "userAPI": (()=>userAPI)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5001/api") || 'http://localhost:5001/api';
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL
});
// 🔐 Attach token to headers using interceptors
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    console.log('🔑 Token in interceptor:', token ? 'Present' : 'Missing');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔒 Added Authorization header');
    }
    return config;
}, (error)=>Promise.reject(error));
const ridesAPI = {
    createRide: async (rideData)=>{
        try {
            console.log('🚗 Creating ride with token:', localStorage.getItem('token') ? 'Present' : 'Missing');
            const response = await axiosInstance.post('/rides', rideData);
            console.log('✅ Ride created successfully');
            return response.data;
        } catch (error) {
            console.error('❌ Error creating ride:', error);
            if (error.response) {
                console.error('Error response:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
            } else if (error.request) {
                console.error('No response received:', error.request);
            }
            throw error;
        }
    },
    getAllRides: async (params = {})=>{
        try {
            const queryString = new URLSearchParams(params).toString();
            // Safely access localStorage only in browser environment
            const token = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : null;
            const response = await fetch(`/api/rides?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : {}
                }
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                console.error('Error response:', {
                    status: response.status,
                    data: errorData
                });
                throw new Error(`Failed to fetch rides: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching rides:', error);
            throw error;
        }
    },
    getRideById: async (id)=>{
        const response = await axiosInstance.get(`/rides/${id}`);
        return response.data;
    }
};
const authAPI = {
    login: async (credentials)=>{
        try {
            console.log('🔐 Attempting login...');
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/auth/login`, credentials);
            console.log('✅ Login response received:', response.data);
            const { token, user } = response.data;
            if (!token) {
                throw new Error('No token received from server');
            }
            console.log('💾 Storing token in localStorage...');
            localStorage.setItem('token', token);
            console.log('✅ Token stored successfully');
            return {
                token,
                user
            };
        } catch (error) {
            console.error('❌ Login Error:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
            throw error;
        }
    },
    register: async (userData)=>{
        try {
            console.log('📝 Attempting registration...');
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/auth/register`, userData);
            console.log('✅ Registration response received:', response.data);
            const { token, user } = response.data;
            if (!token) {
                throw new Error('No token received from server');
            }
            console.log('💾 Storing token in localStorage...');
            localStorage.setItem('token', token);
            console.log('✅ Token stored successfully');
            return {
                token,
                user
            };
        } catch (error) {
            console.error('❌ Registration Error:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
            throw error;
        }
    },
    logout: ()=>{
        console.log('🚪 Logging out, removing token...');
        localStorage.removeItem('token');
        console.log('✅ Token removed');
    }
};
const userAPI = {
    getProfile: async ()=>{
        try {
            console.log('👤 Fetching user profile...');
            const response = await axiosInstance.get('/user/profile');
            console.log('✅ Profile fetched successfully');
            return response.data;
        } catch (error) {
            console.error('❌ Profile Error:', error);
            throw error;
        }
    }
};
}}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const checkTokenExpiration = (token)=>{
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = payload.exp * 1000; // Convert to milliseconds
            // If token is expired or will expire in next 5 minutes
            if (expirationTime < Date.now() + 300000) {
                console.log('Token expired or expiring soon');
                localStorage.removeItem('token');
                setUser(null);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking token expiration:', error);
            localStorage.removeItem('token');
            setUser(null);
            return false;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            try {
                const token = localStorage.getItem('token');
                console.log('Checking auth with token:', token ? 'present' : 'absent');
                if (!token) {
                    setUser(null);
                    setIsLoading(false);
                    return;
                }
                if (checkTokenExpiration(token)) {
                    try {
                        const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userAPI"].getProfile();
                        console.log('User profile fetched:', userData);
                        setUser(userData);
                    } catch (error) {
                        console.error('Failed to fetch user profile:', error);
                        localStorage.removeItem('token');
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                setUser(null);
            } finally{
                setIsLoading(false);
            }
        };
        checkAuth();
        // Set up periodic token check every minute
        const tokenCheckInterval = setInterval(()=>{
            const token = localStorage.getItem('token');
            if (token) {
                checkTokenExpiration(token);
            }
        }, 60000);
        return ()=>clearInterval(tokenCheckInterval);
    }, []);
    const login = async (email, password)=>{
        try {
            setIsLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].login({
                email,
                password
            });
            if (!response || !response.token) {
                throw new Error('Invalid response from server');
            }
            console.log('Login successful, setting token and user');
            localStorage.setItem('token', response.token);
            if (response.user) {
                setUser(response.user);
                return response.user;
            }
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userAPI"].getProfile();
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'An unexpected error occurred. Please try again';
            if (error.response) {
                switch(error.response.status){
                    case 400:
                        errorMessage = 'Invalid email or password format';
                        break;
                    case 401:
                        errorMessage = 'Invalid email or password';
                        break;
                    case 404:
                        errorMessage = 'User not found';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try again later';
                        break;
                    default:
                        errorMessage = error.response.data?.message || errorMessage;
                }
            } else if (error.request) {
                errorMessage = 'Unable to connect to server. Please check your internet connection';
            }
            throw new Error(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    const register = async (userData)=>{
        try {
            setIsLoading(true);
            const { token, user: newUser } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].register(userData);
            if (!token || !newUser) {
                throw new Error('Invalid response from server during registration');
            }
            console.log('Registration successful, setting token and user');
            localStorage.setItem('token', token);
            setUser(newUser);
            return newUser;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const logout = ()=>{
        console.log('Logging out, clearing token and user');
        localStorage.removeItem('token');
        setUser(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].logout();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            login,
            register,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
}}),
"[project]/src/providers.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Providers": (()=>Providers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Providers({ children }) {
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
            defaultOptions: {
                queries: {
                    // During development, disable retries
                    retry: ("TURBOPACK compile-time value", "development") === 'production',
                    // Disable automatic background refetching
                    refetchOnWindowFocus: false,
                    // Keep data fresh for 5 minutes
                    staleTime: 5 * 60 * 1000
                }
            }
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/providers.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/providers.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__4c922881._.js.map