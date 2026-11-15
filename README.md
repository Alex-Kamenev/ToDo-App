# To-do list exercise

An Express and EJS learning project with separate daily and work lists.
Requires Node.js 20+. Run `npm ci`, `npm test`, then `npm start`; open
`http://localhost:3000`. `PORT` and `HOST` are configurable; localhost is the default.

Tasks are stored in memory and reset on restart. This is a single-user local demo,
without accounts, persistence or CSRF protection. Input is limited to nonempty tasks
of at most 500 characters and 1,000 tasks per list; EJS escapes task content.
