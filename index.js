const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('assets'));

var contactList = [
    {
        'name' : 'Raghav',
        'phone' : 8484848484
    },
    {
        'name' : 'Ravi',
        'phone' : 8484969696
    },
    {
        'name' : 'Prabhat',
        'phone' : 8484848484
    },
    {
        'name' : 'Prakhar',
        'phone' : 3847298591
    }
];

app.get('/', function(req, res){
    console.log(req.url);
    // return res.render('home', {
    //     'title' : 'Contact List',
    //     'contact_list' : contactList
    // });
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts, ', err);
            return;
        }
        return res.render('home', {
            'title' : 'Contact List',
            'contact_list' : contacts
        });
    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        'title' : 'Playground'
    });
});

app.post('/create-contact', function(req, res){
    // contactList.push({
    //     'name' : req.body.name,
    //     'phone' : req.body.phone
    // });
    // return res.redirect('back');
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('Error in adding contact', err);
            return res.redirect('back');
        }
        console.log('Contact is added : ', newContact);
        return res.redirect('back');
    });
});

// for deleting a contact
app.get('/delete-contact/', function(req, res){
    // let phone = req.query.phone;
    // let name = req.query.name;
    // console.log(name, phone);
    // contactList = contactList.filter((contact) => (contact.phone != phone || contact.name != name));
    // return res.redirect('back');

    // get id from query in url
    let id = req.query.id;

    // delete the contact with that id
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting a contact', err);
            return;
        }
        return res.redirect('back');
    });

    // redirect to the same page

});

app.listen(port, function(err){
    if(err){
        console.log('error in loading server : ', err);
        return;
    }
    console.log('The server is up and is running on the port ', port);
});
