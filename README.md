# f23-PortlandIndigenousMarketplace
Open source mobile web application to help Portland Indigenous Marketplace manage vendors and events.

## Startup
Copy the `.env.EXAMPLE` file to `.env`. This file contains passwords and other information that doesn't need to be pushed to the github. For now, no changes are needed to this file.

Before launching, run `npm install` in both the backend and the frontend directory. Then, from the root directory, run `docker-compose up` to launch all three containers in attached view, or with the flag `-d` to run the containers in the background.

## Contribution Guide
Every feature you work on should have a corresponding issue on the github project. If you're about to start a feature and this isn't true, go make an issue and assign it to yourself! Every issue should have its own associated branch. Make sure that branch names briefly describes what changes are being implemented.

Make sure to commit to your branch often. When you're ready to close your issue and merge with main, create a pull request for your branch in github. Then, assign another team member to review your pull request before merging it with main. The tester should at least look over the file changes for small merges, and pull the repository locally for testing in bigger merges.

Never work on main locally or push to main on the remote.

## Useful docker commands
Run all docker commands in the root directory.
| Command | Arg/Flag | Description |
|-|:-:|-|
|`docker-compose up`|   | Runs all containers in attached view |
| | `-d`| Runs the container(s) in detached view / background |
| | `<name>` | Runs only the named container in attached view. |
|`docker-compose stop` | | Stops any running container in the directory. |
| | `<name>` | Stops the named container |
|`docker-compose rm` | | Removes every instance of any container described in the directory. |
| | `<name>` | Removes any instance of the named container, if it is described in the directory the command is ran from. |
| `docker-compose exec <container> ` | `<command>` | Runs the specified command in the specified container |
| | `/bin/bash` | Opens a shell inside the specified container|
| | `-d` | Runs the specified command in detached mode / background |

## Postgres Help
The directory `pg_data` contains the data for your local postgres server. If you delete the contents of this folder, your database will be wiped! If you want to rebuild your database after wiping it, run `docker-compose rm database`.

There are a few ways to connect to the database. The `psql` command can be used to establish a connection an enter the shell. Looking up the documentation for this command is useful. You can run `psql` from your local machine and connect over the exposed port `5432`, or 
