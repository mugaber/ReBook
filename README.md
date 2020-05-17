# ReBook

## Features

- Search for books.
- View books
- save books to the library

**Using googe books API.**

---

# Quick start 🚀🚀

## Add `.env` file in the root directory with the follwing

```
DB_URI=<your_mongoDB_Atlas_uri_with_credentials>
JWT_SECRET='any-secret'
PORT=xxxx
```

_do not forget to add `.env` to `.gitignore` file_

## Install server dependencies

```
npm i
```

## Install client dependencies

```bash
cd client
npm i
```

## Run both server and client from root

```
npm run dev
```

## Build for prodcution

```bash
cd client
npm run build
```

## Test production before deployment

```
NODE_ENV=production node server.js
```

check in browser on [http://localhost:5000/](http://localhost:5000/)

---

## Deploy to heroku

### Method 1

1. create a heroku project from [heroku website](https://dashboard.heroku.com/apps)

2. Add `ENV_VARIABLES` that are in `.env` to `Config Vars` in the heroku project in `settings`

3. follow the instructions that are in `deploy` in the heroku project

```bash
heroku login
heroku git:clone -a project-name
git push heroku master
```

### Method 2

Create another branch ex. `procution`

```bash
git checkout -b production
```

We can use this branch to deploy from, with `.env` file not in `.gitignore`

Add `.env` file

```bash
git add -f .env
```

This will track the file in git on this branch only. **DON'T PUSH THE PRODUCTION BRANCH TO GITHUB**

Commit...

```bash
git commit -m 'ready for deployment'
```

Create your Heroku project

```bash
heroku create # this will generate random name
heroku create project-name # if available
```

And push the local production branch to the remote heroku master branch.

```bash
git push heroku production:master
```

Now Heroku will have `.env` file it needs to build the project.

> **Make sure your production database is whitelisted in MongoDB Atlas, otherwise the database connection will fail and your app will crash.**

After deployment you can delete the production branch if you like.

```bash
git checkout master
git branch -D production
```

Or you can leave it to merge and push updates from another branch.

Make any changes you need on your master branch and merge those into your production branch.

```bash
git checkout production
git merge master
```

Once merged you can push to heroku as above and your site will rebuild and be updated.
