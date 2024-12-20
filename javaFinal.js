console.log(shoppingList);
//Shows the list of items
const list = () => {
    let listofItems = ``;
    $.each(shoppingList, (index, item) =>{
        listofItems += `<li>${item.name} - $${item.cost.toFixed(2)}</li>`;
        $("#shoppingListContainer").html(listofItems);
    });
};

//Adds the total cost of all the items, displays them to the proper area
const totalCost = () => { 
    let costofItems = 0;
    shoppingList.forEach(item => {
        costofItems += item.cost;
    });

    $("#totalCost").text(`Total cost: $${costofItems.toFixed(2)}`);
};

//Allows the Show Details button to show all the other details of each item. Changes the button to say "Hide Details" after
const showDetails = () => { 
    let listofItems = ``;
    $.each(shoppingList, (index, item) => {
        listofItems += 
        `<li id="itemList">
        ${item.name} - $${item.cost.toFixed(2)} 
        <p > Type: ${item.type}</p>
        <p > Subtype: ${item.subtype}</p>
        <p > Description: ${item.description}</p>
        </li>`;
        $("#shoppingListContainer").html(listofItems);
        $("#showDetails").text("Hide Details");
        $("#showDetails").click(hideDetails);
    });
};


//Allows the details button to hide the details. Chnages the button to say "Show details" after
const hideDetails = () => { 
    list();
    $("#showDetails").text("Show Details");
    $("#showDetails").click(showDetails);
};


//Adds a new item to the list/array
const addItem = () => {
    let name = $("#id_newItem").val(); 
    let type = $("#id_type").val(); 
    let subtype = $("#id_subtype").val(); 
    let description = $("#id_description").val(); 
    let cost = parseFloat($("#id_cost").val());

    if (name && type && subtype && description && !isNaN(cost) && cost >= 0) { 
        const newItem = { 
            name: name, 
            type: type, 
            subtype: subtype,
            description: description,
            cost: cost
        };

        shoppingList.push(newItem); 

        $("#id_newItem").val("");
        $("#id_type").val("");
        $("#id_subtype").val("");
        $("#id_description").val("");
        $("#id_cost").val("");

        list(); 
        totalCost();
        alert("Item added successfully!");
    } else { 
        alert("Please fill all fields correctly.");
    }
};


//Updates a specific item
const updateItem = () => { 
    let itemToUpdate = $("#id_updateItem").val(); 
    let indexToFind = parseInt(itemToUpdate) - 1;
    if (!isNaN(indexToFind) && indexToFind >= 0 && indexToFind < shoppingList.length) {
        let currentItem = shoppingList[indexToFind];
        let nameUpdate = prompt(`Please update the name of the item. Current name: ${currentItem.name}`); 
        if (nameUpdate === "") { 
            currentItem.name = currentItem.name; 
            alert("Invalid name.");
        }else { 
            currentItem.name = nameUpdate;
        };
        let typeUpdate = prompt(`Please update the type of the item. Current type: ${currentItem.type}`);
        if (typeUpdate === "") { 
            currentItem.type = currentItem.type; 
            alert("Invalid type."); 
        }else { 
            currentItem.type =typeUpdate;
        };
        let subtypeUpdate = prompt(`Please update the subtype of the item. Current subtype: ${currentItem.subtype}`); 
        if (subtypeUpdate === "") {
            currentItem.subtype = currentItem.subtype; 
            alert("Invalid subtype.");
        }else { 
            currentItem.subtype = subtypeUpdate;
        }
        let descriptionUpdate = prompt(`Please update the desciption of the item. Current Description: ${currentItem.description}`);
        if (descriptionUpdate === "") { 
            currentItem.description = currentItem.description; 
            alert("Invalid description");
        }else { 
            currentItem.description = descriptionUpdate;
        }
        let costUpdate = parseFloat(prompt(`Please update the cost of the item. Current cost: ${currentItem.cost}`)); 
        if (!isNaN(costUpdate)) {
            currentItem.cost = costUpdate;
        }else {
            currentItem.cost = currentItem.cost;
            alert("Invalid cost entered.");
        };
        list();
        totalCost();
        $("#id_updateItem").val("");
        alert("Item successfully updated!");

} else { 
    alert("Invalid item number entered.");
    $("#id_updateItem").val("");
}
};


//Deletes a specific item or multiple items, based on the number on the list, the item name, item type, or item subtype
const deleteItem = () => { 
    let itemToDelete = $("#id_deleteItem").val();
    let itemFound = false;
    let indexToFind = parseInt(itemToDelete) - 1; 
    if (!isNaN(indexToFind) && indexToFind >= 0 && indexToFind < shoppingList.length) {
        shoppingList.splice(indexToFind, 1);
        itemFound = true;
        alert("Item has been successfully deleted.");
    } else {
        for (let i = 0; i < shoppingList.length; i++) {
            let item = shoppingList[i];
            if (itemToDelete.toLowerCase() === item.name.toLowerCase() || 
                itemToDelete.toLowerCase() === item.type.toLowerCase() || 
                itemToDelete.toLowerCase() === item.subtype.toLowerCase()) {
                shoppingList.splice(i, 1);
                itemFound = true;
                alert("Item has been successfully deleted.");
            };
        };
    };
    if (itemFound === false) {
        alert("Item was unable to be found. Please try again.");
    };

    list();
    totalCost();
};



//Loads the document 
$(document).ready(() => { 
    list();
    totalCost();

    $("#Add").click(addItem);
    $("#showDetails").click(showDetails);
    $("#deleteButton").click(deleteItem);
    $("#updateButton").click(updateItem);
});