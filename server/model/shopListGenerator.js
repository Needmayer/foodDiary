class ShopListGenerator {
    
    constructor(){
        this.idList = [];
        
    }

    getAllRecipeIdsFromMenu(menu) {
        let groupList = {};
        for (const type in menu) {
            const element = menu[type];
            if (Array.isArray(element)) {
                for (let id of element) {
                    if (id != "") {
                        if (groupList[id]) {
                            let value = groupList[id];
                            groupList[id] = value + 1;
                        } else {
                            groupList[id] = 1;
                        }
                    }
                }
            }
        }

        return groupList;
    }
    
    addIngredience(ingredianceRow) {

    }
}

export default ShopListGenerator;