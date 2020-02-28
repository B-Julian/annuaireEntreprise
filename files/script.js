const tableKey = 'cms-table';

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    localStorage.removeItem(tableKey);
})

let cmsTable;
let cmsTableDemo = {
    'Julian Besnard': {
        'phone': '706-706-7060',
        'address': '43 Rue du Chemin de Fer',
    },
    'jaaj': {
        'phone': '123-456-7890',
        'address': 'sau6 Rue du jouj',
    }
};

let refreshDOMSTable = () => {
    let cmsTableKeys = Object.keys(cmsTable); // ['Julian Besnard', 'jaaj']
    let tableContainer = document.getElementById('cmsTableContainer');
    let oldTableBody = document.getElementById('tableBody');
    tableContainer.removeChild(oldTableBody);

    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';

    for (let i = 0; i < cmsTableKeys.length; i++) {
        let currentRow = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentAddress = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');

        currentRow.className = 'cms-table-row';
    }
};