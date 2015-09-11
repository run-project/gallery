# Testing all projects from gallery

What this does?

- download latest Azkfiles (easy to search)
- stops azk agent
- clean persistent/sync forders
- download and start each project on `projects-list.js`
- send elapsed time to keen.io
- save screenshots to check if it is working
- can kill/clean Docker containers

#### Run all (may take too many minutes)

Edit `projects-list.js`, then:

###### Prepare

```sh
npm install
```

###### First run (run this the first time of the day - clean install)

- download repo to `/tmp/buttons` folder
- clear any persistent data
- install app

```sh
npm install
npm run all
```

###### Check result on charts

```sh
cd test/charts
bower install
# open gallery/test/charts/charts-high.html
```

##### Restarting and reprovisioning

Just restart and reprovision.

- do not clear any persistent/sync data files
- stop and start all systems

```sh
npm run restart
```

------------

##### TIP: azk/docker cleanup (linux only)

```sh
azk agent stop
docker kill $(docker ps -q | tr "\r\n" " ")
docker rm -f $(docker ps -f status=exited -q | tr "\r\n" " ")
sudo service docker restart
azk agent start
```
