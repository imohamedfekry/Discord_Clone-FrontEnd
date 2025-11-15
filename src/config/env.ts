export const API_BASE_URL = "http://localhost:3000/api/v1";
export const API_TIMEOUT = 10000;

/**
 * الصفحات العامة (Public Pages)
 * 
 * ⚠️ Secure by default: أي صفحة مش في هذه القائمة = Protected (تلقائياً)
 * 
 * يعني:
 * - الصفحات هنا = Public (لا تحتاج authentication)
 * - أي صفحة تانية = Protected (تحتاج authentication)
 * 
 * مثال: لو عملت صفحة جديدة `/dashboard` ومش موجودة هنا → هتكون protected تلقائياً
 */
export const PUBLIC_PAGES = ["/login", "/register", "/about", "/privacy", "/"];

/**
 * الصفحات المحمية من المستخدمين المصادقين
 * 
 * هذه الصفحات متاحة فقط للمستخدمين غير المصادقين
 * لو المستخدم عامل login وحاول يدخلها → هيتوجه تلقائياً للصفحة الرئيسية
 * 
 * مثال: `/login` و `/register` - لو عامل login ما يقدرش يدخلهم
 */
export const AUTH_PROTECTED_PAGES = ["/login", "/register"];

/**
 * Helper function للتحقق من أن path هو public page
 * @param path - المسار الحالي للصفحة
 * @returns true إذا كانت الصفحة عامة، false إذا كانت محمية
 */
export const isPublicPage = (path: string): boolean => {
  return PUBLIC_PAGES.includes(path);
};

/**
 * Helper function للتحقق من أن path محمي من المستخدمين المصادقين
 * @param path - المسار الحالي للصفحة
 * @returns true إذا كانت الصفحة محمية من المستخدمين المصادقين
 */
export const isAuthProtectedPage = (path: string): boolean => {
  return AUTH_PROTECTED_PAGES.includes(path);
};