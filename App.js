const express=require('express')
const bodyParser=require('body-parser');
const TaskManager = require('./taskManager');
const app=express();
const port=3000;
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
const taskManager=new TaskManager();
app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/tasks',(req,res)=>{
    res.render('tasks',{tasks: taskManager.listTasks() })
})

app.post('/add-tasks',(req,res)=>{
    const{title,description,priority,dueDate}=req.body;
    taskManager.addTask({title,description,priority:parseInt(priority),dueDate})
    res.redirect('/tasks')
})

app.post('/remove-task',(req,res)=>{
    taskManager.removeTask(req.body.title)
    res.redirect('/tasks')

})
app.get('/urgent', (req, res) => {
    // Asumiendo que tienes un método getUrgentTasks en tu TaskManager
    const urgentTasks = taskManager.getUrgentTasks();
    res.render('urgent', { urgentTasks });
});
app.post('/add-urgent', (req, res) => {
   
    const { title, description, priority, dueDate } = req.body;
    
    // Aquí deberías tener una instancia de tu TaskManager
    // Por ejemplo: const taskManager = new TaskManager();
    
    taskManager.addUrgentTask({ title, description, priority: parseInt(priority), dueDate });
    
    // Redirige de vuelta a la página de tareas urgentes o donde prefieras
    res.redirect('/urgent');
});
app.post('/process-urgent',(req,res)=>{
    taskManager.processUrgentTasks();
    res.redirect('/urgent')

})
app.get('/categories',(req,res)=>{
    res.render('categories',{categoryTree:taskManager.getCategoryTree()})
})
app.post('/add-to-category',(req,res)=>{
    const{category,subcategory,title,description,priority,dueDate}=req.body;
    taskManager.addTaskToCategory(category,subcategory,{title,description,priority:parseInt(priority),dueDate})
    res.redirect('/categories')
})

app.listen(port,()=>{
    console.log(`App running at http://localhost:${port}`)
})