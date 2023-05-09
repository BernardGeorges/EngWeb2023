


exports.createDiv = function(id){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Management</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Task Management</h1>
                </header>
                <form class="w3-container w3-blue-grey" method="POST">
                    <h1>Task Creation</h1>
                    <fieldset>
                        <legend>Info</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value = "${id["value"]}"/>
                        <label>Name(Must be unique)</label>
                        <input class="w3-input w3-round" type="text" name="name"/>
                        <label>Description</label>
                        <input class="w3-input w3-round" type="text" name="description"/>
                        <label>Due date</label>
                        <input class="w3-input w3-round" type="text" name="due_date"/>
                        <label>Assignee</label>
                        <input class="w3-input w3-round" type="text" name="assignee"/>
                        <label>Done</label>
                        <input class="w3-check" type="checkbox" name="done" value="1" />  
                    </fieldset>
                    <button class="w3-btn w3-grey w3-mb-2" type="submit">Create</button>
                </form>
                `
}

exports.defaultEdit = function(id){
    return` <form class="w3-container w3-light-grey" method="POST">
                    <h1>Task Editing</h1>
                    <fieldset>
                        <legend>Info</legend>  
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly/> 
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" readonly name="Name"/>
                        <label>Description</label>
                        <input class="w3-input w3-round" type="text" name="Description"/>
                        <label>Due_date</label>
                        <input class="w3-input w3-round" type="text" name="Due date"/>
                        <label>Assignee</label>
                        <input class="w3-input w3-round" type="text" name="Assignee"/>
                    </fieldset>
                    <fieldset>    
                        <label>Done</label>
                        <input class="w3-check" type="checkbox" name="done" value="1" />  
                    </fieldset>
                    <button class="w3-btn w3-grey w3-mb-2" type="submit">Edit</button>
                </form>`
}

exports.tasks = function(task){
    toDo = []
    done = []
    for(let i=0; i < task.length ; i++){
        console.log(task[i])
       if("done" in task[i]){
            done.push(task[i])
       }else{
            toDo.push(task[i])
       }
    }
    console.log(toDo)
    console.log(done)
    pagHTML = ` <div class="w3-cell-row">
                    <div class="w3-container w3-red w3-cell">
                        <p>Tasks To be completed</p>
                    </div>

                    <div class="w3-container w3-green w3-cell">
                        <p>Tasks Already Complete</p>
                    </div>

                </div>        
                <div class="w3-cell-row">
                 <div class="w3-container w3-cell">
                    <table class="w3-table-all width:50%">
                        <tr>
                            <th>Id</th><th>Name</th><th>Due Date</th><th>Assignee</th>
                            <th>Description</th>
                        </tr>
                `
    for(let i=0; i < toDo.length ; i++){
        pagHTML += `
                <tr>
                    <td>${toDo[i].id}</td>
                    <td>${toDo[i].name}</td>
                    <td>${toDo[i].due_date}</td>
                    <td>${toDo[i].assignee}</td>
                    <td>${toDo[i].description}</td>
                    <td>
                        [<a href="/edit/to_do/${toDo[i].id}">Edit</a>][<a href="/complete/${toDo[i].id}">Complete</a>]
                    </td>
                </tr>
        `
    }

pagHTML += `
            </table>
            </div>
            <div class="w3-container w3-cell">
            <table class="w3-table-all width:50%">
                <tr>
                    <th>Id</th><th>Name</th><th>Completion Date</th><th>Assignee</th>
                    <th>Description</th>
                </tr>
        `
for(let i=0; i < done.length ; i++){
pagHTML += `
        <tr>
            <td>${done[i].id}</td>
            <td>${done[i].name}</td>
            <td>${done[i].completion_date}</td>
            <td>${done[i].assignee}</td>
            <td>${done[i].description}</td>
            <td>
                [<a href="/edit/done/${done[i].id}">Edit</a>]
            </td>
        </tr>
`
}

pagHTML += `
    </table>
    </div>
    </div>
    `
    return pagHTML
}


exports.footer = function(d){
   return`  <footer class="w3-container w3-blue">
                    <h5>Generated by EW2023 in ${d}</h5>
            </footer>
            </div>
        </body>
    </html>
    `
}