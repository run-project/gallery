# testing...

```bash
# saitodisse/huginn#azkfile
cd /tmp/buttons/huginn && azk stop && cd /tmp/buttons && sudo rm -rf /tmp/buttons/huginn
azk start -Rvvv saitodisse/huginn#azkfile /tmp/buttons/huginn

# saitodisse/isomorphic500#azkfile
cd /tmp/buttons/isomorphic500 && azk stop && cd /tmp/buttons && sudo rm -rf /tmp/buttons/isomorphic500
azk start -Rvvv saitodisse/isomorphic500#azkfile /tmp/buttons/isomorphic500

# saitodisse/discourse#feature/azkfile
cd /tmp/buttons/discourse && azk stop && cd /tmp/buttons && sudo rm -rf /tmp/buttons/discourse
azk start -Rvvv saitodisse/discourse#feature/azkfile /tmp/buttons/discourse

# saitodisse/task-cerebral
cd /tmp/buttons/task-cerebral && azk stop && cd /tmp/buttons && sudo rm -rf /tmp/buttons/task-cerebral
azk start -Rvvv saitodisse/task-cerebral /tmp/buttons/task-cerebral

# azukiapp/feedbin
cd /tmp/buttons/feedbin && azk stop && cd /tmp/buttons && sudo rm -rf /tmp/buttons/feedbin
azk start -Rvvv azukiapp/feedbin /tmp/buttons/feedbin
```

- http://huginn.dev.azk.io/
- http://isomorphic500.dev.azk.io/
- http://discourse.dev.azk.io/
- http://task-cerebral.dev.azk.io/
- http://feedbin.dev.azk.io/
