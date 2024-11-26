console.log(shoppingList);
const list = () => {
    let listofItems = ``;
    $.each(shoppingList, (index, item) =>{
        listofItems += `<li>${item.name} - $${item.cost.toFixed(2)}</li>`;
        $("#shoppingListContainer").html(listofItems);
    });
};

const totalCost = () => { 
    let costofItems = 0;
    shoppingList.forEach(item => {
        costofItems += item.cost;
    });

    $("#totalCost").text(`Total cost: $${costofItems.toFixed(2)}`);
};

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

const hideDetails = () => { 
    let listofItems = ``; 
    $.each(shoppingList, (index, item) =>{
        listofItems += `<li>${item.name} - $${item.cost.toFixed(2)}</li>`;
        $("#shoppingListContainer").html(listofItems);
        $("#showDetails").text("Show Details");
        $("#showDetails").click(showDetails);
    });
};

// const toggleDetails = () => { 
//     if ($("#showDetails").click()) {

       
// }

const addItem = () => {
    const name = $("#id_newItem").val(); 
    const type = $("#id_type").val(); 
    const subtype = $("#id_subtype").val(); 
    const description = $("#id_description").val(); 
    const cost = parseFloat($("#id_cost").val());

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
    } else { 
        alert("Please fill all fields correctly.");
    }
};
    

const updateItem = () => { 

};


const deleteItem = () => { 
    let itemToDelete = $("#id_deleteItem").val().trim();
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
                break;
            };
        };
    };
    if (!itemFound) {
        alert("Item was unable to be found. Please try again.");
    };

    list();
    totalCost();
};



// const deleteItem = () => { 
//     let itemToDelete = $("#id_deletedItem").val();
//     let itemFound = false;
//     let indexToFind = parseInt(itemToDelete) - 1; 

//     if (!isNaN(indexToFind) && indexToFind >= 0 && indexToFind <= shoppingList.length) { 
//         shoppingList.splice(indexToFind, 1);
//         itemFound = true;
//         if (itemFound = true){ 
//             alert("Item has been successfully deleted.");
//         } else { 
//             alert("Item was unable to be found. Please try again.");
//         };
//     }else { 
//         for (let i = 0; i < shoppingList.length; i++) { 
//             if (itemToDelete == shoppingList.name || shoppingList.type || shoppingList.subtype) {
//                 shoppingList.splice(i, 1);
//                 itemFound = true;
//                 if (itemFound = true){ 
//                     alert("Item has been successfully deleted.");
//                 } else { 
//                     alert("Item was unable to be found. Please try again.");
//                 };
//             };
//         };
//     };
// };



$(document).ready(() => { 
    list();
    totalCost();

    $("#Add").click(addItem);
    $("#showDetails").click(showDetails);
    $("#deleteButton").click(deleteItem);
})