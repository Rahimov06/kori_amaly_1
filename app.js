class Todo {
    constructor(data = []) {
    this.box = document.querySelector(".box");
    this.form = document.querySelector(".form"); // <-- ё .from -> хато! бояд .form бошад
    this.data = Array.isArray(data) ? data : [];

    // Агар элементҳо набошанд, хабар диҳем (ва аз crash пешгирӣ мекунем)
    if (!this.box) console.warn('Element .box not found in the DOM');
    if (!this.form) {
      console.error('Element .form not found in the DOM. Check your HTML class name!');
    } else {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = e.target.elements["name"];
        const descInput = e.target.elements["desc"];

        const name = nameInput ? nameInput.value.trim() : "";
        const desc = descInput ? descInput.value.trim() : "";

        if (!name) {
          alert("Please enter a name");
          return;
        }
        if (!desc) {
          alert("Please enter a desc");
          return;
        }

        this.addData({ name, desc });
        e.target.reset();
      });
    }

  }

    addData({name , desc}) {
        const newObj = {
            id:Date.now(),
            name: name, 
            desc: desc, 
            status:false
        }

        this.data.push(newObj)
        this.getData()
    }

    getData() {
        this.box.innerHTML = ''
        this.data.forEach((item) => {
            let div = document.createElement("div")
            let h1 = document.createElement('h1')
            let p = document.createElement("p")
            let bntDel = document.createElement("button")
            bntDel.innerHTML = 'delete'
            bntDel.onclick = ()=> {
                this.deleteData(item.id)
                this.getData()
            }

            h1.innerHTML = `${item.name}`
            p.innerHTML = `${item.desc}`

            div.append(h1, p , bntDel )
            this.box.append(div)
        })
    }



    deleteData(id) {
       this.data = this.data.filter((el)=> el.id != id)
    }
}

const todo = new Todo([
    {
        id: 1, 
        name: 'Task1', 
        desc: 'tasusy', 
        status:false
    },
    {
        id: 2, 
        name: 'Task2', 
        desc: 'second task', 
        status:false
    },
    {
        id: 3, 
        name: 'Task3', 
        desc: 'third task', 
        status:false
    },
    {
        id: 4, 
        name: 'Task4', 
        desc: 'fourth task', 
        status:false
    }
])

todo.getData()
