# Agent Guidelines

## GitHub Targets

For every mutating `gh` command, derive the repository from `git remote get-url origin` and pass it with `--repo`. State the resolved repository before running the command. This checkout has an `upstream` remote, so `gh`'s implicit repository selection is not a safe target.
