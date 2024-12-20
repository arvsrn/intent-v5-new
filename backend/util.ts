// why is this not inbuilt 
export const parseCookies = (cookieHeader: string | null) => {
    const cookies: Record<string, string> = {};
    
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            cookies[name] = value;
        });
    }
    
    return cookies;
}