class MenuGenerator {
    
    constructor(){
        this.breakfast = [];
        this.firstSnack = [];
        this.secondSnack = [];
        this.lunch = [];
        this.dinner = [];
        this.secondDinner = [];
        this.menu = {
            breakfast: [],
            firstSnack: [],
            lunch: [],
            secondSnack: [],
            dinner: [],
            secondDinner: []
        };
    }

    generateMenu(data) {
        this.sortByTags(data);
        this.fillMenu();

        return this.menu;
    }

    sortByTags(data) {
        data.forEach(element => {
            if (element.tags.includes("breakfast")) {
                this.breakfast.push(element["_id"]);
            }
            if (element.tags.includes("first snack")) {
                this.firstSnack.push(element["_id"]);
            }
            if (element.tags.includes("lunch")) {
                this.lunch.push(element["_id"]);
            }
            if (element.tags.includes("second snack")) {
                this.secondSnack.push(element["_id"]);
            }
            if (element.tags.includes("dinner")) {
                this.dinner.push(element["_id"]);
            }
            if (element.tags.includes("second dinner")) {
                this.secondDinner.push(element["_id"]);
            }
        });
    }

    fillMenu() {
        let i = 0;

        for (i = 0; i < 7; i += 1) {    
           this.menu.breakfast.push(this.getRandomItem(this.breakfast));
           this.menu.firstSnack.push(this.getRandomItem(this.firstSnack));
           this.menu.lunch.push(this.getRandomItem(this.lunch));
           this.menu.secondSnack.push(this.getRandomItem(this.secondSnack));
           this.menu.dinner.push(this.getRandomItem(this.dinner));
           this.menu.secondDinner.push(this.getRandomItem(this.secondDinner));
        }
        console.log(this.menu);
    }

    getRandomItem(array) {
        if (array.length === 0) {
            return [];
        }

        let randomItem = array[Math.floor(Math.random()*array.length)];

        return randomItem;
    }
}

export default MenuGenerator;