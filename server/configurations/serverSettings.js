export function getMongoConnection(){
    if (process.env.NODE_ENV === 'production') {
        return 'mongodb://Needmayer:o4Lh7jJP@ds261116.mlab.com:61116/food_diary';
    } else {
        return 'mongodb://localhost:27017/food_diary';
    }
}

export function getCookieSecret(){
    return 'ULTRA_HEAVY_COOKIE_SECURE-key';
}
