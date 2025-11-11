const API_BASE = 'http://localhost:5000/api';
const productsTable = document.getElementById('productList');
const getProductsButton = document.getElementById('getProducts');
const pushCreateButton = document.getElementById('pushCreate');
const pushUpdateButton = document.getElementById('pushUpdate');

pushCreateButton.addEventListener('click', (e) => {
    console.log("clicked");
    e.preventDefault();
    handleAddFormSubmit();
});
pushUpdateButton.addEventListener('click', (e) => {
    console.log("clicked");
    e.preventDefault();
    handleUpdateFormSubmit();
});

getProductsButton.addEventListener('click', (e) => {
    console.log("clicked");
    e.preventDefault();
    loadAllFromDB();
});

window.onload = () => loadAllFromDB();

/**
 * 
 * @param {Object} headers 
 * @param {HTMLElement} table 
 * @param {bool} isHeader - whether to generate the row as headers
 */
export function setRow(headers, table, isHeader){
    const newHeader = document.createElement('tr') ;
    for(const data of headers){
    const td = document.createElement(isHeader === true ? 'th' :'td');
    if(data instanceof HTMLElement){
        td.appendChild(data);
    }else{
        td.textContent = data
    }
    newHeader.appendChild(td);
    }
    table.appendChild(newHeader);
    return this;
}

export const handleUpdateFormSubmit = async() =>  {
    const id = document.getElementById("updateId").value;
    pushUpdateButton.disabled = true;
    const data = {
        name: document.getElementById("updateName").value,
        price: document.getElementById("updatePrice").value,
        description: document.getElementById("updateDesc").value,
        img: document.getElementById("updateImg").value,
    }

    try {
        const res = await fetch(`${API_BASE}/products/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error(`Failed to Update ${id}: ${res.statusText}`);
        const result = await res.json();
        console.log('Success:', result);
        pushUpdateButton.disabled = true;
        loadAllFromDB(); 
    } catch (error) {
    console.error(error.message);
    }
}

export const handleAddFormSubmit = async() => {
    const data = {
        name: document.getElementById("createName").value,
        price: document.getElementById("createPrice").value,
        description: document.getElementById("createDesc").value,
        img: document.getElementById("createImg").value
    };

    console.log(`@ products.js img : ${data.img.value}`);
    
    try {
        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log('Success:', result);
        handleInputReset();
        loadAllFromDB();
    } catch (err) {
        console.error(err.message);
    }
}

function handleInputReset(){
    
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
    
        if (input.type === 'text' || input.type === 'password' || input.type === 'email' || input.type === 'number') {
            input.value = '';
        }
    });
}

export async function loadAllFromDB(){
    productsTable.innerHTML = '';
    setRow(['Name', 'Price', 'Created', 'Modified', 'img', 'tags', 'stats','Actions'], productsTable, true);

    try {
    const res = await fetch(`${API_BASE}/products`);
    const data = await res.json();
    
    console.log(data);
    if(data.status === 204) return alert("DB products was empty");
    
    data.forEach(p => {
        const img = document.createElement('img');
        p.img == "" ? img.src = "": img.src = p.img; 
        console.log(`"${p.img}" !== "No image found"`)

        img.alt = p.img; 
        img.style.width = '20em';
        const delButton = deleteCreatorHelper(p.id);
        const editButton = editCreatorHelper(p.id);
        const tags = p.tags.reduce((string, curr)=> {return string + ", " +curr},"");
        const likes = p.stats?.likes ?? 0;
        const views = p.stats?.views ?? 0;
        const shares = p.stats?.shares ?? 0;
        const statsSummary = document.createElement('p'); statsSummary.innerHTML = `👍${likes}👁‍🗨 ${views}🔃 ${shares}`
        setRow([p.name, p.price, p.create_at, p.modified_at, tags, statsSummary, img, delButton, editButton], productsTable, false);
    });
    handleInputReset();
    } catch (err) {
        console.error("Error @ products.js in mock_frontend",err.message);
    }
};

function deleteCreatorHelper(bId){
    const newButton = document.createElement('INPUT');
    newButton.setAttribute("type", "button"); 
    newButton.style.backgroundColor = "red"; 
    newButton.value = "Delete";
    newButton.addEventListener("click", async() => {
    try {
        const res = await fetch(`${API_BASE}/products/${bId}`, { method: "DELETE"});
        if (!res.ok) throw new Error(`Failed to Delete ${bId}: ${res.statusText}`);
        console.log(`$Deleted product ${bId}`);
        loadAllFromDB(); // refresh the list
        handleInputReset();
        pushUpdateButton.disabled = true;
    } catch (err) {
        console.error(err);
    }
    });
    return newButton;
}

function editCreatorHelper(bId){
    const newButton = document.createElement('INPUT');
    newButton.setAttribute("type", "button"); 
    newButton.style.backgroundColor = "green"; 
    newButton.value = "Update";
    newButton.addEventListener("click", async() => {
        try {
            const res = await fetch(`${API_BASE}/products/${bId}`, { method: "GET"});
            if (!res.ok) throw new Error(`Failed to Load ${bId}: ${res.statusText}`);
            const p = await res.json();
            pushUpdateButton.disabled = false;
            document.getElementById("updateId").value = bId;
            document.getElementById("updateName").value = p.name;
            document.getElementById("updatePrice").value = p.price;
            document.getElementById("updateDesc").value = p.description;
            document.getElementById("updateImg").value = p.img;
        } catch (err) {
            console.error(err);
        }
    });
    return newButton;
}

console.log("Module loaded!");

/*
const func1 = () => {
    //smth
};

func2(){
    //smth
}

someFunction(funct1);
someFunction( () => func1() );

someFunction(funct2);
someFunction(() => funct2());

someFunction(func3);
//only works if 

function func3(){
    return ()=>smth;
}
//where func3 actualyl returns an arrow funciton

*/


