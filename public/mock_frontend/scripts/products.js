const API_BASE = 'http://localhost:5000/api';
const productsTable = document.getElementById('productList');
const Addform = document.getElementById('productForm');
const Updateform = document.getElementById('editForm');
const getProductsButton = document.getElementById('getProducts');

Updateform.addEventListener('submit', (e) =>handleUpdateFormSubmit(e));
Addform.addEventListener('submit', (e) => handleAddFormSubmit(e));
getProductsButton.addEventListener('click', ()=> loadAllFromDB());

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

export const handleUpdateFormSubmit = async(e) =>  {
    e.preventDefault();
    const id = Updateform.id.value;
    Updateform.submitForm.disabled = true;
    const data = {
        name: Updateform.name.value,
        price: Updateform.price.value,
        description: Updateform.description.value,
        img: Updateform.img.value,
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
    Updateform.reset();
    Updateform.submitForm.disabled = true;
    loadAllFromDB(); 
    } catch (error) {
    console.error(error.message);
    }
}

export const handleAddFormSubmit = async(e) => {
    e.preventDefault();
    const data = {
        name: Addform.name.value,
        price: Addform.price.value,
        description: Addform.description.value,
        img: Addform.img.value
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
        Addform.reset();
        loadAllFromDB();
    } catch (err) {
        console.error(err.message);
    }
}

export async function loadAllFromDB(){
    productsTable.innerHTML = '';
    setRow(['Name', 'Price', 'Created', 'Modified', 'img', 'Actions'], productsTable, true);

    try {
    const res = await fetch(`${API_BASE}/products`);
    const data = await res.json();
    
    console.log(data);
    if(data.status === 204) return alert("DB products was empty");
    
    data.forEach(p => {
        const img = document.createElement('img'); img.src = p.img; img.alt = p.img; img.style.width = '20em'
        const delButton = deleteCreatorHelper(p.id);
        const editButton = editCreatorHelper(p.id);
        setRow([p.name, p.price, p.create_at, p.modified_at, img, delButton, editButton], productsTable, false);
    });
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
        Updateform.reset();
        Updateform.submitForm.disabled = true;
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
        Updateform.submitForm.disabled = false;
        Updateform.id.value = bId;
        Updateform.name.value = p.name;
        Updateform.price.value = p.price;
        Updateform.description.value = p.description;
        Updateform.img.value = p.img;
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


