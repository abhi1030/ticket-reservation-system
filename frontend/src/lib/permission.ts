import { User } from "../context/AuthContext";

const hasPermission = (user: User | null, permission: string | string[]) => {
    if (!user) return false;
    if (Array.isArray(permission)) {
        return permission.some((p) => user.permissions.includes(p));
    }
    return user.permissions.includes(permission);
}

export { hasPermission };