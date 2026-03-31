require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'site')));

const db = new sqlite3.Database('./db.sqlite');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, phone TEXT UNIQUE, email TEXT, is_loyalty INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT UNIQUE, machine TEXT, amount INTEGER, status TEXT, user_id INTEGER, reserved_until DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

function genRef(){ return 'BELL-' + crypto.randomBytes(4).toString('hex').toUpperCase(); }

app.get('/api/user', (req,res) => {
  const phone = req.query.phone;
  if (!phone) return res.status(400).json(null);
  db.get('SELECT * FROM users WHERE phone = ?', [phone], (err,user) => {
    if (err) return res.status(500).json(null);
    res.json(user || null);
  });
});

app.post('/signup-loyalty', (req,res) => {
  const { name, phone, email } = req.body;
  db.run('INSERT OR IGNORE INTO users (name,phone,email,is_loyalty) VALUES (?,?,?,1)', [name,phone,email], function(err){
    if (err) return res.status(500).json({error:err.message});
    db.get('SELECT * FROM users WHERE phone = ?', [phone], (e,user) => res.json(user));
  });
});

app.post('/orders', (req,res) => {
  const machine = req.body.machine || '8kg';
  const action = req.body.action || 'create';
  const priceMap = { '8kg':1500, '11kg':2500, '20kg':4000 };
  const amount = priceMap[machine] || 1500;
  const reference = genRef();

  if (action === 'reserve') {
    const phone = req.header('X-User-Phone');
    if (!phone) return res.status(403).json({error:'Login required'});
    db.get('SELECT * FROM users WHERE phone = ?', [phone], (err,user) => {
      if (err || !user || user.is_loyalty !== 1) return res.status(403).json({error:'Reservation reserved to loyalty members'});
      const reservedUntil = new Date(Date.now() + 15*60*1000).toISOString();
      db.run('INSERT INTO orders (reference,machine,amount,status,user_id,reserved_until) VALUES (?,?,?,?,?,?)',
        [reference,machine,amount,'reserved',user.id,reservedUntil], function(err){
          if (err) return res.status(500).json({error:err.message});
          res.json({ id:this.lastID, reference, machine, amount, status:'reserved', reserved_until:reservedUntil });
        });
    });
  } else {
    db.run('INSERT INTO orders (reference,machine,amount,status) VALUES (?,?,?,?)',
      [reference,machine,amount,'pending'], function(err){
        if (err) return res.status(500).json({error:err.message});
        res.json({ id:this.lastID, reference, machine, amount, status:'pending' });
      });
  }
});

app.post('/kiosk/confirm-cash', (req,res) => {
  const { reference } = req.body;
  if (!reference) return res.status(400).json({error:'reference required'});
  db.run('UPDATE orders SET status = ? WHERE reference = ?', ['paid', reference], function(err){
    if (err) return res.status(500).json({error:err.message});
    if (this.changes === 0) return res.status(404).json({error:'order not found'});
    res.json({ ok:true });
  });
});

app.listen(process.env.PORT || 3000, () => console.log('Server started on 3000'));
