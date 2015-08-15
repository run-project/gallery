## Easy way to test and clean environment, including `sync_folders` and `persistent_folders`

> FIXME: to work on Mac, must change `azk info | \
  grep -e` line to execute from a container shell;

```bash
# saitodisse/huginn#azkfile
sudo ls && \
echo 'going to /tmp/buttons/huginn folder'
cd /tmp/buttons/huginn && \
azk stop && \
azk info | \
  grep -e '\(sync_folders\|persistent_folders\)' | \
  awk -F ':' '{ print $2 }' | \
  sed 's/.*\(persistent_folders\|sync_folders\)\/\(\w\+\).*/\2/g' | \
  tail -n 1 | \
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR && \
cd /tmp/buttons && \
sudo rm -rf /tmp/buttons/huginn && \
azk start -o -R -vvv saitodisse/huginn#azkfile /tmp/buttons/huginn

# saitodisse/isomorphic500#azkfile
sudo ls && \
echo 'going to /tmp/buttons/isomorphic500 folder'
cd /tmp/buttons/isomorphic500 && \
azk stop && \
azk info | \
  grep -e '\(sync_folders\|persistent_folders\)' | \
  awk -F ':' '{ print $2 }' | \
  sed 's/.*\(persistent_folders\|sync_folders\)\/\(\w\+\).*/\2/g' | \
  tail -n 1 | \
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR && \
cd /tmp/buttons && \
sudo rm -rf /tmp/buttons/isomorphic500 && \
azk start -o -R -vvv saitodisse/isomorphic500#azkfile /tmp/buttons/isomorphic500

# saitodisse/discourse#feature/azkfile
sudo ls && \
echo 'going to /tmp/buttons/discourse folder'
cd /tmp/buttons/discourse && \
azk stop && \
azk info | \
  grep -e '\(sync_folders\|persistent_folders\)' | \
  awk -F ':' '{ print $2 }' | \
  sed 's/.*\(persistent_folders\|sync_folders\)\/\(\w\+\).*/\2/g' | \
  tail -n 1 | \
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR && \
cd /tmp/buttons && \
sudo rm -rf /tmp/buttons/discourse && \
azk start -o -R -vvv saitodisse/discourse#feature/azkfile /tmp/buttons/discourse

# azukiapp/feedbin
sudo ls && \
echo 'going to /tmp/buttons/feedbin folder'
cd /tmp/buttons/feedbin && \
azk stop && \
azk info | \
  grep -e '\(sync_folders\|persistent_folders\)' | \
  awk -F ':' '{ print $2 }' | \
  sed 's/.*\(persistent_folders\|sync_folders\)\/\(\w\+\).*/\2/g' | \
  tail -n 1 | \
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR && \
cd /tmp/buttons && \
sudo rm -rf /tmp/buttons/feedbin && \
azk start -o -R -vvv azukiapp/feedbin /tmp/buttons/feedbin

# saitodisse/task-cerebral
sudo ls && \
echo 'going to /tmp/buttons/task-cerebral folder'
cd /tmp/buttons/task-cerebral && \
azk stop && \
azk info | \
  grep -e '\(sync_folders\|persistent_folders\)' | \
  awk -F ':' '{ print $2 }' | \
  sed 's/.*\(persistent_folders\|sync_folders\)\/\(\w\+\).*/\2/g' | \
  tail -n 1 | \
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR && \
cd /tmp/buttons && \
sudo rm -rf /tmp/buttons/task-cerebral && \
azk start -o -R -vvv saitodisse/task-cerebral /tmp/buttons/task-cerebral
```

## Links

- http://huginn.dev.azk.io/
- http://isomorphic500.dev.azk.io/
- http://discourse.dev.azk.io/
- http://task-cerebral.dev.azk.io/
- http://feedbin.dev.azk.io/
