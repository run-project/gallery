# Updating "Run Projects"

- `origin/master` === `upstream/master`
- merge `origin/master` to `origin/azkfile`
- manual tests
- push changes

```sh
cd updating
```


## Prepare

#### 1. Set the buttons folder

```sh
export BUTTONS_FOLDER=~/_git/button-projects
```

#### 2. Clone all projects and set their original `upstream` branch

```sh
./clone-all-set-upstreams.sh
```


------------


### Making changes to all `Azkfiles`

#### 3. (! danger !) Reset --hard `master` to `origin/master`

```sh
./scripts/git-reset-hard-master-pull.sh
```

#### 4. Make changes

Check if all Azkfiles are still valid

```sh
# fast check if they are all valid
./scripts/azk-status.sh

# slow check: start and open
./scripts/azk-reprovision.sh
./scripts/azk-start-and-open.sh

# stop all
./scripts/azk-stop.sh
```

#### 5. Commit yours changes

```
./scripts/git-add-commit-changes.sh
```

#### 6. Push to github

```
./scripts/push-origin.sh
```


----------------------


## Updating from upstream

#### 3. (!) Reset --hard `master` to `origin/master`

```sh
./scripts/git-reset-hard-master-pull.sh
```

#### 4. Merge `upstream/master` to `master` branch

```sh
./scripts/merge-start.sh
```

- check all git outputs to find any conflicts
- resolve all confictics

#### 5. Test if the projects are still working well

Some changes may stop buttons to work. Test before accept this changes.
Go to button project and:

```sh
# check if is a valid Azkfile.js
azk status

# restart project reprovisioning and open in browser
azk restart -Rovv

# stop all systems
azk stop
```

#### 7. Push to github

```
./scripts/push-origin.sh
```
