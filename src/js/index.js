import "../css/style.scss";
import tData from "../data";

class Table {
    constructor(tData, pageCapacity) {
        this.tData = tData;
        this.pageCapacity = pageCapacity;
        this.page = 1;
    }

    drawTable() {
        this.removeTable();
        if (!document.querySelector('.page')) this.pagination();


        let table = document.createElement('div');
        let header = document.createElement('div');
        let body = document.createElement('div');


        table.setAttribute("id", "table");
        header.setAttribute("class", "header");
        body.setAttribute("class", "body");


        //---------------HEADER-------------------

        let arr = this.tData.map(el => Object.keys(el));
        let uniqueArr = [];

        for (let el of arr.flat()) {
            if (!uniqueArr.includes(el)) {
                uniqueArr.push(el);
            }
        }

        header.innerHTML += uniqueArr.map(key =>`<div class="header-element"> ${key} </div>`).join('');

        table.appendChild(header);

        header.addEventListener('click', e => {
            this.sortTable(e.target.innerHTML);
        })

        //-----------------------BODY-------------------------

        let firstPage = this.tData.slice(0, this.pageCapacity).length;

        let pData = this.tData.slice(firstPage * (this.page - 1), this.pageCapacity * this.page);
        body.innerHTML += pData.map(el => {
            let res = `<div>`;
            for (let j = 0; j < uniqueArr.length; j++) {
                if (el[uniqueArr[j]] == undefined) el[uniqueArr[j]] = "";
                res += `<div class="body-element">${el[uniqueArr[j]]}</div>`;
            }
            res += `</div>`;
            return res;
        }).join('');

        table.appendChild(body);
        document.querySelector('body').appendChild(table);
    }

    sortTable(sortBy) {
        this.tData.sort((a, b) => a[sortBy.trim()] > b[sortBy.trim()] ? 1 : -1);
        this.removeTable();
        this.drawTable();
    }

    removeTable() {
        if (document.querySelector('#table')) {
            document.querySelector('body').removeChild(document.querySelector('#table'));
        }
    }

    pagination() {
        let allPagesDiv = document.createElement('div');
        allPagesDiv.classList.add('pages');
        let pages = Math.ceil(this.tData.length / this.pageCapacity) + 1;
        allPagesDiv.innerHTML = "";

        for (let i = 1; i < pages; i++) {

            let pageDiv = document.createElement('div');
            pageDiv.classList.add('page');
            pageDiv.innerHTML = i;
            if (i == this.page) pageDiv.classList.add('active');
            allPagesDiv.appendChild(pageDiv);
        }

        document.querySelector('body').appendChild(allPagesDiv);

        allPagesDiv.addEventListener('click', (e) => {
            if (document.querySelector('.active')) {
                document.querySelector('.active').classList.remove('active');
            }
            if (e.target.classList.contains('page')) {
                e.target.classList.add('active');
                this.page = e.target.innerHTML;
                this.drawTable();
            }
        })

    }

}


let table = new Table(tData, 5)
table.drawTable();