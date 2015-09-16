# Updating "Run Projects"

- `origin/master` === `upstream/master`
- merge `origin/master` to `origin/azkfile`
- manual tests
- push changes

#### 1. Set the buttons folder

```sh
export BUTTONS_FOLDER=~/_git/button-projects
```

#### 2. Clone all projects and set their original `upstream` branch

```sh
./clone-all-set-upstreams.sh
```

#### 3. Update all `master` and `azkfile` branches

```sh
./scripts/update-master-branchs-and-push.sh
./scripts/update-azkfile-branches.sh
```

#### 4. Merge `master` to `azkfile` branch

```sh
./scripts/merge-start.sh
```

- check all git outputs to find any conflicts
- resolve all confictics

#### 6. Test if the projects are still working well

Some changes may stop buttons to work. Test before accept this changes.
Go to button project and:

```sh
azk restart -Rovv

# test in browser, then...
azk stop
```

#### 7. Push to github

```
./scripts/merge-push.sh
```
