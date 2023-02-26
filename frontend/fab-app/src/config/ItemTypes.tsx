export {}

export const CATEGORY_NAMES = {
    DEVICE:'Electronic Device',
    CHARGER:'Charger (for Electronic Device)',
    CLOTHING: 'Clothing Item',
    ACCESSORY: 'Wearable Accessory',
    MISC: 'Miscellaneous',
    CARD: 'Card',
    KEY: 'Key(s)',
    BOTTLE: 'Bottle/Liquid Container',
    SCHOOL_SUPPLY:'School Supplies',
    OTHER:'Other (Category not listed)'
}

/**
 * Lack of ambiguity is CRITICAL. If a finder/loser pick different categories,
 * our algorithm will not match the items.
 */
export const ITEM_TYPES = [
    // DEVICE
    {enumString: 'LAPTOP', label:'Laptop Computer', category: CATEGORY_NAMES.DEVICE},
    {enumString: 'PHONE', label:'Phone', category: CATEGORY_NAMES.DEVICE},
    {enumString: 'IPADTABLET', label:'Tablet (iPad, Kindle, ...)', category: CATEGORY_NAMES.DEVICE},
    {enumString: 'ELECTRONICWATCH', label:'Electronic Watch (Apple, fitbit, ...)', category: CATEGORY_NAMES.DEVICE},
    {enumString: 'EARPHONES', label:'Earphones/Headphones (Airpods, Beats, ...)', category: CATEGORY_NAMES.DEVICE},
    {enumString: 'CAMERA', label:'Camera', category: CATEGORY_NAMES.DEVICE},
    {enumString: 'OTHERDEVICE', label:'Other Electronic Device', category: CATEGORY_NAMES.DEVICE},
    // CHARGER
    {enumString: 'MACCHARGER', label:'Computer Charger', category:CATEGORY_NAMES.CHARGER},
    {enumString: 'PHONECHARGER', label:'Phone Charger', category:CATEGORY_NAMES.CHARGER},
    {enumString: 'OTHERCHARGER', label:'Other Device Charger', category:CATEGORY_NAMES.CHARGER},
    // CLOTHING
    {enumString: 'SHIRT', label:'Shirt', category: CATEGORY_NAMES.CLOTHING},
    {enumString: 'SWEATER', label:'Sweater or Jacket', category: CATEGORY_NAMES.CLOTHING},
    {enumString: 'SHOES', label:'Shoes', category: CATEGORY_NAMES.CLOTHING},
    {enumString: 'HAT', label:'Hat/Cap', category: CATEGORY_NAMES.CLOTHING},
    {enumString: 'BEANIE', label:'Beanie', category: CATEGORY_NAMES.CLOTHING},
    {enumString: 'OTHERCLOTHING', label:'Other Clothing Item', category: CATEGORY_NAMES.CLOTHING},
    //ACCESSORY
    {enumString: 'WATCH', label:'Watch (Analog)', category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'BRACELET', label:'Bracelet', category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'NECKLACE', label:'Necklace', category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'EYEGLASSES', label:'Eyeglasses', category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'SUNGLASSES', label:'Sunglasses', category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'EARRINGS', label:'Earrings', category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'FINGERRING', label: "Ring (Finger)", category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'BAG', label:'Purse/Tote Bag (or similar)', category: CATEGORY_NAMES.ACCESSORY},
    {enumString: 'OTHERJEWELRY', label:'Other Jewelry/Accessory', category: CATEGORY_NAMES.ACCESSORY},
    // MISC
    {enumString: 'WALLET', label:'Wallet', category: CATEGORY_NAMES.MISC},
    // CARD
    {enumString: 'STUDENTID', label:'Student ID', category: CATEGORY_NAMES.CARD},
    {enumString: 'CREDITCARD', label:'Credit Card', category: CATEGORY_NAMES.CARD},
    {enumString: 'DRIVERSLICENSE', label:'Driver\'s License', category: CATEGORY_NAMES.CARD},
    {enumString: 'OTHERCARD', label:'Other Card', category: CATEGORY_NAMES.CARD},
    // KEY
    {enumString: 'SINGLEKEY', label:'Key (Car, Room, ...)', category: CATEGORY_NAMES.KEY},
    {enumString: 'KEYRING', label:'Keychain or Keyring', category: CATEGORY_NAMES.KEY},
    // BOTTLE
    {enumString: 'WATERBOTTLE', label:'Water Bottle/Thermos', category: CATEGORY_NAMES.BOTTLE},
    // SCHOOL SUPPLY
    {enumString: 'NOTEBOOK', label:'Notebook', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'BACKPACK', label:'Backpack', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'BINDER', label:'Binder', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'FOLDER', label:'Folder', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'HARDCOVERBOOK', label:'Hardcover book/textbook', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'PAPERBACKBOOK', label:'Paperback book/textbook', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'CALCULATOR', label:'Calculator', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'PEN', label:'Pen', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'PENCIL', label:'Pencil', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    {enumString: 'OTHERSCHOOLSUPPLY', label:'Other School Supply Item', category: CATEGORY_NAMES.SCHOOL_SUPPLY},
    // OTHER
    {enumString: 'OTHER', label:'Other (Category not listed)', category: CATEGORY_NAMES.OTHER}


]
