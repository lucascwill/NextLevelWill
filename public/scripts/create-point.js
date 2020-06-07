function populateufs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()} )
    .then( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateufs()

function getcities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then( (res) => {return res.json()} )
    .then( cities => {

        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}



document
.querySelector("select[name=uf]")
.addEventListener("change", getcities)


// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []
6
function handleSelectedItem(event) {
    const itemLi = event.target
    // add or remove class com js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id 

    // console.log("ITEM ID", itemId)

    // verificar se existem itens selecionados, se sim quais pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
      const itemFound = item == itemId
        return itemFound
    })
    // const alreadySelected = selectedItems.findIndex( item => {
        // item == itemId
    // se ja estiver selecionado, tirar da selecao
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter ( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)

    }
    
    console.log("selectedItems", selectedItems)
    
    // se nao estiver selecionado, adicionar a selecao
    // atualizar o campo hidden com os dados selecionados
    collectedItems.value = selectedItems
}