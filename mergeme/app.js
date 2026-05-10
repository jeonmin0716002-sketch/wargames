'use strict';
const express   =   require('express');
const path      =   require('path');
const app   =   express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const posts     = {};
const configs   = {};

const isObject = function(v) {
    return v !== null && typeof v === 'object';
}

function merge(a, b) {
    for (let key in b) {
        if (isObject(a[key]) && isObject(b[key])) {
            merge(a[key], b[key]);
        } else {
            a[key] = b[key];
        }
    }
    return a;
}

app.get('/', (req, res) => {
    res.render('index', { posts: Object.values(posts) });
});

app.post('/post', (req, res) => {
    const title = req.body.title;
    const body  = req.body.body;
    if (!title || !body) {
        res.send("<script>alert('title and body are required');history.go(-1);</script>");
    } else {
        const id = Math.random().toString(36).slice(2, 10);
        posts[id] = { id, title, body };
        res.redirect('/');
    }
});

app.get('/post/:id', (req, res) => {
    const post = posts[req.params.id];
    if (!post) return res.status(404).send('Not found');
    res.render('post', { post });
});

app.post('/config', express.raw({ type: 'application/json' }), (req, res) => {
    try {
        const data = JSON.parse(req.body);
        const username = data.username;
        const config   = data.config;

        if (!username || !config) {
            res.status(400).json({ error: 'missing fields' });
        } else {
            if (!configs[username]) configs[username] = {};
            merge(configs[username], config);
            res.json({ success: true, config: configs[username] });
        }
    } catch(e) {
        res.status(400).json({ error: 'invalid request' });
    }
});

app.get('/config/:username', (req, res) => {
    res.json(configs[req.params.username] || {});
});

app.listen(3000, () => {
    console.log(`Listening on port 3000....`);
});
