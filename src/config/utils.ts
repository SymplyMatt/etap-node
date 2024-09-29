export const adminRoles = ['admin', 'finance', 'customer-service'];
export const productCategories = ['iPhone', 'Apple watch', 'MacBook', 'ipad'] as const;
export const productConditions = ['brand new', 'used'] as const;
export const iphoneGrades = ['new', 'flawless', 'very good', 'good'] as const;
export const iwatchGrades = ['new', 'used'] as const;
export const macbookGrades = ['new', 'used'] as const;
export const ipadGrades = ['new', 'used'] as const;
export const productGrades = [...new Set([...iphoneGrades,...iwatchGrades,...macbookGrades,...ipadGrades])] as const;
export type GradeCategory = 'macbook' | 'iphone' | 'apple watch' | 'ipad';

export const gradeCategories: Record<GradeCategory, readonly string[]> = {
    macbook: ['new', 'used'],
    iphone: ['new', 'flawless', 'very good', 'good'],
    'apple watch': ['new', 'used'],
    ipad: ['new', 'used']
};
export const productCarrierStatuses = ['locked', 'unlocked', null] as const;
export const productSimTypes = ['physical sim', 'e-sim', 'physical sim and e-sim','gps', 'lte', null] as const;
export const productStatuses = ['draft', 'available', 'sold', 'pending swap', 'unavailable'] as const;
export const productDeviceTypes = ['platform', 'user'] as const;
export const productDefaultImage = ' https://res.cloudinary.com/damltcdhl/image/upload/v1721866091/products/1841523f-ad8c-48e1-b1c8-51f7a3fe5ce6.png' as const;
export const deliveryFee = 10000;
export const generateSixDigitCode = (): string => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString().padStart(6, '0');
};
export const deductions = {
    new : 10,
    flawless : 20,
    veryGood : 30,
    good : 40,
}  
export const iPhones = [
    "iPhone 6s",
    "iPhone 7",
    "iPhone 7plus",
    "iPhone 8",
    "iPhone 8plus",
    "iPhone X",
    "iPhone XR",
    "iPhone XS",
    "iPhone XS Max",
    "iPhone 11",
    "iPhone 11 Pro",
    "iPhone 11 Pro Max",
    "iPhone 12 mini",
    "iPhone 12",
    "iPhone 12 Pro",
    "iPhone 12 Pro Max",
    "iPhone 13 Mini",
    "iPhone 13",
    "iPhone 13 Pro",
    "iPhone 13 Pro Max",
    "iPhone SE (2nd gen)",
    "iPhone SE (3rd gen)",
    "iPhone 14",
    "iPhone 14plus",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max",
    "iPhone 15",
    "iPhone 15plus",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max"
];
export const fe_url = 'https://test-web.rhmstech.com/checkout'