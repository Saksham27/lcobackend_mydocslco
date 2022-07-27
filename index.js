const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fileupload = require('express-fileupload');
const app = express();

const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileupload());


let courses = [
    {
        id: "11",
        name: "Learn ReactJS",
        price: 299
    },
    {
        id: "22",
        name: "Learn AngularJS",
        price: 299
    },
    {
        id: "33",
        name: "Learn VueJS",
        price: 259
    },
    {
        id: "44",
        name: "Learn .NET Core",
        price: 399
    },
];

app.get('/', (req, res) => {
	res.send('Welcome to documentation app !!!');
});

app.get('/api/v1/lco', (req, res) => {
	res.send('Welcome to LCO documentation app !!!');
});

app.get('/api/v1/lcoobject', (req, res) => {
	res.json(courses[1]);
});

app.get('/api/v1/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/v1/mycourses/:courseId', (req, res) => {
	const myCourse = courses.find(course => course.id === req.params.courseId);
    res.send(myCourse);
});

app.post('/api/v1/addcourse',(req,res)=>{
    courses.push(req.body);
    res.send(true);
})

app.get('/api/v1/coursequery',(req,res)=>{
    let location = req.query.location;
    let device = req.query.device;
    res.send({location, device})
})

app.post('/api/v1/courseupload',(req,res)=>{
    console.log(req.headers);
    const file = req.files.uploadedFile;
    let path = `${__dirname}/uploadedImages/${Date.now()}.jpg`;

    file.mv(path, (err)=>{
        res.send(true);
    })
})


app.listen('4000', () => {
	console.log(`Server is running at port : 4000`);
});
